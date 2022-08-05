import targetter from '../utils/targetting.js';
var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
	        targetStorage = targetter.withdraw(creep);
	        if(creep.withdraw(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             	creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            targetSpawner = targetter.spawner(creep);    
            if(creep.transfer(targetSpawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSpawner, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

export default roleHauler;