import { defineStore } from "pinia";
import type { IGroup } from "~/composables/useTypes";

export const useGroupStore = defineStore("groupStore", () => {
  const groupStore: IGroup[] = reactive([]);

  return { groupStore };
});
