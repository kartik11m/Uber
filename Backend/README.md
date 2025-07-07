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

## Notes
- The `email` must be unique for registration.
- The `password` is securely hashed before storage.
- Both endpoints return a JWT token for authentication.

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Notes
- The `email` must be unique.
- The `password` is securely hashed before storage.
- The response includes a JWT token for authentication.
