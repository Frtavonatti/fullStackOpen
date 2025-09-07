## Steps to Run the PostgreSQL Container for blogApp

### 1. Start Docker

If Docker is not running, start the service with:

```bash
sudo systemctl start docker
```

You can check if Docker is active with:

```bash
sudo systemctl status docker
```

### 2. Run PostgreSQL Directly with Docker

You can start a PostgreSQL container for `blogApp` using the following command:

```bash
docker run --name blogapp-postgres -e POSTGRES_USER=bloguser -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=blogApp -p 5432:5432 -d postgres
```

- Replace `yourpassword` with a secure password.
- The container will be named `blogapp-postgres` and expose port 5432.

### 3. Use `docker-compose.yml` to Start PostgreSQL

If you have a configured `docker-compose.yml` file for `blogApp`, simply run:

```bash
docker compose up -d
```

- This will start all services defined in the file, including PostgreSQL.
- Use `docker compose ps` to see running containers.

### 4. Interact with PostgreSQL Using psql in Docker

To access the PostgreSQL database running in a Docker container interactively, use:

```bash
docker exec -it <container_name_or_id> psql -U bloguser -d blogApp
```

- Replace `<container_name_or_id>` with the actual name or ID of your running PostgreSQL container (e.g., `blogapp-postgres` or the ID shown by `docker ps`).

**Notes about the command:**
- `docker exec`: Runs a command in a running container.
- `-it`: Enables interactive terminal mode.
- `<container_name_or_id>`: The name or ID of the container running PostgreSQL.
- `psql`: PostgreSQL command-line client.
- `-U bloguser`: Specifies the database user (`bloguser`).
- `-d blogApp`: Specifies the database to connect to (`blogApp`).

This command is useful for running SQL queries directly from the terminal inside the container environment.

### 5. Stop the Containers

To stop services started with Docker Compose:

```bash
docker compose down
```

This will remove the containers but keep the data volumes if they are defined.