import { forEach } from "lodash";
import roles from "./role_constants";

const spawnerName = "Gubbins";

interface CreepDictItem {
  actual: number;
  target: number;
}

interface CreepDict {
  [name: string]: CreepDictItem;
}

const spawner = {
  run(): void {
    const spawn = Game.spawns[spawnerName];
    const maxEnergy = spawn.room.energyCapacityAvailable;
    const availableEnergy = spawn.room.energyAvailable;

    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text("🛠️" + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {
        align: "left",
        opacity: 0.8
      });
      for (const i in Memory.creeps) {
        if (!Game.creeps[i]) {
          delete Memory.creeps[i];
        }
      }
      return;
    } else {
      spawn.room.visual.text(`🟡 ${availableEnergy}/${maxEnergy}`, spawn.pos.x + 1, spawn.pos.y, {
        align: "left",
        opacity: 0.8
      });
    }

    const creepDict: CreepDict = {
      harvester: {
        actual: _.filter(Game.creeps, creep => creep.memory.role === "harvester").length,
        target: 0
      },
      builder: {
        actual: _.filter(Game.creeps, creep => creep.memory.role === "builder").length,
        target: 0
      },
      upgrader: {
        actual: _.filter(Game.creeps, creep => creep.memory.role === "upgrader").length,
        target: 0
      },
      hauler: {
        actual: _.filter(Game.creeps, creep => creep.memory.role === "hauler").length,
        target: 0
      }
    };

    const spawnList = [
      roles.HARVEST,
      roles.HARVEST,
      roles.BUILD,
      roles.BUILD,
      roles.HAUL,
      roles.HAUL,
      roles.UPGRADE,
      roles.BUILD,
      roles.UPGRADE,
      roles.HAUL,
      roles.HAUL,
      roles.BUILD,
      roles.BUILD,
      roles.BUILD,
      roles.BUILD
    ];

    const spawnEnergy = spawn.store.getUsedCapacity(RESOURCE_ENERGY);
    if (maxEnergy !== availableEnergy) {
      if (spawnEnergy === SPAWN_ENERGY_CAPACITY && creepDict.harvester.actual === 0) {
        roles.HARVEST.spawn();
      }
      return;
    }

    forEach(spawnList, role => {
      creepDict[role.name].target++;
      if (creepDict[role.name].actual < creepDict[role.name].target) {
        role.spawn();
        return false;
      }
      return true;
    });
    return;
  }
};

export default spawner;
