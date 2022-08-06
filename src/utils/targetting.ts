const targetter = {
  source(creep: Creep): Source | null {
    if (creep.memory.workId) {
      return creep.pos.findClosestByPath(FIND_SOURCES, { filter: s => s.id === creep.memory.workId });
    } else {
      const targets = creep.room.find(FIND_SOURCES, {
        filter: source => {
          return source.energy < source.energyCapacity;
        }
      });

      return _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
    }
  },

  spawner(creep: Creep): StructureSpawn | StructureExtension {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity
        );
      }
    });

    return _.sortBy(targets, t => creep.pos.getRangeTo(t))[0] as StructureSpawn | StructureExtension;
  },

  store(creep: Creep): StructureContainer | StructureStorage {
    const containerTargets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
          structure.store[RESOURCE_ENERGY] < structure.storeCapacity
        );
      }
    });
    if (containerTargets.length > 0) {
      return _.sortBy(containerTargets, t => creep.pos.getRangeTo(t))[0] as StructureContainer | StructureStorage;
    } else {
      const spawnTargets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity
          );
        }
      });

      return _.sortBy(spawnTargets, t => creep.pos.getRangeTo(t))[0] as StructureContainer | StructureStorage;
    }
  },

  withdrawContainer(creep: Creep): StructureContainer | StructureStorage | null {
    const containerTargets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
          structure.store[RESOURCE_ENERGY] > 0
        );
      }
    });

    if (containerTargets.length > 0) {
      return _.sortBy(containerTargets, t => creep.pos.getRangeTo(t))[0] as StructureContainer | StructureStorage;
    } else {
      return null;
    }
  },

  withdrawSource(creep: Creep): Source | null {
    const sourceTargets = creep.room.find(FIND_SOURCES, {
      filter: source => {
        return source.energy < source.energyCapacity;
      }
    });

    return _.sortBy(sourceTargets, t => creep.pos.getRangeTo(t))[0];
  },

  build(creep: Creep): false | ConstructionSite<BuildableStructureConstant> {
    const constucts = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (constucts.length > 0) {
      return _.sortBy(constucts, c => c.progress / c.progressTotal)[constucts.length - 1];
    } else {
      return false;
    }
  },

  wall(creep: Creep): false | StructureWall {
    const walls = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return structure.structureType === STRUCTURE_WALL;
      }
    });

    if (walls.length > 0) {
      return _.sortBy(walls, w => w.hits)[0] as StructureWall;
    } else {
      return false;
    }
  },

  repair(creep: Creep): false | AnyStructure {
    const repairs = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return structure.hits < 0.5 * structure.hitsMax && structure.structureType !== STRUCTURE_WALL;
      }
    });

    if (repairs.length > 0) {
      return _.sortBy(repairs, r => r.hits)[0];
    } else {
      return false;
    }
  }
};

export default targetter;
