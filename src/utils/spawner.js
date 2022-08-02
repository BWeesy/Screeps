const body = require("utils_body_constants");
const roles = require("utils_role_constants");

var spawnerName = "Gubbins";

var createName = (role) => {
    var number = Math.random().toFixed(3) * 1000;
    return role + number.toString();
}

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

        var targetBuilders = 2;
        var targetUpgraders = 2;
        var targetHaulers = 10;

        var sources = spawner.room.find(FIND_SOURCES);

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roles.HARVEST);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.BUILD);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.UPGRADE);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == roles.HAUL);
        console.log(`Harv: ${harvesters.length}/${sources.length} Haul: ${haulers.length}/${targetHaulers} Buil: ${builders.length}/${targetBuilders} Upgr: ${upgraders.length}/${targetUpgraders}`);

        if(harvesters.length < sources.length) {

            sources.forEach(function(srs){
            var tmp = spawner.room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id})
            if(tmp == ''){
                targetSource = srs.id;
            }
            });

            var bodyPieces = [MOVE, CARRY];
            var cost = body.MOVE.cost + body.CARRY.cost;
            while(cost + body.WORK.cost <= availableEnergy){
                bodyPieces.push(WORK);
                cost += body.WORK.cost;
            }

            var code = spawner.spawnCreep(bodyPieces, createName(roles.HARVEST), {memory: {role: roles.HARVEST, source: targetSource}});
            console.log('Spawning new harvester: ' + code);
            return;
        }
        
        if(upgraders.length < targetUpgraders) {
            bodyPieces = [WORK, CARRY, MOVE];
            var code = spawner.spawnCreep(bodyPieces, createName(roles.UPGRADE), {memory: {role: roles.UPGRADE}});
            console.log('Spawning new upgrader: ' + code);
            return;
        }

        if(builders.length < targetBuilders) {
            var bodyPieces = [MOVE, MOVE, WORK];
            var cost = body.MOVE.cost * 2 + body.WORK.cost;
            while(cost + body.CARRY.cost <= availableEnergy){
                bodyPieces.push(CARRY);
                cost += body.CARRY.cost;
            }
            var code = spawner.spawnCreep(bodyPieces, createName(roles.BUILD), {memory: {role: roles.BUILD}});
            console.log('Spawning new builder: ' + code);
            return;
        }

        if(haulers.length < targetHaulers) {
            var bodyPieces = [MOVE, CARRY];
            var cost = body.MOVE.cost + body.CARRY.cost;
            while(cost + body.WORK.cost + body.CARRY.cost <= availableEnergy){
                bodyPieces.push(WORK);
                bodyPieces.push(CARRY);
                cost += body.WORK.cost + body.CARRY.cost;
            }
            var code = spawner.spawnCreep(bodyPieces, createName(roles.HAUL), {memory: {role: roles.HAUL}});
            console.log('Spawning new hauler: ' + code);
            return;
        }
    }
};

module.exports = spawner;