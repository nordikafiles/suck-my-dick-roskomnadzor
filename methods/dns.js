const dns = require('dns')
const { getRouteCmd, execCmd } = require('./cmd')

module.exports.getIP = function getIP(host) {
    return new Promise((resolve, reject) => {
        dns.resolve(host, (err, addresses) => {
            if (err) return reject(err)
            resolve(addresses)
        })
    })
}

module.exports.initDNS = async function initDNS() {
    console.log(await execCmd(getRouteCmd('8.8.8.8')))
}