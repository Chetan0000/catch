const Post = require("../models/post")
const User = require('../models/user');

 



module.exports.home = async function(req, res){
    await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path: 'user'
        }
    })
    .then( posts=> {
        User.find({}).then(users => {
            return res.render('home',{
                title:"HOME",
                posts:posts,
                all_users:users
            } )

        })
        .catch(err => [

        ])
        
    }).catch(err => {
        console.log(err);
        return;
    })

    // await Post.find({}).populate('user').exec((post, err) => {
    //     return res.render('home',{
    //         title:"HOME",
    //         posts:posts
    //     })
    // })  

    
   
}