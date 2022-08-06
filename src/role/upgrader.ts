import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "../utils/creep";
import targetter from "../utils/targetting";

const roleUpgrader = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      setToGettingEnergy(creep);
    }
    if (isFullAndNotWorking(creep)) {
      setToWorking(creep);
    }

    if (isWorking(creep)) {
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.source(creep)?.id ?? null;
      }
      const targetSource = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

function setToGettingEnergy(creep: Creep) {
  creep.memory.working = false;
  creep.say("Getting Energy");
}

function setToWorking(creep: Creep) {
  creep.memory.working = true;
  creep.memory.workId = null;
  creep.say("Upgrading");
}

export default roleUpgrader;
