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
  
  # Exercise 13.17: Initialize Database and Timestamps
  - [x] Delete all tables from the application's database.
  - [x] Create a migration to initialize the database.
  - [x] Add `created_at` and `updated_at` timestamp fields to both tables.
  - [x] Remove `User.sync()` and `Blog.sync()` commands from the code.
  - [x] If tables are deleted manually, clear the contents of the `migrations` table to allow new migrations.

  # Exercise 13.18: Year Attribute in Blogs
  - [x] Expand the application via migration so that blogs have a `year` attribute.
  - [x] The `year` field must be an integer at least 1991 and no greater than the current year.
  - [x] The application must display an appropriate error message if the year is invalid.

  # Exercise 13.19: Reading List Feature
  - [x] Allow users to add blogs to their reading list.
    - When a blog is added, it should be marked as unread by default.
  - [x] Implement the reading list using a join table (e.g., `ReadingList`).
    - The join table should include fields for `userId`, `blogId`, and `read` (default: `false`).
  - [x] Create database migrations to add the join table and necessary fields.
  - [x] Verify addition and viewing of the reading list directly in the database.

  # Exercise 13.20: Reading List
  - [ ] Add functionality to support a reading list.
    - Create the route `POST /api/readinglists` to add a blog to a user's reading list.
      - The requesti body must include `blogId` and `userId`.
    - Modify the route `GET /api/users/:id` to return user information along with the reading list in the specified format.

  # Exercise 13.21: Reading Status in the List
  - [ ] Expand the `GET /api/users/:id` route so that each blog in the reading list includes:
    - Whether the blog has been read (`read`).
    - The ID of the corresponding row in the join table (`id`).
    - The `readinglists` property should be an array containing a single object per blog.

  # Exercise 13.22: Mark Blog as Read
  - [ ] Implement the route `PUT /api/readinglists/:id` to mark a blog as read.
    - The request body must include `{ "read": true }`.
    - Only the owner user can mark their blogs as read, identified by the JWT token.

  # Exercise 13.23: Filter Reading List by Status
  - [ ] Modify the route `GET /api/users/:id` to allow filtering the reading list:
    - `GET /api/users/:id` returns the complete reading list.
    - `GET /api/users/:id?read=true` returns only read blogs.
    - `GET /api/users/:id?read=false` returns only unread blogs.
