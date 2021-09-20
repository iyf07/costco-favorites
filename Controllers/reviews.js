const Costco = require("../models/costco");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const product = await Costco.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Created a new review')
    res.redirect(`/products/${product._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await Costco.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/products/${id}`)
}