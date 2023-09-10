const Post = require("../models/post")
const Comment = require('../models/comment');
module.exports.create = async(req, res) => {
    await Post.create ({
        content: req.body.content,
        user: req.user._id
    }).then(post => {
        req.flash('success', 'Post Created');
        return res.redirect('back');
    }).catch(err => {
        console.log(`Error in posting ${err}`);
        return;
    })
} 
//  function to delete post and its comments from data database
module.exports.destroy = async(req, res) => {
    await Post.findById(req.params.id)
    .then(post => {
        // .d means converting the object id into string 
        if(post.user == req.user.id){
        
            post.deleteOne();

            Comment.deleteMany({post: req.params.id})
            .then(comment => {
                req.flash('success', 'post Deleted');
                return res.redirect('back');
            })
            
        }else{
            return res.redirect('back');
        }
        
    })
    .catch(err => {
        console.log(`delet error ${err}`);
    })
}