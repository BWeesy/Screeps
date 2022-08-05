import roleHarvester from './role/harvester.js';
import roleUpgrader from './role/upgrader.js';
import roleBuilder from './role/builder.js';
import roleHauler from './role/hauler.js';
import spawner from './utils/spawner.js';
import buildingPlanner from './utils/building_planner.ts';

module.exports.loop = function () {
    spawner.run();

    _.forEach(Game.spawns, (spawner, _) => buildingPlanner.buildContainers(spawner));

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }
}