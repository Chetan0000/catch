const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // include the ID of all the comments in this posts schema itself 
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
    
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;