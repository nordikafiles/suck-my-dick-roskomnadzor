const { exec } = require('child_process')

module.exports.getRouteCmd = function getRouteCmd(host, os='mac') {
    if (os == 'mac')
        return `route add -host ${host} -interface ${CONFIG.interface}`
    return ''
}

module.exports.execCmd = function execCmd(cmd) {
    return new Promise((resolve, reject) => {
        exec(`/bin/bash -c '${cmd}'`, (error, stdout, stderr) => {
            if (error) return reject(error)
            resolve(stdout)
        })
    })
}
