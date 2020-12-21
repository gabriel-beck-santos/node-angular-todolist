# node-angular-todolist

# Backend

## Mongodb

You have to run a mongodb in order to use the app.

If you have docker installed just run the code above:
`docker run -d  --name mongo-todolist  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo`

## Nodejs

Enter in the `backend` folder and create a .env file. There is a .env.example to change the values for mongodb and port. After that run the command:

`npm install && npm start`

The backend server will run on the .env selected port.

# Frontend


## Angular

To frontend go to the `frontend` folder, check if the `src/environments/enviroment.ts` url is the same as the defined at backend port. Run the command:

`npm install && ng serve`

Access the page in any browser at `localhost:4200`

## TODO

The edition of project and task