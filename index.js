const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const firstRecipe = {
  title: "Asian Glazed Chicken Thigh",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(firstRecipe);
  })
  .then((recipe) => {
    console.log(`My first recipe: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((allRecipes) => {
    allRecipes.forEach((recipe) => {
      console.log(`My recipe title: ${recipe.title}`);
    })
  
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => console.log("It's updated"))
      .catch((error) => console.log(error));
    

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Carrot Cake deleted"))
      .catch((error) => console.log(error)); 
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
  /*
  .finally(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0); 
    });
});*/

