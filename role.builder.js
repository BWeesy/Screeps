var targetter = require('service.targetting');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) { //when out of energy, harvest
            creep.memory.building = false;
            creep.say('?? harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) { //when full, build
	        creep.memory.building = true;
	        creep.say('?? build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
            	//TODO write clever targeting based on completion and proximity
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        targetStorage = targetter.withdraw(creep);
            if(creep.harvest(targetStorage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;