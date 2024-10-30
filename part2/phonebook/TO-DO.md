# La Agenda Telefónica

## 2.12: La Agenda Telefónica paso 7
- Guardar los números agregados a la agenda telefónica en un servidor backend.

## 2.13: La Agenda Telefónica paso 8
- Extraer el código que maneja la comunicación con el backend en su propio módulo.

## 2.14: La Agenda Telefónica paso 9
- Permitir a los usuarios eliminar entradas de la agenda telefónica.
- Agregar un botón dedicado para eliminar cada persona en la lista de la agenda telefónica.
- Confirmar la acción del usuario utilizando el método `window.confirm`.
- Hacer una solicitud HTTP DELETE a la URL del recurso asociado a la persona en el backend.
- Usar la librería axios para hacer la solicitud HTTP DELETE.

## 2.15*: La Agenda Telefónica paso 10
- Cambiar la funcionalidad para que si se agrega un número a un usuario que ya existe, el nuevo número reemplace al antiguo.
- Usar el método HTTP PUT para actualizar el número de teléfono.
- Pedirle al usuario que confirme la acción si la información de la persona ya está en la agenda telefónica.