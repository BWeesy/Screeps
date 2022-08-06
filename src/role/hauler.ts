import targetter from "../utils/targetting.js";
const roleHauler = {
  run(creep: Creep): void {
    if (creep.carry.energy === 0) {
      const targetStorage = targetter.withdrawContainer(creep);
      if (targetStorage && creep.withdraw(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetStorage, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      const targetSpawner = targetter.spawner(creep);
      if (creep.transfer(targetSpawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSpawner, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
};

export default roleHauler;
