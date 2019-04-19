const { Domain, IP } = require('../db')
const { initDNS, getIP } = require('./dns')
const { getRouteCmd, execCmd } = require('./cmd')

const unblockIP = module.exports.unblockIP = async function (ip, domain=null) {
    ip = ip.split('.')
    let res = await IP.findOrCreate({
        where: {
            byte1: ip[0],
            byte2: ip[1],
            byte3: ip[2],
            byte4: ip[3],
        },
        defaults: {
            byte1: ip[0],
            byte2: ip[1],
            byte3: ip[2],
            byte4: ip[3],
        }
    })
    res = res[0]
    console.log(res)
    let result = { ip: IP.prettyPrint(res), domain }
    try {
        result.output = await execCmd(getRouteCmd(IP.prettyPrint(res)))
    } catch (err) {
        result.error = err.message
    }
    console.log(result)
    return result
}

const unblockDomain = module.exports.unblockDomain = async function(domain) {
    console.log(`Trying to unblock ${domain}...`)
    let data = { domain: domain, type: 'domain' }
    let res = await Domain.findOrCreate({ where: data, defaults: data })
    res = res[0]
    console.log(`Resolving domain ${domain}...`)
    let hosts = await getIP(domain)
    console.log(`Resolving domain ${domain}...[OK]`)
    console.log(`Adding routes ${domain}...`)
    let results = []
    for (let host of hosts) {
        results.push(await unblockIP(host, domain))
    }
    return results
}

const unblockAll = module.exports.unblockAll = async function() {
    let domains = await Domain.findAll();
    for (let domain of domains) {
        await unblockDomain(domain.domain)
    }
    let ips = await IP.findAll();
    for (let ip of ips) {
        await execCmd(getRouteCmd(IP.prettyPrint(ip)))
    }
}