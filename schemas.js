const Joi = require("joi");
module.exports.productSchema = Joi.object({
    product: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        // rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})
