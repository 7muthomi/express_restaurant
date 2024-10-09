import express, { response } from "express";
import path from "path";
import{fileURLToPath} from "url";


// instantiate an express server
let app = express();
let port =4000;

let __fileName = fileURLToPath(import.meta.url);
console.log({__fileName});

let __dirName =path.dirname(__fileName);
console.log({__dirName});

// use static assets
app.use(express.static("public"));

// specify where to access our app
app.listen(port, () => console.log("Server listening on port", port));

// set up templating engines
app.set('view engine','pug')
app.set('views', './views')

// Home route handler 
app.get('/', async (req, res) => {

    let response = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25 &apiKey=f0eb023bf13a4e9ca06b5c89c649913e')

    let recipeData =await response.json();
    console.log({recipeData});

    let resp = await fetch('https://api.openbrewerydb.org/v1/breweries/');

    let data =await resp.json();
    console.log({data});

    let drinks=data;

    let recipes=recipeData.results;

    res.render('index',{recipes,drinks});

    // res.render('recipe', {recipes});
    // }catch(error){
    //     console.log(error);

    //     res.status(500).send("internal server error");


    

});

// drinks
// app.get('/', async (req, res) => {
// let resp = await fetch('https://api.openbrewerydb.org/v1/breweries/');

// let data =await response.json();
// console.log({data});

// let drinks=data;

// res.render('drinks', {drinks});
// // // }catch(error){
// // //     console.log(error);

// // //     res.status(500).send("internal server error");




// });

// Recipes route handler
app.get('/recipe', async (req,res) =>{
    let response = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25 &apiKey=f0eb023bf13a4e9ca06b5c89c649913e')

    let recipeData =await response.json();
    console.log({recipeData});
    let recipes=recipeData.results;

    res.render("recipe",{recipes} )

});
// drinks route handler
app.get('/drinks', async (req,res) =>{
    let resp = await fetch('https://api.openbrewerydb.org/v1/breweries/');

    let data =await resp.json();
    console.log({data});
    let drinks=data.results;

    res.render("drinks", {drinks});

});

