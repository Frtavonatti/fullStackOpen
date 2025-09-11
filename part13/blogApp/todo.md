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

# Exercise 13.13: Filter Blogs by Keyword
- [x] Implement keyword filtering for the `GET /api/blogs` route.
  - `GET /api/blogs?search=react` returns all blogs with the keyword "react" in the `title` field (case-insensitive).
  - `GET /api/blogs` returns all blogs.

# Exercise 13.14: Expand Filter to Author
- [x] Expand the filter to search for the keyword in both `title` and `author` fields.
  - `GET /api/blogs?search=jami` returns blogs with the keyword "jami" in either the `title` or `author` fields.

# Exercise 13.15: Order Blogs by Likes
- [x] Modify the blogs route to return blogs ordered by the number of likes in descending order.

# Exercise 13.16: Authors Route with Blog and Like Counts
- [x] Create a route `/api/authors` that returns the number of blogs and total likes for each author.
  - Implement the operation directly at the database level using `group by` and aggregation functions.
  - The returned JSON should look like:
    ```json
    [
      { "author": "Jami Kousa", "articles": "3", "likes": "10" },
      { "author": "Kalle Ilves", "articles": "1", "likes": "2" },
      { "author": "Dan Abramov", "articles": "1", "likes": "4" }
    ]
    ```
  - **Bonus:** Order the returned data by the number of likes in the database query.