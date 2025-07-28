<center>
# User Request API Documentation
</center>

**Base URL :** `http://localhost:5000/api/user/v1`

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


**Base URL :** `http://localhost:5000/api/admin/v1`

### GET /companies

- **Description:** Get all companies
- **Data:** None
- **Notes:** Returns an array of companies

### GET /company/:id

- **Description:** Get company by ID with branches populated
- **Data:** Params: `id` for company
- **Notes:** Branches are populated in response and company data

---

### GET /branches/:id

- **Description:** Get all branches for a company
- **Data:** company id from params
- **Notes:** Returns all branches fro a company 

### GET /branch/:id

- **Description:** Get branch by ID with centers populated
- **Data:** Params: `id`for bransh
- **Notes:** centers included in response and bransh info

---

### GET /center/:id

- **Description:** Get center by ID
- **Data:** Params: `id` for center

### GET /centers/:id

- **Description:** Get all centers by branch ID
- **Data:** Params: `id` (branchId)
- **Notes:** Returns all centers under the specified branch

---