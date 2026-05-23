const mongoose = require('mongoose');

const dataBaseConnect = async(url) => {
    try {
        await mongoose.connect(url);
        console.log('Database Connected')
    } catch (error) {
        // console.log('error',error).exit(1);
        console.log('Database Disconnected',error.message)
    }
}

module.exports = {
    dataBaseConnect
}