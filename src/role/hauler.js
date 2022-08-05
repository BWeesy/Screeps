var targetter = require('utils_targetting');
var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            if (!creep.memory.targetStorage){
                console.log(targetter.withdraw(creep))
                console.log(targetter.withdraw(creep).id)
	        creep.memory.targetStorage = targetter.withdraw(creep).id;
        }
	        if(creep.withdraw(Game.getObjectById(creep.memory.targetStorage), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             	creep.moveTo(Game.getObjectById(creep.memory.targetStorage), {visualizePathStyle: {stroke: '#ffaa00'}});
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