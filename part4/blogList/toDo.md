# Part4b 

### 4.8: Pruebas de Lista de Blogs, paso 1
- [x] Utiliza la librería SuperTest para escribir una prueba que realice una solicitud HTTP GET a la URL `/api/blogs`. Verifica que la aplicación de la lista de blogs devuelva la cantidad correcta de publicaciones de blog en formato JSON.
- [x] Refactoriza el controlador de ruta para usar la sintaxis async/await en lugar de promesas.
- [x] Realiza cambios en el código para definir el entorno de prueba y usar una base de datos separada.

### 4.9: Pruebas de Lista de Blogs, paso 2
- [x] Escribe una prueba que verifique que la propiedad de identificador único de las publicaciones del blog se llame `id` en lugar de `_id`.
- [x] Realiza los cambios necesarios en el código para que pase la prueba, utilizando el método `toJSON`.

### 4.10: Pruebas de Lista de Blogs, paso 3
- [x] Escribe una prueba que verifique que al realizar una solicitud HTTP POST a la URL `/api/blogs` se crea correctamente una nueva publicación de blog.
- [x] Verifica que el número total de blogs en el sistema se incrementa en uno.
- [x] Refactoriza la operación para usar async/await en lugar de promesas.

### 4.11*: Pruebas de Lista de Blogs, paso 4
- [x] Escribe una prueba que verifique que si la propiedad `likes` falta en la solicitud, tendrá el valor 0 por defecto.
- [x] Realiza los cambios necesarios en el código para que pase la prueba.

### 4.12*: Pruebas de Lista de Blogs, paso 5
- [x] Escribe una prueba que verifique que si faltan las propiedades `title` o `url` en los datos solicitados, el backend responde con el código de estado 400 Bad Request.
- [x] Realiza los cambios necesarios en el código para que pase la prueba.

### 4.13: Expansiones de la Lista de Blogs, paso 1
- [x] Implementa la funcionalidad para eliminar un solo recurso de publicación de blog usando async/await.
- [x] Implementa pruebas para esta funcionalidad.

### 4.14: Expansiones de Listas de Blogs, paso 2
- [x] Implementa la funcionalidad para actualizar la información (cantidad de likes) de una publicación de blog individual usando async/await.
- [x] Implementa pruebas para esta funcionalidad.

# Part4a
## Ejercicios 4.3.-4.7.

### TO-DO:
- [x] Personaliza el Schema de blogs (Schema.set()) para que solo nos devuelva las propiedades deseadas 
### OPCIONALES
- [ ] Aprender de Lodash

### 4.3: Funciones Auxiliares y Pruebas Unitarias, paso 1
- [x] Crear una función `dummy` que reciba un array de publicaciones de blog y devuelva 1.
- [x] Verificar la configuración de prueba con una prueba que asegure que `dummy` devuelve 1.

### 4.4: Funciones Auxiliares y Pruebas Unitarias, paso 2
- [x] Crear una función `totalLikes` que reciba una lista de publicaciones de blogs y devuelva la suma total de likes.
- [x] Escribir pruebas para `totalLikes` usando un bloque `describe`.

### 4.5*: Funciones Auxiliares y Pruebas Unitarias, paso 3
- [x] Crear una función `favoriteBlog` que reciba una lista de blogs y devuelva el blog con más likes.
- [x] Escribir pruebas para `favoriteBlog` usando un bloque `describe`.

### 4.6*: Funciones Auxiliares y Pruebas Unitarias, paso 4
- [x] Crear una función `mostBlogs` que reciba una lista de blogs y devuelva el autor con la mayor cantidad de blogs.
- [x] Escribir pruebas para `mostBlogs` usando un bloque `describe`.

### 4.7*: Funciones Auxiliares y Pruebas Unitarias, paso 5
- [x] Crear una función `mostLikes` que reciba una lista de blogs y devuelva el autor con la mayor cantidad de likes.
- [x] Escribir pruebas para `mostLikes` usando un bloque `describe`.