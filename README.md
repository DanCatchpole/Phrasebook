# Phrasebook

Phrasebook is a WIP Web Application that can assist users in learning a language. I created this during the time I had started learning French, in order to have a neat, centralised place which I could store my vocabulary. It also allowed me to learn new ways of backend web development, instead of the typical PHP based applications I had learnt previously on my own and within university modules. There were no specific target users, but it can be used by anyone that wants to store vocabulary they learn during any kind of language study.

## Technologies

Written in JavaScript utilising NodeJS, this project draws upon many different technologies, from MongoDB as a backend store for the data (Users, Words, Categories and Languages) to Pug, a templating engine used in order to render the pages with filled in data from the database. This is rendered on the backend to generate a HTML file which is then sent to the web user. The web server is built using Express v4, and structured using the MVC (Model-View-Controller) method.

## Screenshots:

The main dashboard:
![Main Page](https://dcatcher.me/i/Er5l5cmG.png "Dashboard")
Organise phrases into categories:
![Categories Page](https://dcatcher.me/i/wj006qlg.png "Organise phrases into categories")
View words in a category:
![Word Page](https://dcatcher.me/i/Snkjpg7e.png "View all words in a set category")
Support for multiple languages:
![Language Selection](https://dcatcher.me/i/yQh48kgr.png "Support for multiple languages")

Login:
![login](https://dcatcher.me/i/1qAo6PMw.png "Login")





## Todo:
- Add test functionality
- Allow for editing words
- Allow for editing user details
- ...
- Add email functionality
- Reimplement the sidebar design to look like this:

![sidebar](https://dcatcher.me/i/pEWZ2kJK.png "Sidebar")


## Running
1. Clone the repository
2. Run `npm install` - This will download all of the required dependencies
3. Run the application with `npm start`
