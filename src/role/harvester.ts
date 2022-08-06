import targetter from "../utils/targetting.js";
const roleHarvester = {
  run(creep: Creep): void {
    if (creep.carry.energy < creep.carryCapacity) {
      const targetSource = targetter.source(creep);
      if (targetSource && creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      const targetStorage = targetter.store(creep);
      if (creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
};

export default roleHarvester;
