import spawning from "./spawning.js";

interface Role {
  name: string;
  spawn: () => void;
}
interface RoleDict {
  [name: string]: Role;
}

const roles: RoleDict = {
  HARVEST: { name: "harvester", spawn: spawning.spawnHarvester },
  BUILD: { name: "builder", spawn: spawning.spawnBuilder },
  HAUL: { name: "hauler", spawn: spawning.spawnHauler },
  UPGRADE: { name: "upgrader", spawn: spawning.spawnUpgrader }
};

export default roles;
