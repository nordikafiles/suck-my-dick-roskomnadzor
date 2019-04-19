const fs = require('fs')
const yaml = require('yaml')

const CONFIG_FILE = `${__dirname}/config.yaml`
const EXAMPLE_CONFIG_FILE = `${__dirname}/config.example.yaml`

global.CONFIG = yaml.parse(fs.readFileSync(EXAMPLE_CONFIG_FILE, 'utf8'))
if (fs.existsSync(CONFIG_FILE)) {
    global.CONFIG = { ...global.CONFIG, ...yaml.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) }
}

const { initDNS, getIP } = require('./methods/dns')
const { getRouteCmd, execCmd } = require('./methods/cmd')
const { unblockDomain, unblockAll } = require('./methods/unblock')

const server = require('./server')
const db = require('./db')

Promise.resolve().then(async () => {
    // unblockDomain("rutracker.org");
    // unblockDomain("getip.ru");
    try {
        await db.init()
        await server.listen()
        await initDNS()
        await unblockAll()
    } catch (err) {
        console.log(err)
    }
})