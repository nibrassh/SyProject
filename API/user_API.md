<center>
# User Request API Documentation
</center>

**Base URL:** `http://localhost:5000/api/user/v1`

---

## Request Routes

### POST /request/company/:id

- **Description:** Submit a request to create a request for a company
- **Data:** Body (JSON), and company ID

### POST /request/branch/:id

- **Description:** Submit a request to create a new branch request
- **Data:** Body (JSON), and branch ID

### POST /request/center/:id

- **Description:** Submit a request to create a new center request
- **Data:** Body (JSON), and center ID

---

**Note:** All fields are required.
