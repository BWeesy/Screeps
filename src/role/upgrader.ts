const roleUpgrader = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (creep.memory.working && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.say("?? harvest");
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      creep.say("? upgrade");
    }

    if (creep.memory.working) {
      // TODO write clever targeting based on completion and proximity
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      // TODO write clever targeting based on energy available and proximity
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default roleUpgrader;
