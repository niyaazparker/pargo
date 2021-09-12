requirements - nodeJS

run `npm install` in "pargo-auth-main" folder - should create a server using port PORT 3000
update .env.example to .env and input correct login details.

API_URL=api.staging.pargo.co.za
API_USER=pargoengtest@gmail.com
API_PASSWORD=@#$ERS#$%#

run `node server.js`

URL LIST

GET /config - BAD as anyone inspecting tab, will be able to see API details.
GET /pargo_auth - returns pargo token and refresh token
POST /pargo_refresh_auth - will return refreshed auth token


