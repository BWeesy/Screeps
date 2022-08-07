import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "utils/creep";
import targetter from "../utils/targetting";
const roleHarvester = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      creep.memory.working = false;
      creep.memory.workId = null;
      creep.say("Getting Energy");
    }
    if (isFullAndNotWorking(creep)) {
      creep.memory.working = true;
      creep.memory.workId = null;
      creep.say("Depositing Energy");
    }

    if (isWorking(creep)) {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.store(creep)?.id ?? null;
      }
      const targetStorage = creep.memory.workId
        ? (Game.getObjectById(creep.memory.workId) as StructureContainer | StructureStorage)
        : null;
      if (targetStorage && creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffffff" } });
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

export default roleHarvester;
