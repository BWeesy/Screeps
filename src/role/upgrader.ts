import targetter from "../utils/targetting";

const roleUpgrader = {
  run(creep: Creep): void {
    if (creep.memory.working && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.say("?? harvest");
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      creep.memory.workId = null;
      creep.say("? upgrade");
    }

    if (creep.memory.working) {
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.source(creep)?.id ?? null;
      }
      const source = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
      if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default roleUpgrader;
