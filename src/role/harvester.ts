import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "utils/creep";
import targetter from "../utils/targetting";
const roleHarvester = {
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
      getEnergyFromStore(creep);
    }
  }
};

function getEnergyFromStore(creep: Creep) {
  const targetSource = creep.memory.workId ? (Game.getObjectById(creep.memory.workId) as Source) : null;
  if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
  }
}

function depositEnergy(creep: Creep) {
  const targetStorage = targetter.store(creep);
  if (targetStorage && creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffffff" } });
  }
}

function setToWorking(creep: Creep) {
  creep.memory.working = true;
  creep.say("Depositing Energy");
}

function setToNotWorking(creep: Creep) {
  creep.memory.working = false;
  creep.say("Getting Energy");
}

export default roleHarvester;
