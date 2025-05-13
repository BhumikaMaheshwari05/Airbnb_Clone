const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.addReviews=async(req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id)
    let newReview=new Review(req.body.review)
    newReview.author=req.user._id
    listing.reviews.push(newReview)
  
    await newReview.save();
    await listing.save()
    req.flash("success","Review Created")
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReviews=async(req,res)=>{
    let {id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id ,{$pull:{reviews:reviewId}}) // reviews array ke andar jo bhi review reviewId se match karega use pull 
    await Review.findByIdAndDelete(reviewId)                        //pull kr denge means remove kr denge 
    req.flash("success","Review Deleted")                                                                         
    res.redirect(`/listings/${id}`);
  }