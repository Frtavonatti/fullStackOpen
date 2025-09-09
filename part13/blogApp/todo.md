# Exercise 13.10: Link Authenticated User to Each Added Blog

### 1. Prepare User Authentication
- [x] Implement a login endpoint (`POST /api/login`) that returns a JWT token.

### 2. Authentication Middleware
- [x] Create middleware to:
  - Extract the JWT token from the `Authorization` header.
  - Verify the token.
  - Retrieve the corresponding user.
  - Attach the authenticated user to the `request` object (e.g., `req.user`).

### 3. Modify Blog Creation
- [x] Update the `POST /api/blogs` endpoint to:
  - Use the authentication middleware.
  - Get the authenticated user from `req.user`.
  - Associate the new blog with the authenticated user (save `userId` in the blog).

### 4. Validate Authentication When Creating Blogs
- [x] Allow blog creation only if the user is authenticated.

### 5. Testing
- [x] Test manually or automatically that:
  - An authenticated user can add a blog and it is linked to their user.
  - An unauthenticated user receives an error when trying to add a blog.

**Note:**  
It is not necessary to modify the blog fetching endpoints `GET /api/blogs` or users `GET /api/users` to show relationships, as that is part of the next task (Exercise 13.12).


# Exercise 13.11: Delete Blogs
- [x] Allow only the user who added a blog to delete it.

# Exercise 13.12: Show Relationships in Endpoints
- [x] Update `GET /api/blogs` to show the user who added each blog.
- [x] Update `GET /api/users` to show the blogs each user has added.