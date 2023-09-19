const User = require('../models/user');


module.exports.profile = async function(req,res){
    await User.findById(req.params.id)
    .then(user => {
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        })
    })
    .catch(err => {

    })
   
}

// update profile 

exports.createNodeWithImg = async (req,res) => {
    try{
        res.status(201).json({message:"Success",data:{}});
    }catch (error){
        res.status(400).json({
            status:"Failed",
            message:"Error in creating a new note"+error,
        })
    }
}

module.exports.update = async (req, res) => {
    // if(req.user.id == req.params.id){
    //     await User.findByIdAndUpdate(req.params.id, req.body)
    //     .then(user => {
    //         return res.redirect('back');
    //     })
    //     .catch(err => {
    //         console.log(`error in updating user name and email ${err}`);
    //         res.status(401).send('unauthorized');
    //     })
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err) => {
                if(err){
                    console.log("multer Error",err);
                }
                user.name = req.body.name;
                user.email = req.body.emaill

                
            });
            return res.redirect('back');

        }catch(error){
            req.flash('error','user exist');
            console.log(error);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page 

module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Codeial | sign up'
    })
}

//  render the sign in page 
module.exports.singIn = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:'Codeial | sign in'
    })
}


//get the sign up data
module.exports.create = async(req, res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    const find = await User.findOne({email:req.body.email});
    if(!find){
        const checkName = await User.findOne({name:req.body.name})
        if(!checkName){
            const create = await User.create(req.body);
            if(create){
                return res.redirect('/users/sign-in');
            }else{
                console.log(`error in creating user while signing up ${create}`);
                return;
            }

        }else{
            console.log(`user name exist`);
            return res.redirect('/users/sign-up');
        }
        
    }else{
        console.log(`email already exist ${find}`);
        return res.redirect('back');
    }
    


}


//get the sign in and create Session for the user 
module.exports.createSession = async(req, res) => {
    //  find the user 
    
    // const find  = await User.findOne({email:req.body.email}).then( user =>{
    // // handel user found
    //     if(user){
    //         // handel passwords witch dosen't match
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }

    //         // handel session creation
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile');

    //     }else{
    //         // handel user not found
    //         return res.redirect('back');

    //     }
    // }).catch(err => {
    //     console.log(`Error in finding user in signing in ${err}`);
    // })
    req.flash('success','Logged in Successfully');
    return res.redirect('/');

    
}


// getting signed out and redirect to sign in page
module.exports.destroySession = (req,res) => {
    req.logout( (err) => {
        if(err){console.log(`error in sign-out ${err}`);}
        req.flash('success','Logged out Successfully');
        return res.redirect('/');
    });

    
}