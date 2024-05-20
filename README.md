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
$ git branch module-2-start

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## ⚙️ Configuration

This project uses MongoDB as its database, so you'll need to have MongoDB installed and running on your machine. You can download MongoDB from [here](https://www.mongodb.com/try/download/community).

The project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. You'll need to define the following variables:

- `NODE_ENV`: This defines the environment in which the application is running. For development, set this to `development`. For production, set this to `production`.
- `PORT`: This is the port on which the server will run. You can choose any valid port number. For example, you could use `3000`.
- `MONGODB_URI`: This is the connection string for your MongoDB database. It should be in the format `mongodb://localhost:<port>/<database>`.

Here's an example of what your `.env` file might look like:

```properties
NODE_ENV = development
PORT = 3000
MONGODB_URI = mongodb://localhost:27017/mydatabase
```

## 🔧 Usage

To interact with the API, you can use [Postman](https://www.postman.com/downloads/). Here's how to hit all the endpoints:

1. **GET all data**: Send a GET request to `http://localhost:3000/api/v1/tvshows` or `http://localhost:3000/api/v1/actors`.

2. **GET data by ID**: Send a GET request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to retrieve.

3. **POST (Create new data)**: Send a POST request to `http://localhost:3000/api/v1/tvshows` or `http://localhost:3000/api/v1/actors`. In the request body, include the data you want to create in JSON format.

4. **PUT by ID (Update data)**: Send a PUT request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to update. In the request body, include the updated data in JSON format.

5. **DELETE by ID**: Send a DELETE request to `http://localhost:3000/api/v1/tvshows/{id}` or `http://localhost:3000/api/v1/actors/{id}`. Replace `{id}` with the ID of the data you want to delete.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
