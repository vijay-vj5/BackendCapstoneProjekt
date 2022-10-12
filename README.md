# Get YouTube Subscribers - Backend Capstone Project
1. First **install npm dependencies** of **express** and **mongoose** using `npm install` command.
2. **Create database in your local computer** using `node src/createDatabase.js` command.
3. **Start the backend server** using `npm start` or `node src/index.js` command. 

## HTTP request methods used in the project
1. GET [http://localhost:3000/subscribers](http://localhost:3000/subscribers) to get array of subscribers.

2. GET [http://localhost:3000/subscribers/names](http://localhost:3000/subscribers/names) to get array of subscribers with only name and subscribedChannel fields.

3. GET [http://localhost:3000/subscribers/:id](http://localhost:3000/subscribers/:id) to get a subscriber by its unique id.
> **Note:** If the wrong ***:id*** is entered in the url, then the client will encounter ```400 Bad Request``` status code indicating that the server cannot or will not process the request due to something that is perceived to be a client error.

4. POST [http://localhost:3000/subscribers](http://localhost:3000/subscribers) to add a new subscriber to the database. Add the data in JSON format.
```
{
    "name": "Dummny",
    "subscribedChannel": "Channel"
}
```

5. PUT [http://localhost:3000/subscribers/:id](http://localhost:3000/subscribers/:id) to update the data of a subscriber by its unique id.
```
{
    "name": "Update Name",
    "subscribedChannel": "Update Channel"
}
```

6. DELETE [http://localhost:3000/subscribers/:id](http://localhost:3000/subscribers/:id) to delete a subscriber by its unique id.

> ***app.use()*** is used to handle all the unwanted requests. It will return ```404 Not Found``` status code indicating that the requested resource could not be found but may be available in the future.