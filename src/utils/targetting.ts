const targetter = {
  source(creep: Creep): Source | null {
    const targets = creep.room.find(FIND_SOURCES);
    return _.sortBy(targets, t => creep.pos.getRangeTo(t))[0];
  },

  spawner(creep: Creep): StructureSpawn | StructureExtension {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType === STRUCTURE_EXTENSION ||
        (structure.structureType === STRUCTURE_SPAWN && structure.energy < structure.energyCapacity)
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
      filter: structure =>
        (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
        structure.store[RESOURCE_ENERGY] > 0
    }) as unknown as (StructureContainer | StructureStorage)[];
    if (containerTargets.length > 0) {
      return _.last(_.sortBy(containerTargets, t => t.store[RESOURCE_ENERGY]));
    } else {
      return null;
    }
  },

  withdrawSource(creep: Creep): Source | null {
    const sourceTargets = creep.room.find(FIND_SOURCES);
    return _.sortBy(sourceTargets, t => creep.pos.getRangeTo(t))[0];
  },

  build(creep: Creep): ConstructionSite<BuildableStructureConstant> | null {
    const constructs = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (constructs.length > 0) {
      return _.last(_.sortBy(constructs, c => c.progress / c.progressTotal));
    } else {
      return null;
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
