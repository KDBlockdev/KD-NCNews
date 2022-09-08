SET UP ENVIRONMENT VARIABLES

When cloning this repo and running the project locally please create two seperate .env files.

.env.test and .env.development

They should then be populated with the correct database information.

.env.test should be populated with PGDATABASE=nc_news_test.
.env.development should be populated with PGDATABASE=nc_news

To run the tests locally on your machine

Please install Jest as a test suite using 
npm install --save-dev jest

You will also require SUPERTEST npm package to test the API's
npm install supertest --save-dev 

You will also require Express.js
$ npm install express --save

To run the database files you will need to use node-postgres
$ npm install pg

