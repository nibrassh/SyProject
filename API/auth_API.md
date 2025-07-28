<center>
# Auth Request API Documentation
</center>

**Base URL:** `http://localhost:5000/api/auth/v1`

---

## Request Routes

### POST /signin

- **Description:** Submit a request to sign in
- **Data:** Body (JSON),  email password

### GET /users

- **Description:** Submit a request to return all users

### POST /cretae-user

- **Description:** Submit a request to create a new user
- **Data:** Body (JSON), name email password isAdmin

### DELETE /:id

- **Description:** Submit a request to delete user
- **Data:** Id to user from url 

---
### PUT /toggle-admin/:id

- **Description:** Submit a request to toggle the user admin state
- **Data:** Id to user from url 

---

**Note:** All request need token without signin 
