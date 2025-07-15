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


## Captain Registration
### Endpoint
`POST /captains/register`

### Description
Registers a new captain (driver) in the system. All fields are required unless otherwise noted.

### Request Body (JSON)
```jsonc
{
  "fullname": {
    "firstname": "Alice", // string, required, min 3 chars
    "lastname": "Smith"   // string, required, min 3 chars
  },
  "email": "alice.smith@example.com", // string, required, valid email, unique
  "password": "strongPassword123",    // string, required, min 6 chars
  "vehicle": {
    "color": "Red",         // string, required, min 3 chars
    "plate": "XYZ1234",     // string, required, min 3 chars
    "capacity": 4,           // integer, required, min 1
    "vehicleType": "car"    // string, required, one of: car, bike, auto
  }
}
```

### Success Response (201 Created)
```jsonc
{
  "message": "Captain registered successfully",
  "token": "<JWT Token>",
  "captain": {
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
}
```

### Validation Error (400 Bad Request)
```jsonc
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long", // example error
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

### Duplicate Email Error (400 Bad Request)
```jsonc
{
  "message": "Captain with this email already exists"
}
```


### Server Error (500 Internal Server Error)
```jsonc
{
  "error": "Failed to create captain: <error message>"
}
```

---

## Captain Login
### Endpoint
`POST /captains/login`

### Description
Authenticates a captain with email and password. Returns a JWT token and captain data if credentials are valid.

### Request Body (JSON)
```jsonc
{
  "email": "alice.smith@example.com", // string, required, valid email
  "password": "strongPassword123"     // string, required, min 6 chars
}
```

### Success Response (200 OK)
```jsonc
{
  "message": "Logged in successfully",
  "token": "<JWT Token>",
  "captain": {
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
}
```

### Validation Error (400 Bad Request)
```jsonc
{
  "errors": [
    {
      "msg": "Invalid Email", // example error
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

### Authentication Error (401 Unauthorized)
```jsonc
{
  "message": "Invalid email or password"
}
```

### Server Error (500 Internal Server Error)
```jsonc
{
  "error": "Error message"
}
```

---

## Captain Profile
### Endpoint
`GET /captains/profile`

### Description
Returns the authenticated captain's profile information. Requires a valid JWT token (sent as a cookie or in the Authorization header).

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Success Response (200 OK)
```jsonc
{
  "captain": {
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
}
```

### Not Found (404 Not Found)
```jsonc
{
  "message": "Captain not found"
}
```

### Unauthorized (401 Unauthorized)
```jsonc
{
  "message": "Unauthorized"
}
```

---

## Captain Logout
### Endpoint
`GET /captains/logout`

### Description
Logs out the authenticated captain by blacklisting the JWT token and clearing the cookie. Requires a valid JWT token (sent as a cookie or in the Authorization header).

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Success Response (200 OK)
```jsonc
{
  "message": "Logged out successfully"
}
```

### Unauthorized (401 Unauthorized)
```jsonc
{
  "message": "No token provided."
}
```

## Get Fare
### Endpoint
`GET /rides/get-fare`

### Description
Calculates and returns the estimated fare for a ride between a pickup and destination location for all supported vehicle types. Requires authentication.

### Query Parameters
- `pickup`: string (required, min 3 chars) — Pickup address
- `destination`: string (required, min 3 chars) — Destination address

#### Example
```
/rides/get-fare?pickup=Phoenix Mall, Indore&destination=Rajwada, Indore
```

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Success Response
- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "car": 193.20,
    "auto": 110.25,
    "bike": 65.00,
    "distanceValue": 5.6,
    "durationValue": 12.0
  }
  ```
  - `car`, `auto`, `bike`: Estimated fare for each vehicle type (number)
  - `distanceValue`: Distance in kilometers (number)
  - `durationValue`: Duration in minutes (number)

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body Example:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup",
        "param": "pickup",
        "location": "query"
      },
      {
        "msg": "Invalid destination",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Access denied. No token provided."
  }
  ```

### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body Example:**
  ```json
  {
    "message": "Error message"