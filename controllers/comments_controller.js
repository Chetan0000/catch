const Comment = require('../models/comment');
const Post = require("../models/post");
    
module.exports.create = async (req, res) => {
    const post = await Post.findById(req.body.post);
    
    if(post){
        await Comment.create({
            comment: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then(comment => {
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }).catch(err => {
            //  handle error 
            console.log('cought error', err);
            return res.redirect('back');
        })
    }
}

module.exports.destroy = async (req, res) => {
    await Comment.findById(req.params.id)
    .then(comment => {
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();

            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}})
            return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    })
    .catch(err => {
        console.log(`error in deleting comment ${err}`);
        return;
    })
}