import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "utils/creep";
import targetter from "../utils/targetting";
const roleHarvester = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      creep.memory.working = false;
      creep.say("Getting Energy");
    }
    if (isFullAndNotWorking(creep)) {
      creep.memory.working = true;
      creep.say("Depositing Energy");
    }

    if (isWorking(creep)) {
      const targetStorage = targetter.store(creep);
      if (targetStorage && creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      const targetSource = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default roleHarvester;
