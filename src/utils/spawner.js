const body = require("utils_body_constants");
const roles = require("utils_role_constants");
var {spawnBuilder, spawnHarvester, spawnHauler, spawnUpgrader} = require("utils_spawning");
var spawnerName = "Gubbins";

var spawner = {

    /** @param {} **/
    run: function() {
        var spawner = Game.spawns[spawnerName];
        var maxEnergy = spawner.store.getCapacity(RESOURCE_ENERGY);
        var availableEnergy = spawner.store.getUsedCapacity(RESOURCE_ENERGY);
        
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

        var sources = spawner.room.find(FIND_SOURCES);

        var targetHarvesters = sources.length;
        var targetBuilders = 1;
        var targetUpgraders = 1;
        var targetHaulers = 1;

        

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roles.HARVEST);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.BUILD);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.UPGRADE);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == roles.HAUL);
        console.log(`Harv: ${harvesters.length}/${sources.length} Haul: ${haulers.length}/${targetHaulers} Buil: ${builders.length}/${targetBuilders} Upgr: ${upgraders.length}/${targetUpgraders}`);


        if(harvesters.length < sources.length) {
            spawnHarvester();
            return;
        }
        
        else if(upgraders.length < targetUpgraders) {
            spawnUpgrader();
            return;
        }

        else if(builders.length < targetBuilders) {
            spawnBuilder();
            return;
        }

        else if(haulers.length < targetHaulers) {
            spawnHauler();
            return;
        }
    }
}

module.exports = spawner;