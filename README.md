## Project Hotel Booking APP

### Description:
An API server that a front-end developer could integrate to:
 * get the list of hotels around a specific location
 * create a booking for a given hotel on specific dates for a specific guest
 * list the bookings in a given hotel

To get the hotels in a specific area is used HERE API. 

Postman collection, .yaml and draw.io file you may find at the /doc.  

By default each hotel has 10 rooms per night and HERE APi returns max 10 nearest hotels.

### Languages, Technologies, Tools:  
* TypeScript
* Node.js
* Express
* Jest
* Swagger-UI
* Joi
* Bootstrap
* Postman
* PostgreSQL
* Docker-compose

### Quick Start
[Guide about registration and receiving HERE API key](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/quick-start.html)

I've added node_modules folder to gitignore, don't forget to start with npm i.  

You'll have to create also a configuration .env file, with the following lines 
(all DB data can be changed at docker-compose.yaml file):

* #### USER_DB = postgres
* #### HOST = localhost
* #### DATABASE = postgres
* #### PASSWORD = postgress
* #### DB_PORT = 5432
* #### PORT = 3000
* #### API_KEY = //your own API key from HERE API//

Application will run at http:localhost:3000

  ### Scripts
* npm run dev - start application in dev mode
* npm run start - build and start builded application
* npm run build - build application(remove dist folder and compile ts to js)
* npm run test - run tests using jest
* npm run test:coverage - run tests with coverage information using jest
* npm run db:dev will create a local PostgreSQL DB at your machine using docker-compose file
