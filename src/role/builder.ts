import targetter from "../utils/targetting";
const roleBuilder = {
  run(creep: Creep): void {
    if (creep.memory.working && creep.carry.energy === 0) {
      // when out of energy, harvest
      creep.memory.working = false;
      creep.say("harvest");
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      // when full, build
      creep.memory.working = true;
      creep.memory.workId = null;
      creep.say("build");
    }

    if (creep.memory.working) {
      const targetBuild = targetter.build(creep);
      const targetRepair = targetter.repair(creep);
      if (targetRepair && !creep.memory.workId) {
        creep.memory.workId = targetRepair.id;
      }
      if (creep.memory.workId) {
        const target = Game.getObjectById(creep.memory.workId) as Structure;
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
          creep.say(`Repairing ${target.structureType}`);
        }
        if (target.hits === target.hitsMax) {
          creep.memory.workId = null;
        }
      } else if (targetBuild) {
        if (creep.build(targetBuild) === ERR_NOT_IN_RANGE) {
          creep.memory.workId = targetBuild.id;
          creep.moveTo(targetBuild, { visualizePathStyle: { stroke: "#ffaa00" } });
          creep.say(`Building ${targetBuild.structureType}`);
        }
      }
    } else {
      const targetContainer = targetter.withdrawContainer(creep);

      if (targetContainer && creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetContainer, { visualizePathStyle: { stroke: "#ffaa00" } });
      }

      const targetSource = targetter.withdrawSource(creep);
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default roleBuilder;
