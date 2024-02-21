<template>
  <div>
    <hr />
    <div class="text-primary justify-center row q-pa-md">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h3 text-center">Create Region Groups</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="q-pa-md">
    <div class="text-h6">Instructions</div>
    <div>
      <span class="text-bold">Step 1</span>: Use Add Group button to create a
      region group and begin adding stations
    </div>
    <div>
      <span class="text-bold">Step 2</span>: Find the group you just added in
      the groups drop down and pick a cut off date for employees
    </div>
    <div>
      <span class="text-bold">Step 3</span>: Type in station number and click
      Add station to add the station to the group you created
    </div>
  </div>
  <div class="q-pa-md row justify-center">
    <div class="col-xs-12 col-md-4">
      <q-card>
        <q-card-section>
          <div class="text-primary text-h6">Group List</div>
          <q-separator />
          <q-select
            filled
            v-model="model"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            @input-value="setModel"
            label="Groups"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-separator />
          <div class="q-my-sm">
            <q-input v-model="date" filled type="date" label="Cuttoff Date" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-if="groupStore.find((x) => x.group_name === model)"
            color="red"
            @click="confirmDeletePrompt"
          >
            Delete Group
          </q-btn>
          <q-btn class="bg-primary text-white" @click="groupPrompt"
            ><q-icon name="fa-solid fa-plus" size="xs" />Add Group</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-4">
      <q-card>
        <q-card-section>
          <div class="text-primary text-h6">Add Station</div>
          <q-separator />
          <q-input
            filled
            v-model="stationToAdd"
            label="Stn
                Number"
            mask="###"
            dense
            @keydown.enter="
              group.addStationToGroup(model, stationToAdd), (stationToAdd = ' ')
            "
            lazy-rules
            :rules="[
              (val) => /^\d{3}$/.test(val) || 'station number must be 3 digits',
            ]"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            @click="
              group.addStationToGroup(model, stationToAdd), (stationToAdd = ' ')
            "
            color="primary"
          >
            <q-icon name="fa-solid fa-plus" />
            Add Station
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <q-card class="col-xs-12 col-md-4">
      <q-card-section>
        <div
          v-if="groupStore && groupStore.find((x) => x.group_name === model)"
          class="text-primary text-h6"
        >
          Stations for {{ model }}
        </div>
        <div v-else class="text-primary text-h6">Select a Group</div>
        <div v-if="date && groupStore.find((x) => x.group_name === model)">
          <span class="text-primary">Cuttoff Date: </span>
          <span class="text-bold">{{ date }}</span>
        </div>
        <div v-else>Please select a cuttof Date and a Group</div>
        <q-list bordered class="scrollable-list">
          <q-item-section
            v-for="(regionGroup, index) in groupStore"
            :key="regionGroup.group_name"
          >
            <template v-if="model && model === regionGroup.group_name">
              <q-item
                v-for="station in regionGroup.stations"
                :key="station"
                class="list-item q-ma-sm"
              >
                {{ station }}
                <q-icon
                  @click="group.removeStation(index, station)"
                  class="icon"
                  name="fa-solid fa-trash-can"
                  color="red"
                />
              </q-item>
            </template>
          </q-item-section>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { useGroupStore } from "./stores/groupStore";

const group = new Group();
group.initializeStore();
const { groupStore } = useGroupStore();

const model = ref<string>("");
const stationToAdd = ref<string>("");
const date = ref<string>("");
const options = ref<string[]>([]);

function filterFn(val: any, update: any, abort: any) {
  update(() => {
    const needle = val.toLowerCase();
    options.value = groupStore
      .map((group) => group.group_name)
      .filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
}

const setModel = (val: string) => {
  model.value = val;
};

const $q = useQuasar();

const groupPrompt = () => {
  $q.dialog({
    title: "New Group Name",
    message: "Name of new group (minimum 3 characters)",
    prompt: {
      model: "",
      isValid: (val) => val.length > 2,
      type: "text",
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    group.addGroup({
      group_name: data,
      stations: [],
      cutoff_date: null,
    });
  });
};

const confirmDeletePrompt = () => {
  $q.dialog({
    title: "Delete Group",
    message: `Are you sure you want to delete group ${model.value}`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      group.removeGroup(model.value);
      model.value = " ";
    })
    .onCancel(() => {
      console.log("Cancel");
    })
    .onDismiss(() => {
      console.log("I am triggered on both OK and Cancel");
    });
};
</script>
<style scoped>
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}
.scrollable-list {
  height: 40vh;
  overflow-y: auto;
}
.list-item {
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
}
.icon:hover {
  cursor: pointer;
}
</style>
