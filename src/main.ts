import roleBuilder from "./role/builder";
import roleHarvester from "./role/harvester";
import roleHauler from "./role/hauler";
import roleNames from "./utils/role_names";
import roleUpgrader from "./role/upgrader";
import spawner from "./utils/spawner";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)
    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    working: boolean;
    workId: Id<_HasId> | null;
  }
  interface Role {
    name: string;
    spawn: void;
  }
}

export const loop = (): void => {
  spawner.run();

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === roleNames.HARVEST) {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === roleNames.UPGRADE) {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role === roleNames.BUILD) {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === roleNames.HAUL) {
      roleHauler.run(creep);
    }
  }
};
