const body = require("utils_body_constants");
const roles = require("utils_role_constants");
var {spawnBuilder, spawnHarvester, spawnHauler, spawnUpgrader} = require("utils_spawning");
var spawnerName = "Gubbins";

var spawner = {

    /** @param {} **/
    run: function() {
        var spawner = Game.spawns[spawnerName];
        var maxEnergy = spawner.room.energyCapacityAvailable;
        var availableEnergy = spawner.room.energyAvailable;
        
        if(spawner.spawning) { 
            var spawningCreep = Game.creeps[spawner.spawning.name];
            spawner.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawner.pos.x + 1, 
                spawner.pos.y, 
                {align: 'left', opacity: 0.8});
            for(var i in Memory.creeps) {
                if(!Game.creeps[i]) {
                    delete Memory.creeps[i];
                }
            }
            return;
        } else {
            spawner.room.visual.text(
                `🟡 ${availableEnergy}/${maxEnergy}`,
                spawner.pos.x + 1, 
                spawner.pos.y, 
                {align: 'left', opacity: 0.8});
        }

        if(maxEnergy != availableEnergy){
            return;
        }

        var creepDict = {
            'harvester' : {
                actual : (_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')).length,
                target : 0
            },
            'builder' : {
                actual : (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder')).length,
                target : 0
            },
            'upgrader' : {
                actual : (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')).length,
                target : 0
            },
            'hauler' : {
                actual : (_.filter(Game.creeps, (creep) => creep.memory.role == 'hauler')).length,
                target : 0
            }
        }

        var spawnList = [roles.HARVEST,roles.HARVEST,roles.HAUL,roles.BUILD,roles.UPGRADE,roles.BUILD,roles.UPGRADE,roles.HAUL];

        for (var role in spawnList){
            creepDict[spawnList[role].name].target ++;
            if (creepDict[spawnList[role].name].actual < creepDict[spawnList[role].name].target){
                spawnList[role].spawn();
                return
            }
        }
        //console.log(`Harv: ${harvesters.length}/${targetHarvesters} Haul: ${haulers.length}/${targetHaulers} Buil: ${builders.length}/${targetBuilders} Upgr: ${upgraders.length}/${targetUpgraders}`);
        return;
    }
}

module.exports = spawner;
