// Example Recipe Search API Call:
// "https://api.edamam.com/search?q=chicken&app_id=6047f138&app_key=fccffc05eb1ab43b73f574ec0ffdab5a&from=0&to=3&calories=591-722&health=alcohol-free"
// Maximum hits is 100 on the free plan. Pagination isn't possible with the search API, so I have made the decision to only pull in 25 results and hide them initially behind a button

const recipeApiEndpoint = "https://api.edamam.com/search?q=";
const recipeApiKeyID = "6047f138";
const recipeApiKey = "fccffc05eb1ab43b73f574ec0ffdab5a";

// Function call to return data from Recipe API
// This is a callback function, expecting the parameter "cb", which is another function.
function getRecipeData(searchString, cals, excluded, health, cb) {
    // Building out the base API call
    var params = searchString + "&app_id=" + recipeApiKeyID + "&app_key=" + recipeApiKey + "&from=0&to=25&" + "&calories=" + cals;
    // The health parameter cannot be empty. If 'no' is selected on the form and that is passed, an error will be thrown.
    // If no is passed, we will simply clear the whole health parameter from the API call
    if (health != "no") {
        params = params + "&health=" + health;
    }
    // If excluded is left as an empty string we will remove that parameter from the API call
    if (excluded != "") {
        params = params + "&excluded=" + excluded;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", recipeApiEndpoint + params);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Here we are executing the callback function which was passed in as a parameter
            cb(JSON.parse(this.responseText));
        }
    };
}


function getRecipeIngredients(arr) {
    var recipeIngredients = [];

    arr.forEach(function (item) {
        recipeIngredients.push(`<li><i class="fas fa-drumstick-bite"></i>  ${item}</li>`);
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

function writeToDocument(searchString, cals, excluded, health) {

    var stringRegex = new RegExp(/^[\w\-\s]*$/);
    console.log(stringRegex.test('%'));

    if (stringRegex.test(searchString) && stringRegex.test(excluded)) { // Testing that both string input fields don't contain special characters

        // Clear div elements to prevent concatenation on subsequent form fills
        var elRecipeLabel = document.getElementById("recipe-label");
        var elRecipeImage = document.getElementById("recipe-image");
        var elRecipeIngredients = document.getElementById("recipe-ingredients");
        var elRecipeLink = document.getElementById("recipe-link");
        var elRecipelinksContent = document.getElementById("recipe-links-content");
        elRecipeLabel.innerHTML = "";
        elRecipeImage.innerHTML = "";
        elRecipeIngredients.innerHTML = "";
        elRecipeLink.innerHTML = "";
        elRecipelinksContent.innerHTML = "";

        // Remove search form to tidy interface
        var formContainer = document.getElementsByClassName("form-container");
        formContainer[0].style.display = "none";

        // Creating variables for the hidden containers
        var mainContent = document.getElementsByClassName("main-content");
        var recipeLinkContainer = document.getElementsByClassName("recipe-link-container");
        var ingredientsListContainer = document.getElementsByClassName("ingredients-list");

        // Reveal the hidden recipe details container
        recipeLinkContainer[0].style.display = "block";
        ingredientsListContainer[0].style.display = "block";
        mainContent[0].style.display = "block";

        // If calories isn't entered, set the value high so there are no limits
        if (cals === '') {
            cals = 5000;
        }

        if (cals > 49 && cals < 5001) {

            getRecipeData(searchString, cals, excluded, health, function (data) {
                if (data.hits.length > 0) {
                    console.dir(data); // Adding telemetry during dev
                    var recipeCount = data.hits.length;
                    var recipeNumber = Math.floor(Math.random() * recipeCount);  // returns a random integer from 0 to number of recipes (up to 100) to be used to randomise the first recipe hit.
                    var recipe = data.hits[recipeNumber].recipe; // return the selected recipe Object
                    var recipeIngredients = getRecipeIngredients(data.hits[recipeNumber].recipe.ingredientLines);
                    var moreRecipeLinks = getMoreRecipeLinks(data.hits);

                    elRecipeLabel.innerHTML = `<h2>${recipe.label}</h2>`;
                    elRecipeImage.innerHTML = `<img src="${recipe.image}"/>`;
                    elRecipeIngredients.innerHTML = `<ul><h2 class="header-text">Ingredients</h2>${recipeIngredients}</ul>`.replace(/,/g, `<br>`);
                    elRecipeLink.innerHTML = `<button class="btn btn-primary"><a href="${recipe.url}" target="_blank">I want to cook this!</a></button>`;

                    elRecipelinksContent.innerHTML = `<p><em>Try one of these...</em></p><ul>${moreRecipeLinks}</ul>`.replace(/,/g, `<br>`);

                    // Add functionality to the collapsible other recipe links section
                    var coll = document.getElementById("recipe-links-collapsible");
                    coll.style.display = "inline";
                    coll.addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    });

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
            elRecipeLink.innerHTML = `<p>Our Corgi is too thin. Try a different number of calories!`;
        }
    }
    else { // Special character was inputted, failed RegEx and so displaying error image and message
        var elRecipeLabel = document.getElementById("recipe-label");
        var elRecipeImage = document.getElementById("recipe-image");
        var elRecipeLink = document.getElementById("recipe-link");

        // Remove search form to tidy interface
        var formContainer = document.getElementsByClassName("form-container");
        formContainer[0].style.display = "none";

        // Creating variables for the hidden containers
        var mainContent = document.getElementsByClassName("main-content");
        var recipeLinkContainer = document.getElementsByClassName("recipe-link-container");
        var ingredientsListContainer = document.getElementsByClassName("ingredients-list");

        // Reveal the hidden recipe details container
        recipeLinkContainer[0].style.display = "block";
        ingredientsListContainer[0].style.display = "block";
        mainContent[0].style.display = "block";

        elRecipeLabel.innerHTML = `<h2>Uh oh......<h2>`;
        elRecipeImage.innerHTML = `<img src="assets/images/corgi-food.jpg"/>`;
        elRecipeLink.innerHTML = `<p>Looks like our cute Corgi will go hungry. Maybe you need to search for something else?`;
    }
}