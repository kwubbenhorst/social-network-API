# social-network-API
A functional backend for a social network application (models, routes and NoSQL database), built with Node, Express, MongoDB and Mongoose ODM 

![MIT License](https://img.shields.io/badge/MIT-License-blue)
  

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)

## Description
This social network API, built with Node,js, Express.js, a MongoDB NoSQL database, the Mongoose ODM and the moment.js data library for formatting timestamps, serves up and allows for the manipulation of data at 14 different endpoints. As such it provides full back-end functionality for a social network application. This social network tracks users in its database, together with their email addresses, posted thoughts, and friends. Available routes allow for the viewing of all users or a single user, for the creation of new users, the updating of data for existing users, the deletion of a user, the addition of a friend to a user document and the deletion of a friend from a user document. The social network also tracks thoughts and reactions to thoughts, including a record of the user who posted them and the time the post with the thought or reaction was made. Available routes allow for the viewing of all thoughts or a single thought, for the creation of a new thought, the updating of an already posted thought, the deletion of a thought, the creation of a reaction to a thought or the deletion of a reaction to a thought. When users are deleted any thoughts they have posted are deleted as well. The database comes pre-seeded with 72 thoughts distributed among 24 users (3 a-piece), but there are no pre-seeded friend relationships for users or reactions upon thoughts. All in all this structure provides the full range of interactions needed for users to share thoughts online, received reactions from other users, and form online friendships with those users whose thoughts they admire or who engage with them about their own thinking.  

The API is intended to handle data inputs and requests for a social network website at a social media start-up. The choice of NoSQL database technologies is suited to the expectation that there will be large amounts of unstructured data stored at this website's backend. With a few adaptations the NoSQueryLanguage parallels what can be done with SQL databases, but the creation of relationships such as a subdocument schema for reactions on the Thought model, and the population of the data response with fields from another schema is a little more intricate without foreign keys. Additionally in the seeding I opted to use randomization logic, which made life perhaps more difficult than it needed to be. Another puzzle was how to handle the asynchronous nature of the seeding so that it did not kill the server once completed. I solved this by means of a callback function to start the server once seeding is complete. Despite a great many attempts using various approaches I did not manage to ensure uniqueness in my pre-seeded thoughts. In a few instances there may be a repeat of the same thought, assigned two different _ids. The sourcing of 72 thoughtful quotations and devising the list of 24 usernames and emails to whom I could ascribe them was not difficult but it did take a fair amount of time, however the result is enough data to simulate a fully fledged online community with users, thoughts, reactions and friends that can be extensively worked with in testing. 

It is the extent (and whimsy) of this pre-seeded data that makes this application stand apart from others of its kind. In future it is hoped that other features and relationships can be added. An endpoint allowing users to edit not only their thoughts but also their reactions would be a good addition, as would the ability to view all a particular user's reactions as well as all of their thoughts.

Being only the backend of an application, this API is not deployed.

## Installation
Clients wishing to use the server database and endpoints need to have node.js installed on their machine. After entering the command "npm install" in the terminal to install the dependencies locally, the user need only enter the command "npm start" to both seed the database and start the server. For the purpose of working with the routes it will be helpful to use an application like Insomnia or Postman. A NoSQL database GUI such as Studio3T or Compass will also be helpful to gain a preview of the data objects returned when the API is queried. 

## Usage
A full walkthrough of the application's functionality is demonstrated in the following video. The demonstration is shown using Insomnia and Studio3T:






## Credits
This project was a single-author creation.
All pre-seeded database thoughts are the thoughts of George Carlin, sourced at https://parade.com/1080754/jessicasager/george-carlin-quotes/. Usernames are an assortment of public figures and fictional or cartoon characters which are not the property of the developer. Email addresses did spring from the imagination of the developer.

## License
This project is licensed under the [MIT License](./LICENSE-MIT).

## Contributions
Contributions to this project are welcome, especially if someone feels they would like to tackle the issue of why the pre-seeded thoughts are not properly filtering for uniqueness. Please contact the developer through github: github.com/kwubbenhorst, or by email: kwubbenhorst@gmail.com

## Tests
N/A

## Questions
Likewise if you have questions, the developer would be very interested in feedback about the user experience. The contacts are the same as above: github.com/kwubbenhorst or kwubbenhorst@gmail.com.
