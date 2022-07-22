## Cloneboxd
<p align="center">
  <img src="https://user-images.githubusercontent.com/80872981/159750766-57540e44-3cde-4889-9542-9ae8420e0ee1.png#gh-light-mode-only" alt="image with Cloneboxd written in it" width="700"/>
  <img src="https://user-images.githubusercontent.com/80872981/166695554-eea85e7d-39b3-4687-8f3d-476eccac37bf.png#gh-dark-mode-only" alt="image with Cloneboxd written in it" width="700"/>

</p>

### What is Cloneboxd?

Cloneboxd it's a web application based on [Letterboxd](https://letterboxd.com), it uses primarly JavaScript both on the frontend and backend, the data about movies and persons come from the [The Movie Database API](https://developers.themoviedb.org/3), other data are stored on [MongoDB Atlas](https://www.mongodb.com/). You can find more about the stack [here](#stack)

### Demo

![a GIF showing some pages of the application](./demo.gif)

### Stack

#### Frontend

- [React](https://reactjs.org/) to compose the UI
- [Relay](https://relay.dev/) to communicate with the GraphQL server and manage the data fetching declaratively
- [React Router](https://reactrouter.com/docs/en/v6) to manage the routes
- [Chakra UI](https://chakra-ui.com/) to help with the styling and accessibility
- [Vite](https://vitejs.dev/) to improve bundling and development

#### Backend

- [NodeJS](https://nodejs.org/en/) to run the server
- [Koa](https://koajs.com/) to manage HTTP requests and responses
- [GraphQL](https://graphql.org/) to manage the data communication with the frontend declaratively
- [MongoDB](https://www.mongodb.com/) to store the data in a scalable way using NoSQL
- [Mongoose](https://mongoosejs.com/) to help data modeling and querying in MongoDB

### Want to contribute?

Cloneboxd is open to contributions, if you want to help with the development of the application, please open an issue or pull request.