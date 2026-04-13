# Autenticación y autorización

Este módulo se encarga de gestionar la autenticación de usuarios y la autorización basada en roles para el sistema.

## Funcionalidades

- **Login**: Permite a los usuarios autenticarse utilizando su correo electrónico y contraseña.
- **Registro**: Permite a nuevos usuarios crear una cuenta proporcionando su nombre, correo electrónico y contraseña.
- **Roles y permisos**: Implementa un sistema de roles (por ejemplo, admin, instructor, estudiante) y permisos para controlar el acceso a diferentes partes del sistema.
- **Recuperación de contraseña**: Permite a los usuarios restablecer su contraseña en caso de olvido.

## Módulos internos

### AuthController
- **Modelo**: _N/A_
- **Controlador**: [AuthController](/backend/app/Http/Controllers/Auth/AuthController.php)
- **Servicio**: [AuthService](/backend/app/Services/Auth/AuthService.php)
- **Requests**
  - [LoginRequest](/backend/app/Http/Requests/Auth/LoginRequest.php)
  - [SendCodeRequest](/backend/app/Http/Requests/Auth/SendCodeRequest.php)
- **Excepciones**: _N/A_
- **Rutas**: [auth.api.php](/backend/routes/app/auth/auth.api.php)
- **Tests**
  - [PostTest](/backend/tests/Feature/Auth/AuthController/PostTest.php)
- **Factory**: _N/A_

### SecurityCode
- **Modelo**: [SecurityCode](/backend/app/Models/Auth/SecurityCode.php)
- **Controlador**: _N/A_
- **Servicio**: _N/A_
- **Requests**: _N/A_
- **Excepciones**: _N/A_
- **Rutas**: _N/
- **Tests**: _N/A_
- **Factory**: [SecurityCodeFactory](/backend/database/factories/auth/SecurityCodeFactory.php)