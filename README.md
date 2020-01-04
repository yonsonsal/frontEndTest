This project is an implementation of **Test Práctico para aspirantes al área de front-end de Mercado Libre** and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

```
frontend-test
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── client (FrontEnd Code)
        ├── components
        ├── api
    ├── server (Backend Code)
        ├── apiServer.js
        ├── utils
```

## Available Scripts

In the project directory, you can run:

### `npm run start:api`

Runs the server in [http://localhost:3001](http://localhost:3001) with endponts

- `http://localhost:3001/api/items?q=:query`
- `http://localhost:3001//api/items/:id`

### `npm run start:dev`

Runs the app in in the development mode asumming the server is running in the location setting by the variable REACT_APP_API_URL in package.json (default value: http://localhost:3001)

### `npm start`

Runs the app and the server in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:staging`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. You must edit the file .env.staging to set the REACT_APP_API_URL env variable properly.
