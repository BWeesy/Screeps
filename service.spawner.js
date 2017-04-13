var spawner = {

    /** @param {} **/
    run: function() {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Harvesters: ' + harvesters.length + ' builders: ' + harvesters.length + ' Upgraders: ' + harvesters.length);

        var targetPopulation = 3
        var targetHarvesters = 1;
        var targetBuilders = 1;
        var targetUpgraders = 1;

        if(harvesters.length < targetHarvesters) {
            harvesterName = 'harvester' + harvesters.length.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], harvesterName, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        
        if(upgraders.length < targetUpgraders) {
            updaterName = 'harvester' + upgraders.length.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], updaterName, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }

        if(builders.length < targetBuilders) {
            builderName = 'harvester' + builders.length.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], builderName, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
        
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
            for(var i in Memory.creeps) {
                if(!Game.creeps[i]) {
                    delete Memory.creeps[i];
                }
            }
        }

    }
};

module.exports = spawner;