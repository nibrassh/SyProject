<center>
# Admin API Documentation
</center>

**Base URL:** `http://localhost:5000/api/admin/v1`

---

## Company Routes

### POST /add-company

- Description: Create a new company
- Requires Auth: Yes
- Data: Body (JSON), optional image file (image field)
- Notes: Requires company details like name, address, etc.

### PUT /update-company/:id

- Description: Update company by ID
- Requires Auth: Yes
- Data: Params: id, Body (JSON) with fields to update
- Notes: Supports `newdata` array for multilingual fields

### DELETE /delete-company/:id

- Description: Delete a company and all its branches
- Requires Auth: Yes
- Data: Params: id
- Notes: Deletes all branches under the company

### GET /companies

- Description: Get all companies
- Requires Auth: Yes
- Data: None
- Notes: Returns an array of companies

### GET /company/:id

- Description: Get company by ID with branches populated
- Requires Auth: Yes
- Data: Params: id
- Notes: Branches are populated in response

---

## Branch Routes

### POST /add-branch

- Description: Create a new branch
- Requires Auth: Yes
- Data: Body (JSON), optional image file (image field)
- Notes: Requires `compId` (company ID)

### PUT /update-branch/:id

- Description: Update branch by ID
- Requires Auth: Yes
- Data: Params: id, Body (JSON)
- Notes: Supports `newdata` array

### DELETE /delete-branch/:id

- Description: Delete branch by ID
- Requires Auth: Yes
- Data: Params: id
- Notes: Also deletes all centers inside the branch

### GET /branches

- Description: Get all branches
- Requires Auth: Yes
- Data: None
- Notes: Returns all branches with company info populated

### GET /branch/:id

- Description: Get branch by ID with company and centers populated
- Requires Auth: Yes
- Data: Params: id
- Notes: Company and centers included in response

---

## Center Routes

### POST /add-center

- Description: Create a new center
- Requires Auth: Yes
- Data: Body (JSON)
- Notes: Requires `branchId`, optional `companyId`

### PUT /update-center/:id

- Description: Update center by ID
- Requires Auth: Yes
- Data: Params: id, Body (JSON)
- Notes: Supports `newdata` array

### DELETE /delete-center/:id

- Description: Delete center by ID
- Requires Auth: Yes
- Data: Params: id

### GET /center/:id

- Description: Get center by ID
- Requires Auth: Yes
- Data: Params: id

### GET /centers/:id

- Description: Get all centers by branch ID
- Requires Auth: Yes
- Data: Params: id (branchId)
- Notes: Returns all centers under the specified branch

---
