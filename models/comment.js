const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref :'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});


const Comment  = mongoose.model('comment', commentSchema);
module.exports = Comment;