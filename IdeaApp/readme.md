Created an Idea Service App. Users can call this idea service to add, update, search, and delete any idea.

{
    "id": 124
    "ideaName": "Great Idea
    "authorName": "Manas Shukla"
    "ideaDescription": "description"

}

Following API has been implemented:

POST -- /idea_app/v1/idea/ -- Done
GET -- /idea_app/v1/ideas/ -- Done
GET -- /idea_app/v1/ideas/{id} -- Done
PUT -- /idea_app/v1/ideas/{id}  -- Done
DELETE -- /idea_app/v1/ideas/{id} -- Done

Edit::

Introducting Authentication and Authorization using Token ( Token Based )

Will build
1. Registration
2. Login
3. Authentication / secure all API routes

Will require to connect it to database as well ( MongoDB )
1. usersModel.js
2. Mongoose required
3. .env file

MONGODB_URI = mongodb://127.0.0.1:27017/idea_app
mongodb is mongodb being used
127.0.0.1:27017 -- server and port number where mongodb is being used
idea_app -- name of the database of mongodb