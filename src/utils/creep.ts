export function isFullAndNotWorking(creep: Creep): boolean {
  return !isWorking(creep) && isFull(creep);
}

export function isFull(creep: Creep): boolean {
  return creep.carry.energy === creep.carryCapacity;
}

export function isWorkingAndEmpty(creep: Creep): boolean {
  return isWorking(creep) && isEmpty(creep);
}

export function isEmpty(creep: Creep): boolean {
  return creep.carry.energy === 0;
}

export function isNotFull(creep: Creep): boolean {
  return creep.carry.energy < creep.carryCapacity;
}

export function isWorking(creep: Creep): boolean {
  return creep.memory.working;
}
