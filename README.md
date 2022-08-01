# Screeps
A truly horrifying experience to witness, this repository documented the trials and tribulations of using javascript to do something it wasn't designed for without guidance nor mentor.

Authorisation for Deployment
Screeps allowed deploment to the game from local machine via an Auth token. Create an Auth Token from your screeps profile, then create a file called Auth.json in the shape:
{
    "email": "<YOUR_EMAIL>",
    "token": "<YOUR_TOKEN>"
}

Grunt
There are two main grunt tasks, build and deploy.
-Build cleans the dist folder, then copies and flattens every js file in the src folder into the dist folder.
-Deploy runs the build task, then uploads the contents of dist to the screeps api using the credentials as defined in the Auth.json file.