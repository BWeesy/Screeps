var targetter = require('utils_targetting');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) { //when out of energy, harvest
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) { //when full, build
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	    	targetBuild = targetter.build(creep);
	    	targetWall = targetter.wall(creep);
	    	targetRepair = targetter.repair(creep);
	    	if (targetRepair && !creep.memory.repairId){
	    		creep.memory.repairId = targetRepair.id;
	    	}
	    	if (creep.memory.repairId){
	    		if(creep.repair(Game.getObjectById(creep.memory.repairId)) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(Game.getObjectById(creep.memory.repairId), {visualizePathStyle: {stroke: '#ffaa00'}});
                	creep.say('re');
            	}
            	if (Game.getObjectById(creep.memory.repairId).hits == Game.getObjectById(creep.memory.repairId).hitsMax){
            		creep.memory.repairId = false;
            	}
	    	} else if (targetBuild) {
	    		if(creep.build(targetBuild) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(targetBuild, {visualizePathStyle: {stroke: '#ffaa00'}});
                	creep.say('b');
            	}
	    	}
	    } else {
	        targetStorage = targetter.withdraw(creep);
	        if(creep.withdraw(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             	creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if(creep.harvest(targetStorage) == ERR_NOT_IN_RANGE) {
             	creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;