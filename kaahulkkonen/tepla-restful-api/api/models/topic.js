const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String,  require: true },
    data: {type: String, require: true },
    visible: {type: Boolean, require: true }/*,
    author: String*/
})

module.exports = mongoose.model("Topic", topicSchema);