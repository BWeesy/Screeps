import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "utils/creep";
import targetter from "../utils/targetting";
const roleHauler = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      creep.memory.working = false;
      creep.memory.workId = null;
      creep.say("Getting Energy");
    }
    if (isFullAndNotWorking(creep)) {
      creep.memory.working = true;
      creep.memory.workId = null;
      creep.say("Hauling");
    }

    if (isWorking(creep)) {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.withdrawContainer(creep)?.id ?? null;
      }
      const targetContainer = creep.memory.workId
        ? (Game.getObjectById(creep.memory.workId) as StructureContainer | StructureStorage | null)
        : null;
      if (targetContainer && creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetContainer, { visualizePathStyle: { stroke: "#ffaa00" } });
        return;
      }

      if (!creep.memory.workId) {
        creep.memory.workId = targetter.withdrawSource(creep)?.id ?? null;
      }
      const targetSource = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      if (!creep.memory.workId) {
        creep.memory.workId = targetter.spawner(creep)?.id ?? null;
      }
      const targetSpawner = creep.memory.workId
        ? (Game.getObjectById(creep.memory.workId) as StructureSpawn | StructureExtension)
        : null;
      if (targetSpawner && creep.transfer(targetSpawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSpawner, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
};

export default roleHauler;
