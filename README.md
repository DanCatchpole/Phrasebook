# Phrasebook

Phrasebook is a WIP Web Application that can assist users in learning a language. I created this when I started learning French, in order to have a neat, centralised place which I could store my vocabulary. It also allowed me to learn new approaches for implementing the backend of the system, instead of the typical PHP based applications I had learnt previously on my own and within university modules. There were no specific target users, but it can be used by anyone that wants to store vocabulary they learn during any kind of language study.

## Technologies

Written in JavaScript utilising NodeJS, this project draws upon many different technologies, from MongoDB as a backend store for the data (Users, Words, Categories and Languages) to Pug, a templating engine used in order to render the pages with filled in data from the database. This is rendered on the backend, and then the generated HTML is then sent as a response to the end user. The web server is built using Express v4, and structured using the MVC (Model-View-Controller) design pattern.

## Screenshots:

The main dashboard. Upon logging into the site, the users land here, and this displays their recently added words alongside their translations. The sidebar then gives access to the other parts of the site.
![Main Page](https://dcatcher.me/i/Er5l5cmG.png "Dashboard")

The categories list. In order for users to sort their phrases, they can create categories, to make the browsing and access of their phrases quicker. As shown below, a good use of categories is when languages, such as French, have different kinds of verbs (shown below as ER, RE and IR verbs).
![Categories Page](https://dcatcher.me/i/wj006qlg.png "Organise phrases into categories")

List of words in a category. The user is able to view all words that they have assigned to this category, with the ability to add more through the button at the top, alongside pinning the category, to allow for quick access on the sidebar. The user can also search through their words, in order to quickly find the word they are looking for.
![Word Page](https://dcatcher.me/i/Snkjpg7e.png "View all words in a set category")

Support for multiple languages. Since not everyone just learns French, currently there is support for German, Spanish, Italian and Irish, with the ability for more to be added easily at a later date. Languages are kept separate from each other, so words and categories in separate languages cannot conflict with one another.
![Language Selection](https://dcatcher.me/i/yQh48kgr.png "Support for multiple languages")

The login page. This is a basic page where the user can login to the system, or using the button in the top right, create an account in order to use Phrasebook.
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
