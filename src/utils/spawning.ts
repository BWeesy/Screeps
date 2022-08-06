import { filter, first } from "lodash";
import body from "./body_constants";
import createName from "./naming";

const spawner = Game.spawns.Gubbins;
const sources = spawner.room.find(FIND_SOURCES);
const availableEnergy = spawner.room.energyAvailable;

function spawnHarvester(): void {
  const targetSource = first(
    filter(sources, srs => spawner.room.find(FIND_MY_CREEPS, { filter: s => s.memory.workId === srs.id }).length === 0)
  );

  const bodyPieces = [WORK, MOVE, CARRY];
  let cost = body.WORK.cost + body.MOVE.cost + body.CARRY.cost;
  while (cost + body.WORK.cost <= availableEnergy) {
    bodyPieces.push(WORK);
    cost += body.WORK.cost;
  }

  const code = spawner.spawnCreep(bodyPieces, createName("harvester"), {
    memory: { role: "harvester", workId: targetSource.id, working: false }
  });
  console.log(`Spawning new harvester: ${code}`);
  return;
}

function spawnBuilder(): void {
  const bodyPieces = [MOVE, CARRY, WORK];
  let cost = body.MOVE.cost + body.CARRY.cost + body.WORK.cost;
  while (cost + body.WORK.cost + body.CARRY.cost + body.MOVE.cost <= availableEnergy) {
    bodyPieces.push(WORK);
    bodyPieces.push(CARRY);
    bodyPieces.push(MOVE);
    cost += body.WORK.cost + body.CARRY.cost + body.MOVE.cost;
  }
  const code = spawner.spawnCreep(bodyPieces, createName("builder"), {
    memory: { role: "builder", workId: null, working: false }
  });
  console.log(`Spawning new builder: ${code}`);
  return;
}

function spawnUpgrader(): void {
  const bodyPieces = [WORK, CARRY, MOVE];
  const code = spawner.spawnCreep(bodyPieces, createName("upgrader"), {
    memory: { role: "upgrader", workId: null, working: false }
  });
  console.log(`Spawning new upgrader: ${code}`);
  return;
}

function spawnHauler(): void {
  const bodyPieces = [MOVE, CARRY];
  let cost = body.MOVE.cost + body.CARRY.cost;
  while (cost + body.MOVE.cost + 2 * body.CARRY.cost <= availableEnergy) {
    bodyPieces.push(MOVE);
    bodyPieces.push(CARRY);
    bodyPieces.push(CARRY);
    cost += body.WORK.cost + 2 * body.CARRY.cost;
  }
  const code = spawner.spawnCreep(bodyPieces, createName("hauler"), {
    memory: { role: "hauler", workId: null, working: false }
  });
  console.log(`Spawning new hauler: ${code}`);
  return;
}

export default {
  spawnBuilder,
  spawnHarvester,
  spawnHauler,
  spawnUpgrader
};
