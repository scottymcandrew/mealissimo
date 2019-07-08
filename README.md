# Mealissimo - a web application to search for recipes

## This site has been created as part of my CodeInstitute milestone project for the interactive frontend module.

This site provides a single page web application to search an extensive database of recipes. The database is provided by the Edamam API (specific information on this API later).

I personally created the name "Mealissimo" as a play on the Italian "Bellissimo", which of course means beautiful and often associated with fantastic food! The branding and colour scheme was generated using https://brandbuilder.ai/

The benefit of this application is providing a single pane of glass for all your recipe needs, which queries numerous recipe sites. The advantage is time saved because one does not need to visit countless, separate web resources to find the bellissimo meal one desires!

A recipe is chosen at random from the list of results. The remaining results are available as a collapsable list.

## UX

**Wireframes are in the wireframes directory**

One requirement of the UX design was that it had to be a single-page application (SPA). This was a unique challenge in that there is potentially a lot of information to be presented in a limited space.

I decided to go with the 'rule of threes' for the design itself. The search conditions area is in the left 1/3 section on medium > large screens, with the main recipe area taking up the remaining 2/3 space.

On smaller screens these sections are collapsed and the branding made more compact.

In the background is a parallax image which I have made opaque.

The colour scheme was chosen for it's olive and elegant colouring, which I feel is in good taste for a food-based application.

The application presents a recipe meeting the criteria entered at random from the list received. There must be a way for the user to see other recipes so there exists a hidden list, revealed by clicking the relevant button. If this wasn't hidden it could potentially display too much information on smaller screens when it should be the main recipe as the main focus. Another reason the application works this way is because there is no pagination feature of the API.

The API does not return the recipe method, and so there is a button which links to the source. We can import the ingredients however, so the user will have enough information to decide if they wish to visit the site.

### User Stories

- As a parent/partner/family member, I wish to search for recipes for ideas on what to cook for my family, and have the ability to filter on various dietary requirements (futher information on that in the features section).
- As a food-lover, I wish to explore recipes published on the internet based on my preferences, but without searching many individual websites.
- As someone on a diet, I wish to search for recipes which confirm to a calorie / ingredient limit.
- As a vegetarian/vegan, I wish to search for recipes which are meat / animal-product free.
- As a chef, I wish to explore recipes easily for inspiration to apply to my own recipes.

## Features

### Existing Features

- Feature 1 - Natural language input field allowing users to enter seach conditions for what meal/ingredient/method they wish to find.
- Feature 2 - Natural language input field allowing users to specify ingredients they with to omit from the search.
- Feature 3 - Ability to enter maxiumum calories per portion. This is an optional field.
- Feature 4 - Ability to flag the search to return vegetarian or vegan results only.
- Feature 5 - Application reset controls both from a reset button, and by clicking the logo.
- Feature 6 - Ability to pivot to the original source recipe to view the full method.
- Feature 7 - Ability to expand a list of other recipe matches, should the one returned be undesired.

## Technologies Used

The following is a list of all the technologies used in this website.

- [Bootstrap 4.3](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
  - This project uses **Bootstrap** to provide the website's structure. I have relied heavily on its Flexbox utilities in particular and embed tools

- [FontAwesome](https://fontawesome.com/start)
  - This project uses **FontAwesome** for the recipe ingredients list items

- [Google Fonts](https://fonts.google.com/)
  - This project uses **Google Fonts** for the site's fonts. Specifically Nixie One and Open Sans

- [Edamam Recipe Serch API](https://developer.edamam.com/edamam-recipe-api)
  - This project uses this API to gather the recipe information presented on the application

- [BrandBuilder.AI](https://brandbuilder.ai/)
  - This service was used to generate this application's branding, including logo, images and colour-scheme.

## Testing

There is only a single page to test, being an SPA. That being said there are a number of different elements contained therein so care had to be taken of the layout when considering the different states.

1. Main Application:
    1. Load the website. All fields are empty but contain information / hints as to what the user must input.
    2. Submit and reset buttons are visible and formatted. Resetting the form works clicking this button, and also by clicking the logo.
    3. Some elements are hidden in the initial state. Verified both visibly and by analysing these elements using Chrome Dev Tools. When a search is submitted, the appropriate elements are revealed.
    4. In regards to point 3 above, testing verified the hiding of the input fields when a search is conducted. This is to save space, especially for smaller screens.
    5. Additional recipes are correctly hidden behind the button. When clicked these are correctly revelaed and links active.
    6. HTML / CSS validated at https://www.freeformatter.com/html-validator.html and https://jigsaw.w3.org/css-validator (this threw a number of errors that were specific to Bootstrap CSS vs my own CSS).
    7. Javascript validated at https://jshint.com/
    8. Validated on different OSes and browsers: http://browsershots.org/http://mealissimo.scottymcandrew.com/index.html - some screenshots look like they have failed but is actually an error on the virtual machine - e.g. some haven't loaded and there are others complaining that Chromium is being run as root :-)

2. Input Fields:
    1. The API supports natural language searching, so matches can be made on a number of different strings. This introduces risk of malformed inputs. I have tested inputting empty searches and special characters. In these conditions there is a special image returned along with a message.
    2. The above testing was performed on both the search and excluded fields.
    3. The calories field is of type number. There is a test performed on the code that will only permit values of 50 and over and 5000 and less. Testing with lower (including negative) and higher numbers correctly displays the special image and message. The field allows inputting of the character 'e'. Testing with this character has validated searches work correctly.

- Responsive Design:
    1. The above tests were carried out with varying screen sizes (using Chrome Dev Tools).
    2. On small screens the UI collapses and the brand name is shifted over to the icon.
    3. On very small screens the logo and name reduce in size.
    4. Validated mobile device design on http://www.responsinator.com

- Limitations / Notes:
    1. The API can only return a limited number of matches (developer account), so I have hard-coded 25 max.
    2. This API does not have a pagination feature. There is a flag indicating more were found (boolean), but no link. That, coupled with the low limit of how many can be returned, was the reason I implemented a 'reveal' button.

## Deployment

This site was developed using Visual Studio Code and is being hosted on GitHub pages at mealissimo.scottymcandrew.com

To run locally all files from the Git repo are required and need to be hosted on a local web server. This can be achieved preferably with your IDE's live server feature. Outbound internet access is required in order to reach the API.

## Credits

### Content

- All text on the page was written by myself.
- All content populated via a search is pulled in from the Edamam API from numerous external food resources.

### Media

- Google images for the local image content.
- Recipe resources are pulled in from numerous external sources via the API, links to the original site are detailed.
- Brandbuilder.ai for the branding, colour scheme and background image.

### Acknowledgements

- W3Schools for various coding help / templates (such as the Parallax effect).
- Edamam for providing a free-to-use developer API.
