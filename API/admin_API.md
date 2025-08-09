<center>
# Admin API Documentation
</center>

**Base URL:** `http://localhost:5000/api/admin/v1`

---

## Company Routes

### POST /add-company

- **Description:** Create a new company
- **Requires Auth:** Yes
- **Data:** Body (JSON), optional image file (`image` field)
- **Notes:** Requires company details like name, address, etc.

### PUT /update-company/:id 

- **Description:** Update company by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`, Body (JSON) with fields to update
- **Notes:** Supports `newdata` array for multilingual fields

### DELETE /delete-company/:id

- **Description:** Delete a company and all its branches
- **Requires Auth:** Yes
- **Data:** Params: `id`
- **Notes:** Deletes all branches under the company

### GET /companies

- **Description:** Get all companies
- **Data:** None
- **Notes:** Returns an array of companies

### GET /company/:id

- **Description:** Get company by ID with branches populated
- **Data:** Params: `id` for company
- **Notes:** Branches are populated in response

---

## Branch Routes

### POST /add-bransh/:id

- **Description:** Create a new branch
- **Requires Auth:** Yes
- **Data:** Body (JSON), optional image file (`image` field)
- **Notes:** Requires `compId` (company ID)

### PUT /update-bransh/:id

- **Description:** Update branch by ID
- **Requires Auth:** Yes
- **Data:** Params: `id` for branch, Body (JSON)
- **Notes:** Supports `newdata` array

### DELETE /delete-bransh/:id

- **Description:** Delete branch by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`
- **Notes:** Also deletes all centers inside the branch

### GET /branshes/:id

- **Description:** Get all branches for a company
- **Data:** company id from params
- **Notes:** Returns all branches fro a company 

### GET /bransh/:id

- **Description:** Get branch by ID with centers populated
- **Data:** Params: `id`for bransh
- **Notes:** centers included in response and bransh info

---

## Center Routes

### POST /add-center/:id

- **Description:** Create a new center
- **Requires Auth:** Yes
- **Data:** Body (JSON)
- **Notes:** Requires `branchId`, optional `companyId`

### PUT /update-center/:id

- **Description:** Update center by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`, Body (JSON)
- **Notes:** Supports `newdata` array

### DELETE /delete-center/:id

- **Description:** Delete center by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`


### GET /center/:id

- **Description:** Get center by ID
- **Data:** Params: `id` for center

### GET /centers/:id

- **Description:** Get all centers by branch ID
- **Data:** Params: `id` (branchId)
- **Notes:** Returns all centers under the specified branch

---

## Request Routes

### GET /requests

- **Description:** Get all requests
- **Requires Auth:** Yes
- **Data:** None
- **Notes:** Returns all request documents

### POST /requests/state

- **Description:** Get requests by state
- **Requires Auth:** Yes
- **Data:** Body (JSON) with `state` (values: `agree` or `reverse`)
- **Notes:** Returns requests filtered by state

### GET /requests/free

- **Description:** Get all requests with `free` state
- **Requires Auth:** Yes
- **Data:** None
- **Notes:** Returns all requests in `free` state

### GET /request/:id

- **Description:** Get request details by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`
- **Notes:** Returns request document with its related company/branch/center data

### DELETE /request/:id

- **Description:** Delete request by ID
- **Requires Auth:** Yes
- **Data:** Params: `id`
- **Notes:** Permanently deletes the request

### PUT /request/:id/state

- **Description:** Change request state
- **Requires Auth:** Yes
- **Data:** Params: `id`, Body (JSON) with `state` field (`agree` or `reverse`)
- **Notes:** Updates request state and propagates changes to related Company/Branch/Center

---
