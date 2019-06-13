// Example Recipe Search API Call:
// "https://api.edamam.com/search?q=chicken&app_id=6047f138&app_key=fccffc05eb1ab43b73f574ec0ffdab5a&from=0&to=3&calories=591-722&health=alcohol-free"
// Multiple ingredients should be separated with +
// Like this: q=chicken+mushroom

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
function getRecipeData(params, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", recipeApiEndpoint + "q=" + params + "&app_id=6047f138&app_key=fccffc05eb1ab43b73f574ec0ffdab5a&from=0&to=3&calories=591-722&health=alcohol-free");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Here we are executing the callback function which was passed in as a parameter
            // In this case, it is 'printDataToConsole'
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function getTableRows(obj) {
    var tableRows = [];

    Object.values(obj).forEach(function(item) {
        tableRows.push(`<td>${item}</td>`);
    });

    return tableRows;
}

function getTableEntries(obj) { // This function is a combination of the two get headers/row functions above
    var tableEntries = [];

    Object.entries(obj).forEach(function(item) {
        tableEntries.push(`<td>${item}</td>`);
    });

    return tableEntries;
}

function getRecipeIngredients(arr) {
    var recipeIngredients = [];

    //Object.values(obj).forEach(function(item) {
    arr.forEach(function(item) {
        recipeIngredients.push(`<li>${item}</li>`);
    });

    return recipeIngredients;
    
}

function getRecipeMethod(obj) {
    var recipeMethod = [];
}

function writeToDocument(params) {
    // Clear div elements to prevent concatenation on subsequent form fills
    // var elData = document.getElementById("data");
    // var elRecipeHeader = document.getElementById("recipe-header");
    var elRecipeLabel = document.getElementById("recipe-label");
    var elRecipeImage = document.getElementById("recipe-image");
    var elRecipeIngredients = document.getElementById("recipe-ingredients");
    var elRecipeLink = document.getElementById("recipe-link");
    // elData.innerHTML = "";
    // elRecipeHeader.innerHTML = "";
    elRecipeLabel.innerHTML = "";
    elRecipeImage.innerHTML = "";
    elRecipeIngredients.innerHTML = "";
    elRecipeLink.innerHTML = "";

    getRecipeData(params, function(data) {
        console.dir(data); // Adding telemetry during dev
        // data = data.hits; // hits is the array containing the recipes
        var recipe = data.hits[0].recipe; // return the first recipe Object
        var recipeIngredients = getRecipeIngredients(data.hits[0].recipe.ingredientLines);
        // var tableHeaders = getTableHeaders(data[0].recipe);
        // var tableRows = getTableRows(data[0].recipe);
        //elData.innerHTML = `<table>${tableHeaders}${tableRows}</table>`

        elRecipeLabel.innerHTML = `<h4>${recipe.label}</h4>`;
        elRecipeImage.innerHTML = `<img src="${recipe.image}"/>`;
        elRecipeIngredients.innerHTML = `<ul><h2 class="header-text">Ingredients</h2>${recipeIngredients}</ul>`.replace(/,/g, `<br>`);
        elRecipeLink.innerHTML = `<a href="${recipe.url}" target="_blank">Want to cook this?</a>`;
        

    });


}