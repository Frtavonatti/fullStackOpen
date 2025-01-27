- [x] **8.1: El número de libros y autores**
  - Implementar consultas `bookCount` y `authorCount` que devuelvan el número de libros y el número de autores.
  - La consulta:
    ```graphql
    query {
      bookCount
      authorCount
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "bookCount": 7,
        "authorCount": 5
      }
    }
    ```

- [x] **8.2: Todos los libros**
  - Implementar la consulta `allBooks`, que devuelva los detalles de todos los libros.
  - La consulta:
    ```graphql
    query {
      allBooks { 
        title 
        author
        published 
        genres
      }
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "allBooks": [
          {
            "title": "Clean Code",
            "author": "Robert Martin",
            "published": 2008,
            "genres": ["programming"]
          },
          {
            "title": "Agile software development",
            "author": "Robert Martin",
            "published": 2002,
            "genres": ["programming", "agile"]
          },
          {
            "title": "Refactoring, edition 2",
            "author": "Martin Fowler",
            "published": 2018,
            "genres": ["programming", "refactoring"]
          }
        ]
      }
    }
    ```

- [x] **8.3: Todos los autores**
  - Implementar la consulta `allAuthors`, que devuelva los detalles de todos los autores, incluyendo un campo `bookCount` con el número de libros que ha escrito el autor.
  - La consulta:
    ```graphql
    query {
      allAuthors {
        name
        bookCount
      }
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "allAuthors": [
          {
            "name": "Robert Martin",
            "bookCount": 2
          },
          {
            "name": "Martin Fowler",
            "bookCount": 1
          },
          {
            "name": "Fyodor Dostoevsky",
            "bookCount": 2
          },
          {
            "name": "Joshua Kerievsky",
            "bookCount": 1
          },
          {
            "name": "Sandi Metz",
            "bookCount": 1
          }
        ]
      }
    }
    ```

- [x] **8.4: Libros de un autor**
  - Modificar la consulta `allBooks` para aceptar un parámetro opcional `author` y devolver solo los libros escritos por ese autor.
  - La consulta:
    ```graphql
    query {
      allBooks(author: "Robert Martin") {
        title
      }
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "allBooks": [
          {
            "title": "Clean Code"
          },
          {
            "title": "Agile software development"
          }
        ]
      }
    }
    ```

- [x] **8.5: Libros por género**
  - Modificar la consulta `allBooks` para aceptar un parámetro opcional `genre` y devolver solo los libros de ese género.
  - La consulta:
    ```graphql
    query {
      allBooks(genre: "refactoring") {
        title
        author
      }
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "allBooks": [
          {
            "title": "Clean Code",
            "author": "Robert Martin"
          },
          {
            "title": "Refactoring, edition 2",
            "author": "Martin Fowler"
          },
          {
            "title": "Refactoring to patterns",
            "author": "Joshua Kerievsky"
          },
          {
            "title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
            "author": "Sandi Metz"
          }
        ]
      }
    }
    ```
  - La consulta debe funcionar cuando ambos parámetros opcionales son proporcionados:
    ```graphql
    query {
      allBooks(author: "Robert Martin", genre: "refactoring") {
        title
        author
      }
    }
    ```

- [x] **8.6: Agregar un libro**
  - Implementar la mutación `addBook`, que puede ser usada así:
    ```graphql
    mutation {
      addBook(
        title: "NoSQL Distilled",
        author: "Martin Fowler",
        published: 2012,
        genres: ["database", "nosql"]
      ) {
        title,
        author
      }
    }
    ```
  - La mutación funciona incluso si el autor no está todavía guardado en el servidor:
    ```graphql
    mutation {
      addBook(
        title: "Pimeyden tango",
        author: "Reijo Mäki",
        published: 1997,
        genres: ["crime"]
      ) {
        title,
        author
      }
    }
    ```
  - Si el autor aún no está guardado en el servidor, se agrega un nuevo autor al sistema. Los años de nacimiento de los autores aún no se guardan en el servidor, entonces la consulta:
    ```graphql
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
    ```
  - Debe devolver:
    ```json
    {
      "data": {
        "allAuthors": [
          // ...
          {
            "name": "Reijo Mäki",
            "born": null,
            "bookCount": 1
          }
        ]
      }
    }
    ```

- [x] **8.7: Actualización del año de nacimiento de un autor**
  - Implementar la mutación `editAuthor`, que se puede usar para establecer un año de nacimiento para un autor.
  - La mutación:
    ```graphql
    mutation {
      editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
        name
        born
      }
    }
    ```
  - Si se encuentra el autor correcto, la operación devuelve el autor editado:
    ```json
    {
      "data": {
        "editAuthor": {
          "name": "Reijo Mäki",
          "born": 1958
        }
      }
    }
    ```
  - Si el autor no está en el sistema, se devuelve `null`:
    ```json
    {
      "data": {
        "editAuthor": null
      }
    }
    ```