# Scraping Coinranking

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)

## Project Description

The coinranking scraping is a full-stack application built with React and NestJS. This application scrapes data from the coinranking website periodically to keep the information up to date. The scraped data is then processed and stored in a database for further operations.

## Technologies
- Node.js - v18.16.0
- React - v18.2.0
- NestJS - v9.0.0
- Mongodb - v6.0

## Installation
Install above mentioned version of Node.js and mongodb.

1. Clone the repository

```bash
git clone https://github.com/avash-projects/scraping-coinranking.git
```
2. Change to the project directory
```bash
cd scraping-coinranking
```
3. Install dependencies 
>Note: please make sure that you have [workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) enabled
```bash
yarn install
```
4. Configure environment variables
>for client:  /packages/client/.env.example

>for server:  /packages/server/.env.example

5. start the applications:
```bash
yarn run dev:all
```

server: http://localhost:3030 <br>
client: http://localhost:5137

## Installation using docker
> NOTE:  This is only for running the application locally and it is not optimized for production and hot reload hasn't been enabled.

> Make sure you have docker and docker compose(docker-compose) installed.

```bash
docker compose up
```
or
```bash
docker-compose up
```

server: http://localhost:3030 <br>
client: http://localhost:5137

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

