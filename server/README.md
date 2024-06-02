# 🚀 server-api-v1

## 📖 About

`server-api-v1` is a RESTful API server built with Node.js and Express.js. It provides a simple and intuitive interface for managing data. The server supports five main HTTP methods: `GET`, `GET by ID`, `POST`, `PUT by ID`, and `DELETE by ID`. Data is stored using MongoDB database.

The API endpoints are structured as follows:

- `GET` - Retrieve all data:
  - `http://localhost:3000/api/v1/tvshows`
  - `http://localhost:3000/api/v1/actors`
- `GET by ID` - Retrieve data by ID:
  - `http://localhost:3000/api/v1/tvshows/{id}`
  - `http://localhost:3000/api/v1/actors/{id}`
- `POST` - Create new data:
  - `http://localhost:3000/api/v1/tvshows`
  - `http://localhost:3000/api/v1/actors`
- `PUT by ID` - Update data by ID:
  - `http://localhost:3000/api/v1/tvshows/{id}`
  - `http://localhost:3000/api/v1/actors/{id}`
- `DELETE by ID` - Delete data by ID:
  - `http://localhost:3000/api/v1/tvshows/{id}`
  - `http://localhost:3000/api/v1/actors/{id}`

Data is now stored in a MongoDB database, providing robust data persistence across server sessions. When the server stops running, the current state of the data remains intact in the database. Upon restarting, the server reconnects to the database, ensuring that data is not lost between server restarts. This makes the project ideal for testing, development, and production purposes. When you navigate to `localhost:3000`, you'll see the actuator message: "Service is up", indicating that the server is running and ready to accept requests.

## ⚙️ Features

- 🛠️ Full CRUD operations: The server supports `GET`, `GET by ID`, `POST`, `PUT by ID`, and `DELETE by ID` operations, allowing for full Create, Read, Update, and Delete functionality.
- 🎯 Simple and intuitive API: The API uses a simple and intuitive structure, making it easy to use for managing data.

## 💾 Installation

```bash
# Clone this repository
$ git clone https://github.com/JeremichShane-FS/server-api-v1.git

# Go into the repository
$ cd server-api-v1

# Switch to module-2-start branch
$ git branch module-3-start

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## ⚙️ Configuration

This project uses MongoDB as its database, so you'll need to have MongoDB installed and running on your machine. You can download MongoDB from [here](https://www.mongodb.com/try/download/community).

The project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. An example `.env.example` file is provided in the repository. You'll need to rename this file to `.env` and replace the placeholders with your actual values.

Here are the variables you'll need to define:

- `NODE_ENV`: This defines the environment in which the application is running. For development, set this to `development`. For production, set this to `production`.
- `PORT`: This is the port on which the server will run. You can choose any valid port number. For example, you could use `3000`.
- `MONGODB_URI`: This is the connection string for your MongoDB database. It should be in the format `mongodb://localhost:<port>/<database>`.

Here's an example of what your `.env` file might look like after you've set your values:

```properties
NODE_ENV = development
PORT = 3000
MONGODB_URI = mongodb://localhost:27017/mydatabase
```

## 🔧 Usage

To interact with the API, you can use [Postman](https://www.postman.com/downloads/). A Postman collection is included in the repository, `api-v1-.postman_collection.json`, which contains pre-configured requests for all the API endpoints.

To use the Postman collection:

1. Download and install Postman if you haven't already.
2. Open Postman and click on the `Import` button at the top left.
3. In the opened dialog, choose the `Link` tab, paste the link to the Postman collection, and click `Continue` and then `Import`.
4. The collection should now be available in your Postman app. You can select a request to see its details.
5. Click on the collection tab,`api/v1/`, and then click on the `Run` button in the top right. The Collection Runner will execute the requests in the order they appear in the collection.
6. You can monitor the progress and view the results for each request. After the run is complete, you'll see a summary of the results, including passed/failed tests and response details.
7. You can click on individual requests to see detailed information, including request/response headers, body, and test results.

The collection includes the following requests:

1. **GET all data**: Sends a GET request to `http://localhost:3000/api/v1/tvshows` or `http://localhost:3000/api/v1/actors`.

2. **GET data by ID**: Sends a GET request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to retrieve.

3. **POST (Create new data)**: Sends a POST request to `http://localhost:3000/api/v1/tvshows` or `http://localhost:3000/api/v1/actors`. In the request body, include the data you want to create in JSON format.

4. **PUT by ID (Update data)**: Sends a PUT request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to update. In the request body, include the updated data in JSON format.

5. **DELETE by ID**: Sends a DELETE request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to delete.

## 🧪 Testing

This project uses [Jest](https://jestjs.io/) for testing. Tests are located in the `__tests__` directory and are organized by the module they are testing. For example, the `actorsController.test.js` file contains tests for the actors controller.

There are several scripts in the `package.json` file that help with running the tests:

- `"test": "jest"`: This script runs all test files that match the `*.test.js` pattern. After the tests have run, Jest will output the results to the console.
- `"jest:watch": "jest --watchAll"`: This script runs Jest in watch mode. In watch mode, Jest will automatically re-run the tests whenever a file changes.
- `"jest:coverage": "jest --coverage"`: This script runs Jest and generates a coverage report. The coverage report shows how much of your code is covered by tests.
- `"jest:clear": "jest --clearCache"`: This script clears the Jest cache. Clearing the cache can help resolve issues where Jest isn't recognizing changes to your files.

To run the tests, use the following command:

```bash
npm test
```

To run Jest in watch mode, use the following command:

```bash
npm run jest:watch
```

To generate a coverage report, use the following command:

```bash
npm run jest:coverage
```

To clear the Jest cache, use the following command:

```bash
npm run jest:clear
```

In the `actorsController.test.js` file, we're importing the `Actor` model and the `app` from the main application file. We're using `jest.mock` to mock the `Actor` model, and then we're defining tests for the different endpoints in the actors controller.

Here's an example of a test from the `actorsController.test.js` file:

```javascript
it("should get an actor by id", async () => {
  const res = await request(app).get("/api/v1/actors/1");

  expect(Actor.findById).toHaveBeenCalledTimes(1);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("success", true);
  expect(res.body).toHaveProperty("data", res.body.data);
});
```

In this test, we're sending a GET request to the "/api/v1/actors/1" endpoint to get the actor with an ID of 1. We're then checking that the `findById` method of the `Actor` model was called once, that the response status code is 200, that the `success` property of the response body is `true`, and that the `data` property of the response body matches the expected data.

For more information on writing tests with Jest, check out the [Jest documentation](https://jestjs.io/docs/getting-started).

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
