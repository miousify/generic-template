let express = require('express');
let path = require('path');
let app = express();


let uidata//= require("src/config/ui.json")
let localedata//=  require("src/locale/en-us.json")

async function f() {
    let fs= require('fs')
    let buffer= fs.readFileSync(path.join(__dirname, "src", "config", "ui.json"))
    uidata= JSON.parse(buffer.toString())

    let buffer2= fs.readFileSync(path.join(__dirname, "src", "locale", "en-us.json"))
    localedata= JSON.parse(buffer.toString());


}



const views_url= path.join(__dirname, "src");

let nunjucks = require('nunjucks');
let nunjucksEnv= new nunjucks.Environment(new nunjucks.FileSystemLoader(views_url, {watch: true}));
nunjucksEnv.express(app)

nunjucksEnv.addGlobal("ui", uidata)
nunjucksEnv.addGlobal("locale", localedata)

app.set("views", views_url);

app.use("/resource/", express.static(path.join(__dirname, "src/assets")))

app.get("/", function (req, res) {
    res.render("index.html", {list:[1,2,3,4]});
});

app.get("/products", function (req, res) {
    res.render("products.html", {list:[1,2,3,4]});
})

app.get("/products/:product", function (req, res) {
    res.render("product.html", {list:[1,2,3,4,5,6]});
});

app.get("/checkout", function (req, res) {
    res.render("checkout.html", {list:[1,2,3,4,5,6]});
});

app.get("/signup", function (req, res) {
    res.render("signup.html", {list:[1,2,3,4,5,6]});
});

app.get("/signin", function (req, res) {
    res.render("signin.html", {list:[1,2,3,4,5,6]});
});

app.get("/cart", function (req, res) {
    res.render("cart.html", {list:[1,2,3,4,5,6]});
})


f().then(function () {
    app.listen(5000, function () {
        console.log("is listening");
    });
})