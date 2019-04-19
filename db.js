const Sequelize = require('sequelize')
const sequelize = module.exports.sequelize = new Sequelize({ dialect: 'sqlite', storage: `${__dirname}/db.sqlite` })

console.log(Sequelize.STRING)

const Domain = module.exports.Domain = sequelize.define('domain', {
    domain: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: Sequelize.STRING,
        default: 'domain'
    }
});

const IP = module.exports.IP = sequelize.define('ip', {
    byte1: {
        type: Sequelize.INTEGER
    },
    byte2: {
        type: Sequelize.INTEGER
    },
    byte3: {
        type: Sequelize.INTEGER
    },
    byte4: {
        type: Sequelize.INTEGER
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['byte1', 'byte2', 'byte3', 'byte4']
        }
    ]
})

IP.prettyPrint = function (ip) {
    return `${ip.byte1}.${ip.byte2}.${ip.byte3}.${ip.byte4}`
}

module.exports.init = async function() {
    console.log('Syncing db...')
    await sequelize.sync()
}
