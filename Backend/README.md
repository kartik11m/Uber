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


---

# Captain Endpoints Documentation

## Register Captain
### Endpoint
`POST /captains/register`

### Description
Registers a new captain (driver) in the system. Validates all input fields, including vehicle details, and creates a new captain account.

### Request Body
The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (one of: car, bike, auto, required)"
  }
}
```

#### Example
```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "strongPassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses
```
captain:{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (one of: car, bike, auto, required)"
  },"token": "JWT Token"
}
```

#### Success
- **Status Code:** `201 Created`
- **Body Example:**
  ```json
  {
    "_id": "777777777777777777777777",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
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
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Vehicle type must be one of car, bike, or auto",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body Example:**
  ```json
  {
    "error": "Failed to create captain: <error message>"
  }
  ```

---
