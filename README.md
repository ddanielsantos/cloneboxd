# Letterboxd Clone

<p align="center">
  <img src="https://user-images.githubusercontent.com/80872981/151274227-bb88d008-ee5d-4abd-aa1a-c9f93e60961f.png" alt="image showing PostgresSQL and NodeJS logos" width="700"/>
</p>
  
Basic Rest API made using NodeJS and PostgreSQL, inspired by [Letterboxd](https://www.letterboxd.com) and [IMDB](https://www.imdb.com)

## Endpoints


POST `/user/join`<br/>
POST `/user/auth`<br/>
GET `/movie`<br/>
POST `/movie` * <br/>
PATCH `/movie` * <br/>
DELETE `/movie/:movieId` * <br/>
GET `/role`<br/>
GET `/person`<br/>

note: * = requires authentication first

## Running

To run this project, after clonning it, run `npm install`, from here, you can either run `npm run dev` or `npm run build && npm run start`
