export class Group {
  private _store: IGroup[] | null = null; // Initialize as null or undefined

  constructor() {
    console.log("Group init");
  }

  initializeStore() {
    const store = useGroupStore();
    this._store = store.groupStore;
  }

  addGroup = (group: IGroup) => {
    if (!this._store) {
      console.error(
        "Group store not initialized. Call initializeStore() before using addGroup()"
      );
      return;
    }
    this._store.push(group);
  };

  removeGroup = (groupName: string) => {
    if (this._store) {
      this._store.splice(
        this._store.findIndex((x: IGroup) => x.group_name === groupName),
        1
      );
    }
  };

  addStationToGroup = (group: string | null, station: string | null) => {
    if (station && station.length !== 3) {
      CsMsg("Station number must be 3 digits", "red");
      return;
    }

    if (this._store && group && station) {
      const groupToUpdate = this._store.find((x) => x.group_name === group);
      if (groupToUpdate) {
        if (groupToUpdate.stations.includes(station)) {
          CsMsg("Cannot add same station twice to 1 group", "red");
        } else {
          groupToUpdate.stations.push(station);
        }
      } else {
        console.log("group not found");
      }
    }
  };

  removeStation = (groupIndex: number, station: string) => {
    if (this._store) {
      this._store[groupIndex].stations = this._store[
        groupIndex
      ].stations.filter((x) => x !== station);
      CsMsg("Station Removed", "green");
    }
  };
}
