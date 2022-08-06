import spawning from './spawning.js';

export default {
    HARVEST: {name : 'harvester', spawn : spawning.spawnHarvester},
    BUILD: {name : 'builder', spawn : spawning.spawnBuilder},
    HAUL: {name : 'hauler', spawn : spawning.spawnHauler},
    UPGRADE: {name : 'upgrader', spawn : spawning.spawnUpgrader}
};