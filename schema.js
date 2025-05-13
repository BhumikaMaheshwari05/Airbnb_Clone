// The main purpose of using Joi in this context is to validate and sanitize incoming user data before it's saved to your MongoDB database.


const Joi = require('joi');

module.exports = Joi.object({ 
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})


// In your case, the Joi schema ensures:
// title, description, price, location, country are all present and of the correct type.

// price must be a number ≥ 0.

// image can be missing, empty, or null — it won’t cause an error.

// If any of this is missing or invalid, it won't proceed to save in MongoDB.
