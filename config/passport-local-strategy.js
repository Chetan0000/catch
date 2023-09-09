const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//  authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    async (email , password, done) => {
        // find a user and establish the identity
        await User.findOne({email:email}) .then(user => {
            if(!user || user.password != password){
                console.log(`invalid user name password`);
                return done(null, false);
            }

            return done(null, user);
            })
            .catch(err => {
                console.log(`Error in finding user --> passport ${err}`);
                return done(err);
            })
        
    }

));

//  serializing the user to decide which key is to be kept in the cookie
passport.serializeUser((user,done) => {
    done(null , user.id);
})


// deserializing the user from the key in the cookies
passport.deserializeUser( async(id, done) => {
    await User.findById(id).then(user => {
        return done(null, user);
    })
    .catch(err => {
        console.log(`Error in finding user --> passport ${err}`);
        return done(err);
    })
})


//check if hte user is authenticated 
passport.checkAuthentication = (req, res , next) => {
    // if user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        // req.user contains the current signed in user form the session-cookie and we just sending this locals for the views
        res.locals.user = req.user;

    }
    next();
}

module.exports = passport;
