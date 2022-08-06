var targetter = require('utils_targetting');
var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('?? harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            delete(creep.memory.targetStorage);
            creep.say('? upgrade');
        }

        if(creep.memory.upgrading) {
            //TODO write clever targeting based on completion and proximity
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            //TODO write clever targeting based on energy available and proximity
            targetStorage = targetter.withdraw(creep);
            if(creep.withdraw(Game.getObjectById(targetStorage), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(targetStorage), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;