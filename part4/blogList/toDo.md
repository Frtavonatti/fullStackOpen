# Part4 c y d

### Paso a paso (4.15):
- [x] Crear modelo de usuarios
- [x] Crear controlador de usuarios (GETall y POST)
- [x] Implementar bcryptjs en controlador para crear passwordHash
- [x] Agregar el controller a app.js
- [x] Testear en cliente rest de VScode

### Paso a paso (4.17):
- [x] Modificar model de blog 
- [x] Modificar blogs controller POST 
- [x] Populate GET controller de blogs
- [x] Modificar model y controller de user (usar populate)

### ### Paso a paso (4.18 - 4.23): Auth basada en Token
- [x] Crear controller Login 
        1. Importar json-web-tokens (npm install jsonwebtoken)
        2. Implementar ruta post para manejar inicio de sesión
        3. Implementar metodo para buscar al usuario seleccionado en la BD
        4. Implementar la verificación de la contraseña usando bcrypt (bcrypt.compare)
        5. Generar un token JWT para el usuario autenticado (jwt.sign) (debes crear una firma en ENV)
        6. Devolver el token y la información del usuario en la respuesta
        7. Sumar loginRouter en app.js
 
- [x] POST blogs solo al estar autenticado (el usuario identificado por el token se designa como el creador)
        - [x] Crear función auxiliar para aislar authorization header
        - [x] Usar JWT verify
        - [x] Agregar excepción JsonWebTokenError al error handler en el middleware
        - [x] Agregar parámetros para que JWT expire (en login.js)

- [ ] Refactorizar token al middleware
- [ ] DELETE blogs solo al estar autenticado
- [ ] Crea un nuevo middleware userExtractor

- [ ] Arreglar las pruebas de POST blogs
  [ ] Agregar prueba para validar que POST falle si se tiene una verificación incorrecta

 

---
<!-- ### TO-DO (pendientes):
- [x] Implementar Logger Middleware y Error Handler Middleware
- [x] Implementar Express Async Errors
- [x] Implementar eslint -->
---




### 4.15: Expansión de la Lista de Blogs, paso 3

- [x] Implementa una forma de crear nuevos usuarios realizando una solicitud POST HTTP a la dirección api/users. Los usuarios tienen username, password y name.
- [x] No guardes las contraseñas en la base de datos como texto sin cifrar, utiliza la librería bcrypt.
- [x] Implementa una forma de ver los detalles de todos los usuarios realizando una solicitud HTTP adecuada.

### 4.16: Expansión de la Lista de Blogs, paso 4

- [x] Agrega una funcionalidad que agregue las siguientes restricciones para la creación de nuevos usuarios: Deben proporcionarse tanto el username como password y ambos deben tener al menos 3 caracteres. El username debe ser único.
- [x] La operación debe responder con un código de estado adecuado y algún tipo de mensaje de error si se crea un usuario no válido.
- [x] Implementa pruebas que verifiquen que no se creen usuarios no válidos y que una operación de agregar usuario que sea no válida devuelva un código de estado adecuado y un mensaje de error.

### 4.17: Expansión de la Lista de Blogs, paso 5

- [x] Expande los blogs para que cada blog contenga información sobre el creador del blog.
- [x] Modifica la adición de nuevos blogs para que cuando se cree un nuevo blog, cualquier usuario de la base de datos sea designado como su creador (por ejemplo, el que se encontró primero).
- [x] Modifica la lista de todos los blogs para que la información de usuario del creador se muestre con el blog.
- [x] La lista de todos los usuarios también muestra los blogs creados por cada usuario.

### 4.18: Expansión de la Lista de Blogs, paso 6

- [x] Implementar la autenticación basada en token según la parte 4 Autenticación basada en token.

### 4.19: Expansión de la Lista de Blogs, paso 7

- [x] Modifica la adición de nuevos blogs para que solo sea posible si se envía un token válido con la solicitud HTTP POST. El usuario identificado por el token se designa como el creador del blog.

### 4.20\*: Expansión de la Lista de Blogs, paso 8

- [ ] Refactoriza para llevar el token a un middleware. El middleware debe tomar el token del encabezado Authorization y debe asignarlo al campo token del objeto request.

### 4.21\*: Expansión de la Lista de Blogs, paso 9

- [ ] Cambia la operación de eliminar blogs para que el blog solo pueda ser eliminado por el usuario que lo agregó. Si se intenta eliminar un blog sin un token o por un usuario incorrecto, la operación debe devolver un código de estado adecuado.

### 4.22\*: Expansión de la Lista de Blogs, paso 10

- [ ] Crea un nuevo middleware userExtractor, que encuentre al usuario y lo guarde en el objeto de solicitud.

### 4.23\*: Expansión de la Lista de Blogs, paso 11

- [ ] Arregla las pruebas para agregar un nuevo blog después de agregar la autenticación basada en token.
- [ ] Escribe una nueva prueba para asegurarte de que la adición de un blog falla con el código de estado adecuado 401 Unauthorized si no se proporciona un token.





<!-- # Part4b
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

### 4.11\*: Pruebas de Lista de Blogs, paso 4

- [x] Escribe una prueba que verifique que si la propiedad `likes` falta en la solicitud, tendrá el valor 0 por defecto.
- [x] Realiza los cambios necesarios en el código para que pase la prueba.

### 4.12\*: Pruebas de Lista de Blogs, paso 5

- [x] Escribe una prueba que verifique que si faltan las propiedades `title` o `url` en los datos solicitados, el backend responde con el código de estado 400 Bad Request.
- [x] Realiza los cambios necesarios en el código para que pase la prueba.

### 4.13: Expansiones de la Lista de Blogs, paso 1

- [x] Implementa la funcionalidad para eliminar un solo recurso de publicación de blog usando async/await.
- [x] Implementa pruebas para esta funcionalidad.

### 4.14: Expansiones de Listas de Blogs, paso 2

- [x] Implementa la funcionalidad para actualizar la información (cantidad de likes) de una publicación de blog individual usando async/await.
- [x] Implementa pruebas para esta funcionalidad. -->





<!-- # Part4a

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

### 4.5\*: Funciones Auxiliares y Pruebas Unitarias, paso 3

- [x] Crear una función `favoriteBlog` que reciba una lista de blogs y devuelva el blog con más likes.
- [x] Escribir pruebas para `favoriteBlog` usando un bloque `describe`.

### 4.6\*: Funciones Auxiliares y Pruebas Unitarias, paso 4

- [x] Crear una función `mostBlogs` que reciba una lista de blogs y devuelva el autor con la mayor cantidad de blogs.
- [x] Escribir pruebas para `mostBlogs` usando un bloque `describe`.

### 4.7\*: Funciones Auxiliares y Pruebas Unitarias, paso 5

- [x] Crear una función `mostLikes` que reciba una lista de blogs y devuelva el autor con la mayor cantidad de likes.
- [x] Escribir pruebas para `mostLikes` usando un bloque `describe`. -->
