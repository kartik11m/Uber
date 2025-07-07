# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

## Request Body
The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses
The request body must be in JSON format and include the following fields:

```
{
  "user": {
    "fullname": (object),
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
  },"token"(String): JWT Token
}
```

### Success
- **Status Code:** `201 Created`
- **Body Example:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2NjY2NjY2NjY2NjY2NjY2NiIsImlhdCI6MTY5OTk5OTk5OX0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    "user": {
      "_id": "666666666666666666666666",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

---

## Login User
### Endpoint
`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### Request Body
The request body must be in JSON format and include the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses
The request body must be in JSON format and include the following fields:

```
{
  "user": {
    "fullname": (object),
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
  },"token"(String): JWT Token
}
```

#### Success
- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2NjY2NjY2NjY2NjY2NjY2NiIsImlhdCI6MTY5OTk5OTk5OX0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    "user": {
      "_id": "666666666666666666666666",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body Example:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body Example:**
  ```json
  {
    "error": "Error message"
  }
  ```

---

## Get User Profile
### Endpoint
`GET /users/profile`

### Description
Returns the authenticated user's profile information. Requires a valid JWT token (sent as a cookie or in the Authorization header).

### Responses
The request body must be in JSON format and include the following fields:

```
{
  "user": {
    "fullname": (object),
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  "email": "string (valid email, required)",
  },
}
```

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Success
- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "_id": "666666666666666666666666",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### Not Found
- **Status Code:** `404 Not Found`
- **Body Example:**
  ```json
  {
    "message": "User not found"
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## Logout User
### Endpoint
`GET /users/logout`

### Description
Logs out the authenticated user by blacklisting the JWT token and clearing the cookie. Requires a valid JWT token (sent as a cookie or in the Authorization header).

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Success
- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "No token provided."
  }
  ```

---

## Notes
- The `email` must be unique for registration.
- The `password` is securely hashed before storage.
- All endpoints requiring authentication expect a valid JWT token (cookie or Authorization header).
