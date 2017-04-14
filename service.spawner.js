var spawner = {

    /** @param {} **/
    run: function() {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        console.log('Harvesters: ' + harvesters.length + ' Haulers: ' + haulers.length + ' builders: ' + builders.length + ' Upgraders: ' + upgraders.length);

        var targetBuilders = 3;
        var targetUpgraders = 3;
        var targetHaulers = 2;

        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        if(harvesters.length < sources.length) {

            sources.forEach(function(srs){
            var tmp = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id})
            if(tmp == ''){
                targetSource = srs.id;
            }
            });
            var number = Math.random().toFixed(3) * 1000;
            harvesterName = 'harvester' + number.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK, WORK,WORK,WORK,CARRY,CARRY,MOVE], harvesterName, {role: 'harvester', source: targetSource});
            console.log('Spawning new harvester: ' + newName);
        }

        if(haulers.length < targetHaulers) {
            var number = Math.random().toFixed(3) * 1000;
            haulerName = 'hauler' + number.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], haulerName, {role: 'hauler'});
            console.log('Spawning new hauler: ' + newName);
        }
        
        if(upgraders.length < targetUpgraders) {
            var number = Math.random().toFixed(3) * 1000;
            updaterName = 'updater' + number.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], updaterName, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }

        if(builders.length < targetBuilders) {
            var number = Math.random().toFixed(3) * 1000;
            builderName = 'builder' + number.toString();
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], builderName, {role: 'builder'});
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