function renderDomains(domains) {
    document.querySelector('#domainsBox').innerHTML = `
        ${domains.map(x => `
            <div>#${x.id} ${x.domain} [${x.type}]</div>
        `).join('')}
    `
}

function renderIPs(ips) {
    document.querySelector('#ipsBox').innerHTML = `
        ${ips.map(x => `
            <div>#${x.id} ${x.byte1}.${x.byte2}.${x.byte3}.${x.byte4}</div>
        `).join('')}
    `
}

async function addDomain(domain) {
    let response = await fetch('/domains', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain })
    })
    response = await response.json()
    await loadDomains()
    await loadIPs()
}

async function addIP(ip) {
    let response = await fetch('/ips', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip })
    })
    response = await response.json()
    await loadDomains()
    await loadIPs()
}


async function loadDomains() {
    let response = await fetch('/domains')
    response = await response.json()
    renderDomains(response.domains)
}

async function loadIPs() {
    let response = await fetch('/ips')
    response = await response.json()
    renderIPs(response.ips)
}

loadDomains()
loadIPs()