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

        targetSpawner = targets[0]
        return targetSpawner

    }
};

module.exports = targetter;