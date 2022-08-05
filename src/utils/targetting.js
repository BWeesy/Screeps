var targetter = {

    /** @param {creep} creep**/
    source: function(creep) {
        if (creep.memory.source) {
            var targetSource = creep.pos.findClosestByPath(FIND_SOURCES,{filter: (s) => s.id == creep.memory.source});
            return targetSource;
        } else {
            var targets = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy < source.energyCapacity;
             }
            });

            targetSource = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
            return targetSource
        }
    },

    spawner: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });

        targetSpawner = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
        return targetSpawner

    },

    store: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
                         && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
        if (targets.length > 0) {
            targetStorage = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
            return targetStorage
        } else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            targetSpawner = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
            return targetSpawner
        }
    },

    withdraw: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] > 0;
            }
        });

        if (targets.length > 0) {
            targetStorage = _.last(_.sortBy(targets, t => t.store[RESOURCE_ENERGY]));
            return targetStorage
        } else{
            var targets = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy < source.energyCapacity;
                }
            });

            targetSource = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
            return targetSource
        }
    },

    build: function(creep) {

        var constructs = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (constructs.length > 0) {
            targetConstruct = _.last(_.sortBy(constructs, c => c.progress/c.progressTotal));
            return targetConstruct
        }
        else{
            return false
        }
    },

    wall: function(creep) {

        var walls = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL;
            }
        });

        if (walls.length > 0) {
            targetWall = _.sortBy(walls, w => w.hits)[0];
            return targetWall
        } else {
            return false
        }
    },

    repair: function(creep) {

        var repairs = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < 0.5*structure.hitsMax && structure.structureType != STRUCTURE_WALL;
            }
        });

        if (repairs.length > 0) {
            targetRepair = _.sortBy(repairs, r => r.hits)[0];
            return targetRepair
        } else {
            return false
        }
    }
};

module.exports = targetter;