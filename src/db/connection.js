const mongoose = require("mongoose")

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("################################")
        console.log("#                              #")
        console.log("# Conectado ao Banco de Dados! #")
        console.log("#                              #")
        console.log("################################")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main;