# Movie Search App (Prueba Técnica)

Aplicación Full-Stack para buscar películas (OMDb API) y guardar favoritas.

## Tecnologías Usadas

### Backend
- **C# .NET 10** (ASP.NET Core Web API)
- **Entity Framework Core** (SQLite)
- **Clean Architecture** (Domain, Application, Infrastructure, API)
- **JWT** (Autenticación)
- **BCrypt** (Hashing de contraseñas)

### Frontend
- **React** (Vite + TypeScript)
- **Tailwind CSS** (Estilos)
- **Axios** (Cliente HTTP)
- **React Router** (Navegación)

## Requisitos Previos
- .NET SDK 10
- Node.js (v18+)
- OMDb API Key (Configurada en `src/MovieApp.Api/appsettings.json`)

## Pasos para Ejecutar

### 1. Configuración
Abre `src/MovieApp.Api/appsettings.json` y reemplaza `YOUR_OMDB_API_KEY` con tu llave de OMDb.

### 2. Ejecutar Backend
Desde la raíz del proyecto:
```bash
cd src/MovieApp.Api
dotnet run
```
La API estará disponible en `http://localhost:5000` (o el puerto que indique la consola).

### 3. Ejecutar Frontend
Desde la raíz del proyecto:
```bash
cd client
npm install
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`.

## Decisiones de Diseño

### Clean Architecture
Se eligió esta arquitectura para desacoplar la lógica de negocio de la infraestructura y la presentación, facilitando el mantenimiento y las pruebas.
- **Domain**: Entidades y contratos de repositorio.
- **Application**: Casos de uso (Servicios) y DTOs.
- **Infrastructure**: Implementación de base de datos, servicios externos (OMDb) y autenticación.
- **API**: Controladores y configuración de dependencias.

### Frontend
Se utilizó React con Vite para un desarrollo rápido y moderno. Tailwind CSS permite un diseño limpio y funcional sin escribir CSS personalizado complejo. La estructura de carpetas separa páginas, componentes y contexto.

## Posibles Mejoras Futuras
- **Validación**: Implementar FluentValidation en el Backend.
- **Tests**: Agregar pruebas unitarias (xUnit) y de integración.
- **Manejo de Errores**: Middleware global de excepciones más robusto.
- **UI/UX**: Mejorar el diseño visual con animaciones y feedback más detallado.
- **Paginación**: Soportar paginación en la búsqueda de películas.
