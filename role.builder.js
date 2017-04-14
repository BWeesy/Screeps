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
	    	targetRoad = targetter.road(creep);
	    	targetBuild = targetter.build(creep);
	    	targetWall = targetter.wall(creep);
	    	if (targetRoad){
	    		if(creep.repair(targetRoad) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(targetRoad, {visualizePathStyle: {stroke: '#ffaa00'}});
            	}
	    	}
	    } else if (targetBuild) {
	    		if(creep.build(targetBuild) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(targetBuild, {visualizePathStyle: {stroke: '#ffaa00'}});
            	}
	    } else if (targetWall){
	    		if(creep.repair(targetWall) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(targetWall, {visualizePathStyle: {stroke: '#ffaa00'}});
            	}
	    } else {
	        targetStorage = targetter.withdraw(creep);
            if(creep.harvest(targetStorage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;