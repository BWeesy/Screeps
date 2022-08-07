import { isFullAndNotWorking, isWorking, isWorkingAndEmpty } from "../utils/creep";
import targetter from "../utils/targetting";
const roleBuilder = {
  run(creep: Creep): void {
    if (isWorkingAndEmpty(creep)) {
      SetToGettingEnergy(creep);
    }
    if (isFullAndNotWorking(creep)) {
      setToWorking(creep);
    }

    if (isWorking(creep)) {
      repairThenBuild(creep);
    } else {
      getEnergy(creep);
    }
  }
};

function setToWorking(creep: Creep) {
  creep.memory.working = true;
  creep.memory.workId = null;
  creep.say("Building");
}

function SetToGettingEnergy(creep: Creep) {
  creep.memory.working = false;
  creep.memory.workId = null;
  creep.say("Getting Energy");
}

function getEnergy(creep: Creep) {
  const targetContainer = targetter.withdrawContainer(creep);
  if (targetContainer && creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetContainer, { visualizePathStyle: { stroke: "#ffaa00" } });
    return;
  }

  const targetSource = targetter.withdrawSource(creep);
  if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
  }
}

function repairThenBuild(creep: Creep) {
  const targetRepair = targetter.repair(creep);
  if (targetRepair && !creep.memory.workId) {
    creep.memory.workId = targetRepair.id;
  }
  if (creep.memory.workId) {
    const target = Game.getObjectById(creep.memory.workId) as Structure;
    if (!target) {
      creep.memory.workId = null;
    }
    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
      creep.say(`Repairing ${target.structureType}`);
    }
    if (target && target.hits === target.hitsMax) {
      creep.memory.workId = null;
    }
  }

  // No memory needed, targetter spreads out builders based on building progress
  const targetBuild = targetter.build(creep);
  if (targetBuild) {
    if (creep.build(targetBuild) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targetBuild, { visualizePathStyle: { stroke: "#ffaa00" } });
      creep.say(`Building ${targetBuild.structureType}`);
    }
  }
}

export default roleBuilder;
