# Prueba Técnica: Backend (NestJS) y Frontend (Angular)

## Descripción General

Este proyecto es el resultado de una prueba técnica que abarca el desarrollo de un backend con NestJS y un frontend con Angular, cumpliendo con los requisitos solicitados para la gestión de categorías y productos en una tienda.

---

## Índice

- [Requisitos de la prueba](#requisitos-de-la-prueba)
- [Decisiones técnicas y consideraciones](#decisiones-técnicas-y-consideraciones)
- [Backend (NestJS)](#backend-nestjs)
- [Frontend (Angular)](#frontend-angular)
- [Base de datos y relaciones](#base-de-datos-y-relaciones)
- [Ejecución y pruebas](#ejecución-y-pruebas)
- [Video explicativo](#video-explicativo)

---

## Requisitos de la prueba

**Backend (NestJS):**

- API REST sobre Node 24, TypeORM, código y comentario.
- Servicios para categorías: crear, consultar por nombre, consultar todo, eliminar (con header admin:true).
- Servicios para productos: crear, consultar por nombre, consultar por id, consultar todo, inactivar (no eliminar físico).
- Relación: una categoría puede tener varios productos (OneToMany).
- Uso de PIPES para validar IDs.
- Archivo .sql con la estructura y datos de la base de datos.
- Uso de variables de entorno (.env).

**Frontend (Angular):**

- Angular 19 o 20, código y comentarios.
- Página de login ficticia (usuario, contraseña, admin).
- Dashboard con navegación, menús y vistas independientes para categorías y productos.
- Consumo de todos los servicios del backend.
- Uso de modales para operaciones CRUD.
- **Nota:** No se utilizó Tailwind por conflictos de dependencias. Se implementó Bootstrap para una mejor experiencia visual y compatibilidad.

---

## Decisiones técnicas y consideraciones

Inicialmente intenté integrar **Tailwind CSS** ejecutando `npx tailwindcss init` para generar el archivo `tailwind.config.js` y así poder usar Tailwind en los estilos del proyecto. Mi objetivo era aprovechar las utilidades de Tailwind en Angular.

Sin embargo, surgieron errores al correr `ng serve` porque Tailwind no estaba integrado correctamente con Angular o PostCSS. Realicé varios ajustes, asegurándome de que las directivas `@tailwind base;`, `@tailwind components;` y `@tailwind utilities;` estuvieran en `styles.css`, logrando que Angular compilara los estilos y mostrara los archivos iniciales.

La dificultad principal fue la configuración de Tailwind con Angular usando npx, ya que requiere que PostCSS y Angular reconozcan los archivos de Tailwind. Por estos conflictos y para garantizar la compatibilidad y una mejor experiencia visual, decidí implementar **Bootstrap** en lugar de Tailwind CSS. Esto me permitió lograr una interfaz responsiva y sin conflictos.

Utilicé **MySQL** como motor de base de datos.

Documenté y estructuré el código, siguiendo buenas prácticas.

Implementé iconos 👀 en las partes más importantes de la interfaz para resaltar funcionalidades clave.

El login es ficticio.

---

## Backend (NestJS)

- Estructura modular con controladores, servicios, DTOs, modulos y entidades para categorías y productos.
- Uso de TypeORM para el mapeo de entidades y relaciones.
- Validación de datos con Pipes y DTOs.
- Servicio de eliminación de categorías protegido por header personalizado (`admin: true`).
- Servicio de inactivación para productos (no se eliminan físicamente).
- Variables de entorno para configuración sensible.
- Archivo SQL en `/database/shop.sql` para la estructura y datos de la base de datos.

---

## Frontend (Angular)

- Utilicé componentes standalone, sin app.module.ts (Angular moderno).
- Implementé la navegación con Angular Router y protección de rutas según el estado admin.
- Los formularios son reactivos y validan los datos antes de enviarlos al backend.
- Consumo la API REST con HttpClient.
- Para que el backend permitiera las solicitudes desde el frontend, configuré correctamente los CORS en el backend (NestJS).
- La interfaz es responsiva y moderna gracias a Bootstrap.
- Incluí iconos y mensajes claros para el usuario.

---

## Base de datos y relaciones

- Utilicé una base de datos relacional (**MySQL**) llamada `shop`.
- Se crearon dos tablas principales: `categories` y `products`.
- La relación principal es **OneToMany**: una categoría puede tener varios productos.
- Además, cada producto tiene una relación **ManyToOne** con la tabla de categorías (cada producto pertenece a una sola categoría).
- Archivo SQL: [`/database/shop.sql`](database/shop.sql)

### Diagrama de la base de datos

![Diagrama de base de datos](./base_de_datos.png)

> El diagrama muestra la relación 1 a N entre categorías y productos, así como las claves primarias y foráneas utilizadas en la estructura.

---

## Ejecución y pruebas

### Backend

```bash
cd prueba
npm install
npm run start:dev
```

### Frontend

```bash
cd shopdashboard
npm install
ng serve
```

---

## Video explicativo

Incluye un video corto donde se explica la construcción del código y el flujo de datos entre backend y frontend.

---

## Descargar informe Word

[Descargar informe Word aquí](#) <!-- Reemplaza # por el enlace real cuando lo tengas -->

> **Nota:** El archivo Word contiene capturas de pantalla y el proceso detallado de la mayoría de los pasos realizados durante la prueba técnica, para facilitar la comprensión y verificación visual del desarrollo.

---

## Notas finales

- No se utilizó Tailwind por conflictos de dependencias, se optó por Bootstrap para garantizar compatibilidad y mejor experiencia visual.
- El proyecto cumple con todos los requisitos técnicos y funcionales solicitados en la prueba.

---
