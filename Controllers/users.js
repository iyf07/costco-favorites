const User = require("../models/user");
const passport = require("passport");

module.exports.renderRegister = (req, res) => (
    res.render('users/register')
)

module.exports.register = async(req,res)=>{
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success','Welcome')
            res.redirect('/products');
        })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back')
    const redirectUrl = req.session.returnTo || '/products'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) =>{
    req.logout();
    req.flash('success', 'Goodbye')
    res.redirect('/products')
}