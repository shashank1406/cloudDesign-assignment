const mongoose = require('mongoose')

const takSchema = new mongoose.Schema({

    title:String,
    description:String,
    status: {
        type: String,
        enum : ['open','in-progress','completed']
    },

}, { timestamps: true });

module.exports = mongoose.model('taskCollection',takSchema)