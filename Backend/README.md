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
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

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
