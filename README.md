# Blog Project: Backend Assignment

## Overview
The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system includes Admin and User roles, secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Features
### User Roles
- **Admin**:
  - Created manually in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating a property `isBlocked`.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**:
  - Users must log in to perform write, update, and delete operations.
- **Authorization**:
  - Admin and User roles are differentiated and secured.

### Blog API
- Public API for reading blogs:
  - Includes blog title, content, author details, and other necessary information.
  - Supports search, sorting, and filtering functionalities.

---

## Technologies
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose

---



## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the application:
   ```bash
   npm run dev
   ```

5. Access the application:
   - API documentation available at `http://localhost:3000/api-docs` (if Swagger is configured).


  
