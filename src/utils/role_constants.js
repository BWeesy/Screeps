var {spawnBuilder, spawnHarvester, spawnHauler, spawnUpgrader} = require("utils_spawning");

module.exports = {
    HARVEST: {name : 'harvester', spawn : spawnHarvester},
    BUILD: {name : 'builder', spawn : spawnBuilder},
    HAUL: {name : 'hauler', spawn : spawnHauler},
    UPGRADE: {name : 'upgrader', spawn : spawnUpgrader}
};