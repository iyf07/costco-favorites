const mongoose = require('mongoose');
const products = require('./products');
const Costco = require('../models/costco')


mongoose.connect('mongodb+srv://123qwe:123qwe@cluster0.1fsb9.mongodb.net/CostcoGoods?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Costco.deleteMany({});
    for(let i = 0; i <= Costco.length; i++){
        const product = new Costco({
            author: '61457b4bfe3a1c1f704e9a89',
            title: products[i].title,
            price: products[i].price,
            image: products[i].image,
            description: products[i].description,
            likes: products[i].likes,
            dislikes: products[i].dislikes,
        })
        await product.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})