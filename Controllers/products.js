const Costco = require("../models/costco");


module.exports.index = async (req, res) => {
    const products = await Costco.find({})
    res.render('products/index', {products})
}

module.exports.renderNewForm = (req, res) => {
    res.render('products/new')
}

module.exports.createProduct = async (req, res) => {
    const product = new Costco(req.body.product);
    product.author = req.user._id;
    await product.save();
    req.flash('success', 'Successfully uploaded a new item.');
    res.redirect(`/products/${product._id}`)
}

module.exports.showProduct = async (req, res) => {
    const product = await Costco.findById((req.params.id)).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if (!product){
        req.flash('error', 'Cannot find that item');
        return res.redirect('./products')
    }
    res.render('products/show', {product});
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const product = await Costco.findById(id);
    if (!product){
        req.flash('error', 'Cannot find that item');
        return res.redirect('./products')
    }
    res.render('products/edit', {product});
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Costco.findByIdAndUpdate(id, {...req.body.product})
    req.flash('success', 'Successfully updated item')
    res.redirect(`/products/${product._id}`)
}

module.exports.deleteProduct = async (req, res) => {
    const {id} = req.params;
    await Costco.findByIdAndDelete((id));
    req.flash('success', 'Successfully deleted item')
    res.redirect('products');
}