## 

### **5.17: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 1**
- [x] Crea un nuevo proyecto npm para pruebas y configura Playwright allí.
- [x] Asegúrate de que la aplicación muestra el formulario de inicio de sesión por defecto.

### **5.18: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 2**
- [x] Realiza pruebas para iniciar sesión, incluyendo intentos exitosos y no exitosos.
- [x] Crea un nuevo usuario en el bloque `beforeEach` para las pruebas.
- [x] Vacía la base de datos en el bloque `beforeEach`.

### **5.19: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 3**
- [ ] Comprueba que un usuario que ha iniciado sesión puede crear un nuevo blog.
- [ ] Asegúrate de que el nuevo blog es visible en la lista de todos los blogs.

### **5.20: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 4**
- [ ] Comprueba que el blog puede editarse.

### 5.21: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 5
- [ ] Realiza una prueba para asegurarte de que el usuario que creó un blog pueda eliminarlo. Si utilizas el diálogo `window.confirm` en la operación de eliminación, quizás tengas que investigar cómo usar el diálogo en las pruebas de Playwright.

### 5.22: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 6
- [ ] Realiza una prueba para asegurarte de que solo el creador puede ver el botón de eliminación de un blog, nadie más.

### 5.23: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 7
- [ ] Realiza una prueba que verifique que los blogs estén ordenados de acuerdo con los "likes", con el blog con más "likes" en primer lugar.