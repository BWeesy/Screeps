var targetter = {

    /** @param {creep} creep**/
    source: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        targetSource = sources[0];
        return targetSource
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
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                    structure.energy < structure.energyCapacity;
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
                    structure.energy > 0;
            }
        });

        if (targets.length > 0) {
            targetStorage = _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
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
        

    }
};

module.exports = targetter;