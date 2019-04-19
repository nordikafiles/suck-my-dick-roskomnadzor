const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { unblockDomain, unblockIP, unblockAll } = require('./methods/unblock')
const { Domain, IP } = require('./db')

app.use(bodyParser.json())

app.use(express.static(`${__dirname}/static`))

app.get('/domains', async (req, res) => {
    try {
        let domains = await Domain.findAll()
        res.json({ success: true, domains })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/ips', async (req, res) => {
    try {
        let ips = await IP.findAll()
        res.json({ success: true, ips })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/domains', async (req, res) => {
    try {
        res.json({ success: true, results: await unblockDomain(req.body.domain) })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/ips', async (req, res) => {
    try {
        res.json({ success: true, results: await unblockIP(req.body.ip) })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


module.exports.listen = () => {
    app.listen(CONFIG.port, (err) => {
        console.log(`Server is listening on *:${CONFIG.port}`)
    })
}