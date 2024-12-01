# API Auth Spotify

## Descripción del proyecto

Este backend en **Node.js** utiliza el **flujo de credenciales de cliente** para obtener tokens de acceso a la API de Spotify. 

### Características:
- **Protección de credenciales sensibles**: Las claves de la aplicación (`client_id` y `client_secret`) se almacenan de manera segura utilizando **variables de entorno**.
- **Intermediario seguro**: Las solicitudes desde el frontend se redirigen al backend para realizar la autenticación, evitando exponer credenciales en el cliente.
- **Integración con la API de Spotify**: Simplifica el manejo de tokens y facilita la comunicación con los servicios de Spotify desde el frontend.

### Mejoras:
- **Habilitación de CORS**: Configurción para permitir solicitudes únicamente desde el dominio del proyecto frontend, mejorando la seguridad.
