# Langflow Backend API Documentation

This documentation provides a detailed overview of the backend API developed for Langflow, built using **Node.js** and **Express.js**. It highlights the functionality of each module, error-handling mechanisms, and usage guidelines.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Folder Structure](#folder-structure)
   - [File Descriptions](#file-descriptions)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
   - [POST /getResponse](#post-getresponse)
7. [Utilities](#utilities)
   - [ApiError](#apierror)
   - [ApiResponse](#apiresponse)
   - [asyncHandler](#asynchandler)
8. [Error Handling](#error-handling)
9. [Dependencies](#dependencies)
10. [Contributing](#contributing)

---

## Overview



---

## Features

- **Modular Structure**: Components are organized into controllers, routes, and utilities.
- **Error Handling**: Implements custom error handling via the `ApiError` class.
- **Asynchronous Processing**: Uses an `asyncHandler` wrapper for cleaner async code.
- **CORS Support**: Configured for secure cross-origin requests.
- **Configurable**: Supports environment variables for customizable endpoints and tokens.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or above recommended)
- **npm**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:<PORT>` (default port is `4000`).

---

## Folder Structure

```
├── controllers
│   └── response.controller.js
├── routes
│   └── responseLangflow.route.js
├── utils
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── fetchFromLangflow.js
├── app.js
├── index.js
└── .env
```

### File Descriptions

1. [**controllers/response.controller.js**](./src/controllers/response.controller.js)
   - Handles the logic for the `/getResponse` endpoint.
   - Validates input, communicates with Langflow, and formats responses.

2. [**routes/responseLangflow.route.js**](./src/routes/responseLangflow.route.js)
   - Defines the route `/api/v1/getResponse` and connects it to the controller.

3. [**utils**](./src/utils/)
   - [**ApiError.js**](./src/utils/ApiError.js): Custom class to manage API errors.
   - [**ApiResponse.js**](./src/utils/ApiResponse.js): Utility class for creating consistent API responses.
   - [**asyncHandler.js**](./src/utils/asyncHandler.js): Wrapper to handle asynchronous operations.
   - [**fetchFromLangflow.js**](./src/utils/fetchFromLangflow.js): Utility for fetching data from Langflow's API.

4. [**app.js**](./src/app.js)
   - Configures the Express app, middleware, and routes.

5. [**index.js**]((./src/index.js))
   - Entry point for the application. Loads environment variables and starts the server.

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
BASEURL=https://langflow.example.com
LANGFLOWID=<Your Langflow ID>
FLOWID=<Your Flow ID>
APPLICATION_TOKEN=<Your Auth Token>
```

| Variable          | Description                                   |
|-------------------|-----------------------------------------------|
| `PORT`            | Port number for the server (default: 4000).  |
| `BASEURL`         | Base URL of the Langflow API.                |
| `LANGFLOWID`      | Langflow project ID.                         |
| `FLOWID`          | Langflow flow ID.                            |
| `APPLICATION_TOKEN` | Authorization token for the Langflow API. |

---

## API Documentation

### Base URL

```
http://localhost:<PORT>/api/v1
```

### Endpoints

#### **POST /getResponse**

- **Description**: Fetches a response from Langflow based on the provided prompt.

- **Request Body**:
  ```json
  {
    "msg": "Your prompt here"
  }
  ```

- **Response**:
  ```json
  {
    "statusCode": 201,
    "data": "Langflow response here",
    "message": "Successfully retrieved message from Langflow",
    "success": true
  }
  ```

- **Error Response**:
  ```json
  {
    "statusCode": 401,
    "message": "Prompt is empty",
    "success": false
  }
  ```

---

## Utilities

### ApiError

`utils/ApiError.js` defines a custom error class for API error handling.

#### Constructor Parameters:
- **statusCode**: HTTP status code for the error.
- **message**: Error message (default: "Something went wrong").
- **errors**: Additional error details (default: an empty array).
- **stack**: Stack trace (optional).

### ApiResponse

`utils/ApiResponse.js` provides a consistent format for API responses.

#### Constructor Parameters:
- **statusCode**: HTTP status code.
- **data**: Data payload for the response.
- **message**: Response message (default: "Success").

### asyncHandler

`utils/asyncHandler.js` is a wrapper function for handling asynchronous route handlers.

#### Usage Example:
```javascript
const routeHandler = asyncHandler(async (req, res, next) => {
    // Your async logic here
});
```

### fetchFromLangflow

`utils/fetchFromLangflow.js` manages communication with the Langflow API.

#### Functionality:
- Sends a POST request to the Langflow API.
- Retrieves the response and extracts the relevant output.

---

## Error Handling

Errors are managed using the `ApiError` class, which provides:
- Customizable error messages and HTTP status codes.
- Additional details about the error.

### Common Errors:
- **400 Bad Request**: Input validation errors.
- **401 Unauthorized**: Missing or invalid credentials.
- **500 Internal Server Error**: Server-side failures.

Example Error Response:
```json
{
  "statusCode": 500,
  "message": "Something went wrong",
  "success": false
}
```

---

## Dependencies

| Package      | Version   | Description                              |
|--------------|-----------|------------------------------------------|
| `express`    | ^4.x.x    | Web framework for Node.js.               |
| `cors`       | ^2.x.x    | Middleware for handling CORS.            |
| `dotenv`     | ^10.x.x   | Loads environment variables from `.env`. |
| `body-parser`| ^1.x.x    | Middleware for parsing request bodies.   |

Install dependencies with:
```bash
npm install
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.
---

Feel free to suggest improvements or report issues by opening an issue in the repository. 🚀

