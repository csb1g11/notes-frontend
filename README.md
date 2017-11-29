
notes-frontend
=========================

## Description
An application to help you remember words you read in a language you are learning while browsing the web. You might be reading your favourite newspaper online and come across a word or phrase you find interesting and want to jot it down. This app allows you to capture that information and revisit it next time! There is search and filter functionality available based on the language and phrase.

## Main technologies used
#### Server
- node.js v8.9.0
- express.js v4.15.2
#### Client
- react v15.5.4
- redux v3.6.0
- axios v0.17.1
#### Tests
- jest v21.2.1
#### Setup
- webpack v2.2.1
- babel v6.5.2
- yarn v1.3.2

This application has been tested in Chrome v62, Firefox v56.0 and Safari v11.

[Demo](http://52.211.204.132:8080/)

## Installation

1) Install nvm & nodejs. It is a good idea to install [nvm](https://github.com/creationix/nvm/blob/master/README.md) to manage node version but it isn't mandatory. v8.9.0 of [nodejs](https://nodejs.org/en/download/) has been used to build this project. 
2) Install [yarn](https://www.npmjs.com/package/yarn/tutorial).
3) Make sure you are in the root directory, and run `yarn`. This will install of the dependencies.
4) In the main folder, there is a config.json file which contains the URL of the backend database for this project - head over to the [notes-api](https://github.com/csb1g11/notes-api) repository to download and run this. You will need to change this config to point to where the API is running.
5) Create a bundled version of the code by running yarn webpack, and then get the node.js server up and running with yarn start.

```
yarn webpack
yarn start
```

6) You should now have the application up and running on your machine! 


#### Run tests
1) With yarn installed, you just need to run `yarn test`.

## Next Steps

#### Features
- Expand the search & filter functionality to allow tagging
- Move the filter logic to the backend: this would involve making user of a parameter on the existing notes endpoint specifying the language, and creating another endpoint to list the users available languages for the filter functionality.
- Flashcards: now that the structure of a note has been displayed, it would be quite simple to add flashcards for testing your memory. Another extension would be getting the user to highlight the phrase which correlates to their definition from the context they have provided.
- NLP: tokenizing the context and phrase and providing a tag for what type of word is being entered would be useful, ie if there is a verb in the past participle.


#### Maintenance
- Requires component tests: currently the tests cover the action creators, actions and reducers. Enzyme would be the reccommended tool for testing components.
- Requires testing in Internet Explorer and older browser versions.

### Thanks
I followed a [tutorial](https://www.youtube.com/channel/UCsvMopMspsGw89AWim0FMfw) to help with the authentication and login of the application.