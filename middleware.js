const Listing = require("./models/listing.js");
const ExpressError=require('./utils/ExpressError.js')
const listingSchema = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const wrapAsync=require('./utils/wrapAsync.js')
const Review = require("./models/review.js");

module.exports.validateListing=(req,res,next)=>{
  let {error}= listingSchema.validate({ listing: req.body });
  if(error)
    {
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }
    else{
      next()
    }
}

module.exports.validateReview=(req,res,next)=>{
  let {error}= reviewSchema.validate(req.body);
  if(error)
    {
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }
    else{
      next()
    }
}


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated())
        {
          //redirect url
          req.session.redirectUrl =req.originalUrl
          req.flash("error","Login First")
           return res.redirect("/login")
        }      next()
}

module.exports.savedUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
    
  }
  next()
}

module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params
  let listing=await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id))
  {
    req.flash("error","You are not a Owner of this listing")
    return res.redirect(`/listings/${id}`)
  }
  next()
}

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id,reviewId}=req.params
  let review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id))
  {
    req.flash("error","You cannot delete this review")
    return res.redirect(`/listings/${id}`)
  }
  next()
}