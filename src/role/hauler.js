var targetter = require('utils_targetting');
var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            targetStorage = targetter.withdraw(creep)
	        if(creep.withdraw(Game.getObjectById(targetStorage), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             	creep.moveTo(Game.getObjectById(targetStorage), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            delete(creep.memory.targetStorage);
            targetSpawner = targetter.spawner(creep);    
            if(creep.transfer(targetSpawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSpawner, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleHauler;