import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "utils/creep";
import targetter from "../utils/targetting";
const roleHauler = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      setToNotWorking(creep);
    }
    if (isFullAndNotWorking(creep)) {
      setToWorking(creep);
    }

    if (isWorking(creep)) {
      depositEnergy(creep);
    } else {
      getEnergy(creep);
    }
  }
};

function setToWorking(creep: Creep) {
  creep.memory.working = true;
  creep.memory.workId = null;
  creep.say("Hauling");
}

function setToNotWorking(creep: Creep) {
  creep.memory.working = false;
  creep.memory.workId = null;
  creep.say("Getting Energy");
}

function depositEnergy(creep: Creep) {
  if (!creep.memory.workId) {
    creep.memory.workId = targetter.spawner(creep)?.id ?? null;
  }
  const targetSpawner = creep.memory.workId
    ? (Game.getObjectById(creep.memory.workId) as StructureSpawn | StructureExtension)
    : null;
  if (targetSpawner && creep.transfer(targetSpawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetSpawner, { visualizePathStyle: { stroke: "#ffffff" } });
  }
  if (targetSpawner && targetSpawner.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    creep.memory.workId = null;
  }
}

function getEnergy(creep: Creep) {
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
}

export default roleHauler;
