const {productSchema, reviewSchema} = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Costco = require("./models/costco");
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'please sign in')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Costco.findById(id);
    if (!product.author.equal(req.user._id)){
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/products/${id}`)
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(ReviewId);
    if (!review.author.equal(req.user._id)){
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/products/${id}`)
    }
}

