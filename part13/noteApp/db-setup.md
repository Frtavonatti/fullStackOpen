## Steps to Run the PostgreSQL Container

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

You can start a PostgreSQL container using the following command:

```bash
docker run --name noteapp-postgres -e POSTGRES_USER=test -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=noteApp -p 5432:5432 -d postgres
```

- Replace `yourpassword` with a secure password.
- The container will be named `noteapp-postgres` and expose port 5432.

### 3. Use `docker-compose.yml` to Start PostgreSQL

If you have a configured `docker-compose.yml` file, simply run:

```bash
docker compose up -d
```

- This will start all services defined in the file, including PostgreSQL.
- Use `docker compose ps` to see running containers.

### 4. Interact with PostgreSQL Using psql in Docker

To access the PostgreSQL database running in a Docker container interactively, use:

```bash
docker exec -it <container_name_or_id> psql -U test -d noteApp
```

- Replace `<container_name_or_id>` with the actual name or ID of your running PostgreSQL container (e.g., `noteapp-postgres` or the ID shown by `docker ps`).

**Notes about the command:**
- `docker exec`: Runs a command in a running container.
- `-it`: Enables interactive terminal mode.
- `<container_name_or_id>`: The name or ID of the container running PostgreSQL.
- `psql`: PostgreSQL command-line client.
- `-U test`: Specifies the database user (`test`).
- `-d noteApp`: Specifies the database to connect to (`noteApp`).

This command is useful for running SQL queries directly from the terminal inside the container environment.

### 5. Stop the Containers

To stop services started with Docker Compose:

```bash
docker compose down
```

This will remove the containers but keep the data volumes if they are defined.