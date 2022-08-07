import roleNames from "./role_names";
import spawning from "./spawning";

interface Role {
  name: string;
  spawn: () => void;
}
interface RoleDict {
  [name: string]: Role;
}

const roles: RoleDict = {
  HARVEST: { name: roleNames.HARVEST, spawn: spawning.spawnHarvester },
  BUILD: { name: roleNames.BUILD, spawn: spawning.spawnBuilder },
  HAUL: { name: roleNames.HAUL, spawn: spawning.spawnHauler },
  UPGRADE: { name: roleNames.UPGRADE, spawn: spawning.spawnUpgrader }
};

export default roles;
