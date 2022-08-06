import targetter from '../utils/targetting.js';
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity) {
            targetSource = targetter.source(creep); //error checking on targetSource
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            targetStorage = targetter.store(creep);    
            if(creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

export default roleHarvester;