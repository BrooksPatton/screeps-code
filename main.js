const CREEP_BODY = [WORK, CARRY, CARRY, MOVE, MOVE]

function loop() {
    for(let name in Game.spawns) {
        const spawn = Game.spawns[name]
        const { room } = spawn
        
        if(canSpawnCreep({ room, cost: calculateBodyCost(CREEP_BODY) })) {
            const role = 'harvester'
            const name = generateRandomName(role)
            const options = {
                memory: {
                    working: false,
                    role,
                }
            }
            if(spawn.spawnCreep(CREEP_BODY, name, options) === OK) {
                console.log(`Spawning ${name} as a ${options.memory.role}`)
            } else {
                console.log(`Something went wrong trying to spawn a creep`)
            }
        }
    }
}

function calculateBodyCost(body) {
    return body.reduce((total, bodyPart) => total + BODYPART_COST[bodyPart], 0)
}

function canSpawnCreep({ room, cost }) {
    const { energyAvailable } = room

    return cost <= energyAvailable
}

function generateRandomName(role) {
    const randomNumber = Math.floor(Math.random() * 10000)

    return `${role}-${randomNumber}`
}

module.exports = {loop}