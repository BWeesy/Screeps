const body = require("utils_body_constants");
//const roles = require("utils_role_constants");
var createName = require("utils_naming")

var spawner = Game.spawns['Gubbins'];
var sources = spawner.room.find(FIND_SOURCES);
var availableEnergy = spawner.room.energyAvailable;

function spawnHarvester() {
    sources.forEach(function(srs){
        var tmp = spawner.room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id})
        if(tmp == ''){
            targetSource = srs.id;
        }
        });

        var bodyPieces = [WORK, MOVE, CARRY];
        var cost = body.WORK.cost + body.MOVE.cost + body.CARRY.cost;
        while(cost + body.WORK.cost <= availableEnergy){
            bodyPieces.push(WORK);
            cost += body.WORK.cost;
        }

        var code = spawner.spawnCreep(bodyPieces, createName('harvester'), {memory: {role: 'harvester', source: targetSource}});
        console.log('Spawning new harvester: ' + code);
        return;
}

function spawnBuilder() {
    var bodyPieces = [MOVE, CARRY, WORK];
    var cost = body.MOVE.cost + body.CARRY.cost + body.WORK.cost;
    while(cost + body.WORK.cost + body.CARRY.cost <= availableEnergy){
        bodyPieces.push(WORK);
        bodyPieces.push(CARRY);
        cost += body.WORK.cost + body.CARRY.cost;
    }
    var code = spawner.spawnCreep(bodyPieces, createName('builder'), {memory: {role: 'builder'}});
    console.log('Spawning new builder: ' + code);
    return;
}

function spawnUpgrader() {
    var bodyPieces = [WORK, CARRY, MOVE];
    var code = spawner.spawnCreep(bodyPieces, createName('upgrader'), {memory: {role: 'upgrader'}});
    console.log('Spawning new upgrader: ' + code);
    return;
}

function spawnHauler() {
    var bodyPieces = [MOVE, CARRY];
    var cost = body.MOVE.cost + body.CARRY.cost;
    while(cost + body.WORK.cost + body.CARRY.cost <= availableEnergy){
        bodyPieces.push(WORK);
        bodyPieces.push(CARRY);
        cost += body.WORK.cost + body.CARRY.cost;
    }
    var code = spawner.spawnCreep(bodyPieces, createName('hauler'), {memory: {role: 'hauler'}});
    console.log('Spawning new hauler: ' + code);
    return;
}

module.exports = {
    spawnBuilder,
    spawnHarvester,
    spawnHauler,
    spawnUpgrader
}
