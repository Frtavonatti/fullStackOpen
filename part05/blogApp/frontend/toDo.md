## Part5c: Testing React Apps

### 5.13: Pruebas de Listas de Blogs, paso 1
- [x] Verifica que el componente de blog muestra el título y el autor, pero no la URL ni el número de likes por defecto.

### 5.14: Pruebas de Listas de Blogs, paso 2
- [x] Verifica que la URL del blog y el número de likes se muestran al hacer clic en el botón de detalles.

### 5.15: Pruebas de Listas de Blogs, paso 3
- [x] Verifica que al hacer clic dos veces en el botón de like, se llama dos veces al controlador de eventos.
 
### 5.16: Pruebas de Listas de Blogs, paso 4
- [ ] Verifica que el formulario de nuevo blog llama al controlador de eventos con los detalles correctos al crear un nuevo blog.



<!-- ## Part5b: Props Children y PropTypes

### 5.5: Frontend de la Lista de Blogs, paso 5
- [x] Cambia el formulario para crear publicaciones de blog para que solo se muestre cuando sea apropiado.
     - El formulario no es visible por defecto y se expande cuando se hace clic en el botón "create new blog".
     - El formulario se esconde otra vez luego de que un nuevo blog es creado.

### 5.6: Frontend de la Lista de Blogs, paso 6
- [x] Separa el formulario para crear un nuevo blog en su propio componente.
- [x] Mueve todos los estados necesarios para crear un nuevo blog a este componente.

### 5.7: Frontend de la Lista de Blogs, paso 7
- [x] Agrega un botón a cada blog que controle si se muestran o no todos los detalles sobre el blog.
     - Los detalles completos del blog se abren cuando se hace clic en el botón y se ocultan cuando se vuelve a hacer clic en el botón.

### 5.8: Frontend de la Lista de Blogs, paso 8
- [x] Implementa la funcionalidad para el botón "like".
     - Los likes aumentan al hacer una solicitud HTTP PUT a la dirección única de la publicación del blog en el backend.

### 5.9: Frontend de la Lista de Blogs, paso 9
- [x] Corrige el problema donde el nombre del usuario que añadió el blog no se muestra en sus detalles después de dar "me gusta".
- [x] Arregla el problema del botón de eliminar: cuando se crea una nueva nota, el usuario no está definido porque debe esperar a que se complete la solicitud POST.

### 5.10: Frontend de la Lista de Blogs, paso 10
- [x] Modifica la aplicación para enumerar las publicaciones de blog por el número de likes.

### 5.11: Frontend de la Lista de Blogs, paso 11
- [x] Agrega un nuevo botón para eliminar publicaciones de blog.
- [x] Implementa la lógica para eliminar publicaciones de blog en el backend.
- [x] Muestra el botón para eliminar una publicación de blog solo si la publicación de blog fue agregada por el usuario.

### 5.12: Frontend de la Lista de Blogs, paso 12
- [x] Define PropTypes para uno de los componentes de tu aplicación.
- [x] Agrega ESlint al proyecto.
     - Define la configuración según tu preferencia en el archivo `.eslintrc.cjs`.
     - Corrige todos los errores del linter. -->

<!-- ## Part 5a

### 5.1: Frontend de la Lista de Blogs, paso 1
- [x] Implementa la funcionalidad de inicio de sesión en el frontend. El token devuelto con un inicio de sesión exitoso se guarda en el estado `user` de la aplicación.

- Si un usuario no ha iniciado sesión, solo se verá el formulario de inicio de sesión.
- Si el usuario ha iniciado sesión, se muestra el nombre del usuario y una lista de blogs.
- Los detalles de usuario del usuario que inició sesión no tienen que guardarse todavía en el local storage.

### 5.2: Frontend de la Lista de Blogs, paso 2

- [x] Haz que el inicio de sesión sea "permanente" mediante el uso de local storage.
- [x] Implementa una forma de cerrar sesión.
- Asegúrate de que el navegador no recuerde los detalles del usuario después de cerrar la sesión.

### 5.3: Frontend de la Lista de Blogs, paso 3

- [x] Expande tu aplicación para permitir que un usuario que haya iniciado sesión agregue nuevos blogs.

### 5.4: Frontend de la Lista de Blogs, paso 4

- [x] Implementa notificaciones que informen al usuario sobre operaciones exitosas y no exitosas en la parte superior de la página.
- [x] Las notificaciones deben estar visibles durante unos segundos.

### Opcionales: 
- [x] Agregar funcionalidad DELETE
- [x] Mejorar styles de Blog component -->