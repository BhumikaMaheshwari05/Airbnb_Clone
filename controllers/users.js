const User = require('../models/user');

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.registerUser=async(req,res)=>{
    try{
        let {username,email,password}=req.body
        const newUser=new User({email,username})
        const registeredUser=await User.register(newUser,password)  // This save ths user in database!!
        req.login(registeredUser,(err)=>{  // for automatically login after signup
            if(err){
                return next(err)
            }
            else{
                req.flash("success","Welcome to Wanderlust")
                res.redirect("/listings")
            }
        })
        
    }
    catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }

}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome, login Succsess")
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
  }

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
     if(err){
        next()
     }
     else{
        req.flash("success","You are logged out!")
        res.redirect("/listings")
     }
    })
}