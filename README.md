# Pargo assessment

Write an AngularJs application that retrieves the list of pickup points and presents these in a useful way for a user to view and select a pickup point. You may use any UI components you think will provide the user with a good experience. You may add Pargo branding and any other ideas you may have for this application to demonstrate your skills in Javascript, HTML, CSS, and API integration.

Assessment Journey
- Retrieved api data and display on front end,
- Implimented data and google maps using Angular js
- Styled the application using bootstrap and sass.

Requirements to run - nodeJS
update .env.example to .env and input correct login details.
API_URL=api.staging.pargo.co.za
API_USER=pargoengtest@gmail.com
API_PASSWORD=@#$ERS#$%#

run `npm install` followed by `node server.js` in "pargo-auth-main" folder - This should create a server using port PORT 3000

Then open index.html to view

URL LIST
GET /config - BAD as anyone inspecting tab, will be able to see API details.
GET /pargo_auth - returns pargo token and refresh token
POST /pargo_refresh_auth - will return refreshed auth token

Tech used
- HTML 5
- Javascript
- Angular JS
- SASS
- CSS
- Google maps

IDE used VS Code
