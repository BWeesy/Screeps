import { isNotFull } from "utils/creep";
import targetter from "../utils/targetting";
const roleHarvester = {
  run(creep: Creep): void {
    if (isNotFull(creep)) {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.source(creep)?.id ?? null;
      }
      const targetSource = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.store(creep)?.id ?? null;
      }
      const targetStorage = creep.memory.workId
        ? (Game.getObjectById(creep.memory.workId) as StructureContainer | StructureStorage)
        : null;
      if (targetStorage && creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
};

export default roleHarvester;
