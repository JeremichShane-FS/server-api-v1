# 🚀 server-api-v1

## 📖 About

`server-api-v1` is a RESTful API server built with Node.js and Express.js. It provides a simple and intuitive interface for managing data. The server supports five main HTTP methods: `GET`, `GET by ID`, `POST`, `PUT by ID`, and `DELETE by ID`. Data is initially stored in-memory, but the server utilizes Node.js's `fs` module to write data to a file for persistence across server sessions.

The API endpoints are structured as follows:

- `GET` - Retrieve all data: `http://localhost:3000/api/v1/authors`
- `GET by ID` - Retrieve data by ID: `http://localhost:3000/api/v1/authors/{id}`
- `POST` - Create new data: `http://localhost:3000/api/v1/authors`
- `PUT by ID` - Update data by ID: `http://localhost:3000/api/v1/authors/{id}`
- `DELETE by ID` - Delete data by ID: `http://localhost:3000/api/v1/authors/{id}`

Data is initially stored in-memory, but the server utilizes Node.js's `fs` module to write data to a file. This allows for data persistence across server sessions. When the server stops running, the current state of the data is saved to a file. Upon restarting, the server reads this file to restore the data. This ensures that data is not lost between server restarts, making this project ideal for testing, development, and production purposes. When you navigate to `localhost:3000`, you'll see the actuator message: "Service is up", indicating that the server is running and ready to accept requests.

## ⚙️ Features

- 🛠️ Full CRUD operations: The server supports `GET`, `GET by ID`, `POST`, `PUT by ID`, and `DELETE by ID` operations, allowing for full Create, Read, Update, and Delete functionality.
- 🎯 Simple and intuitive API: The API uses a simple and intuitive structure, making it easy to use for managing data.

## 💾 Installation

```bash
# Clone this repository
$ git clone https://github.com/JeremichShane-FS/server-api-v1.git

# Go into the repository
$ cd server-api-v1

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## ⚙️ Configuration

This project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. You'll need to define the following variables:

- `NODE_ENV`: This defines the environment in which the application is running. For development, set this to `development`. For production, set this to `production`.
- `PORT`: This is the port on which the server will run. You can choose any valid port number. For example, you could use `3000`.

Here's an example of what your `.env` file might look like:

```properties
NODE_ENV = development
PORT = 3000
```

## 🔧 Usage

To interact with the API, you can use [Postman](https://www.postman.com/downloads/). Here's how to hit all the endpoints:

1. **GET all data**: Send a GET request to `http://localhost:3000/api/v1/authors`.

2. **GET data by ID**: Send a GET request to `http://localhost:3000/api/v1/authors/{id}`. Replace `{id}` with the ID of the data you want to retrieve.

3. **POST (Create new data)**: Send a POST request to `http://localhost:3000/api/v1/authors`. In the request body, include the data you want to create in JSON format. For example:

   ```json
   {
     "name": "name",
     "email": "sample@example.com",
     "bio": "short bio",
     "books": []
   }
   ```

4. **PUT by ID (Update data)**: Send a PUT request to `http://localhost:3000/api/v1/authors/{id}`. Replace `{id}` with the ID of the data you want to update. In the request body, include the updated data in JSON format.

5. **DELETE by ID**: Send a DELETE request to `http://localhost:3000/api/v1/authors/{id}`. Replace `{id}` with the ID of the data you want to delete.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
