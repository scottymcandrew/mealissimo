// Example Recipe Search API Call:
// "https://api.edamam.com/search?q=chicken&app_id=6047f138&app_key=fccffc05eb1ab43b73f574ec0ffdab5a&from=0&to=3&calories=591-722&health=alcohol-free"
// Multiple ingredients should be separated with +
// Like this: q=chicken+mushroom
// Maximum hits is 100 on the free plan. Pagination isn't possible with the search API

const recipeApiEndpoint = "https://api.edamam.com/search?";
const recipeApiKeyID = "6047f138";
const recipeApiKey = "fccffc05eb1ab43b73f574ec0ffdab5a";
var caloriesRangeFrom = 0;
var caloriesRangeTo = 600;
var ingredientsList = [];
var excludedIngredients = [];
var data;

// Function call to return data from Recipe API
// This is a callback function, expecting the parameter "cb", which is another function.
function getRecipeData(params, cals, excluded, health, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", recipeApiEndpoint + "q=" + params + "&calories=" + cals + "&excluded" + excluded + "&app_id=6047f138&app_key=fccffc05eb1ab43b73f574ec0ffdab5a&from=0&to=100&health=alcohol-free");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Here we are executing the callback function which was passed in as a parameter
            // In this case, it is 'printDataToConsole'
            cb(JSON.parse(this.responseText));
        }
    };
}


function getRecipeIngredients(arr) {
    var recipeIngredients = [];

    //Object.values(obj).forEach(function(item) {
    arr.forEach(function (item) {
        recipeIngredients.push(`<li>${item}</li>`);
    });

    return recipeIngredients;

}

function getMoreRecipeLinks(arr) {
    var recipeLinks = [];

    arr.forEach(function (item) {
        recipeLinks.push(`<li><a href="${item.recipe.url}" target="_blank"> ${item.recipe.label} </a></li>`)
    });

    return recipeLinks;
}

function writeToDocument(params, cals, excluded, health) {
    // Clear div elements to prevent concatenation on subsequent form fills
    // var elData = document.getElementById("data");
    // var elRecipeHeader = document.getElementById("recipe-header");
    var elRecipeLabel = document.getElementById("recipe-label");
    var elRecipeImage = document.getElementById("recipe-image");
    var elRecipeIngredients = document.getElementById("recipe-ingredients");
    var elRecipeLink = document.getElementById("recipe-link");
    var elOtherRecipeLinks = document.getElementById("other-recipe-links");
    // elData.innerHTML = "";
    // elRecipeHeader.innerHTML = "";
    elRecipeLabel.innerHTML = "";
    elRecipeImage.innerHTML = "";
    elRecipeIngredients.innerHTML = "";
    elRecipeLink.innerHTML = "";
    elOtherRecipeLinks.innerHTML = "";

    if (cals > 49) {

        getRecipeData(params, cals, excluded, health, function (data) {
            if (data.hits.length > 0) {
                console.dir(data); // Adding telemetry during dev
                // data = data.hits; // hits is the array containing the recipes
                // var recipeLinks = data.hits;
                // console.dir(recipeLinks);
                var recipeCount = data.hits.length;
                var recipeNumber = Math.floor(Math.random() * recipeCount);  // returns a random integer from 0 to number of recipes (up to 100) to be used to randomise the first recipe hit.
                var recipe = data.hits[recipeNumber].recipe; // return the selected recipe Object
                var recipeIngredients = getRecipeIngredients(data.hits[recipeNumber].recipe.ingredientLines);
                var moreRecipeLinks = getMoreRecipeLinks(data.hits);

                elRecipeLabel.innerHTML = `<h2>${recipe.label}</h2>`;
                elRecipeImage.innerHTML = `<img src="${recipe.image}"/>`;
                elRecipeIngredients.innerHTML = `<ul><h2 class="header-text">Ingredients</h2>${recipeIngredients}</ul>`.replace(/,/g, `<br>`);
                elRecipeLink.innerHTML = `<button class="btn btn-primary"><a href="${recipe.url}" target="_blank">Take me to the magic!</a></button>`;

                elOtherRecipeLinks.innerHTML = `<h4>This doesn't tickle your taste-buds?</h4><p><em>Try one of these...</em></p><ul>${moreRecipeLinks}</ul>`.replace(/,/g, `<br>`);
            }
            else {
                elRecipeLabel.innerHTML = `<h2>Uh oh......<h2>`;
                elRecipeImage.innerHTML = `<img src="assets/images/corgi-food.jpg"/>`;
                elRecipeLink.innerHTML = `<p>Looks like our cute Corgi will go hungry. Maybe you need to search for something else?`;
            }
        });
    }
    else {
        elRecipeLabel.innerHTML = `<h2>Uh oh......<h2>`;
        elRecipeImage.innerHTML = `<img src="assets/images/wet-corgi.jpg"/>`;
        elRecipeLink.innerHTML = `<p>Our Corgi is too thin. We need to add more calories!`;
    }
}