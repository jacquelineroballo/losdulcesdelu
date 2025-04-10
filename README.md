# losdulcesdelu
Bakery Website

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- npm (viene con Node.js) o [yarn](https://yarnpkg.com/)


## Pasos para ejecutar el proyecto

### 1. Descarga o clona el código

Si tienes el código en un repositorio Git:

git clone [URL-del-repositorio]
cd losdulcesdelu

Si tienes los archivos en un archivo ZIP, descomprímelos en una carpeta y navega hasta ella en la terminal.

### 2. Instala las dependencias

Con npm:

```shellscript
npm install
```

O con yarn:

```shellscript
yarn install
```

### 3. Ejecuta el servidor de desarrollo

Con npm:

```shellscript
npm run dev
```

O con yarn:

```shellscript
yarn dev
```

Esto iniciará el servidor de desarrollo de Next.js. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio web.

## Comandos adicionales

### Construir para producción


npm run build
# o
yarn build

### Iniciar en modo producción (después de construir)


npm start
# o
yarn start

### Ejecutar linter

npm run lint
# o
yarn lint

## Estructura del proyecto

El proyecto sigue la estructura estándar de Next.js App Router:

- `app/` - Contiene las páginas y componentes de la aplicación
- `components/` - Componentes reutilizables
- `public/` - Archivos estáticos como imágenes


## Solución de problemas comunes

### Error: No se pueden encontrar módulos

Si ves errores relacionados con módulos que no se encuentran, intenta:

```shellscript
npm install
# o
yarn install
```

### Problemas con las imágenes de placeholder

El proyecto usa imágenes de placeholder. Si tienes problemas con ellas, asegúrate de que las URLs en el código sean accesibles o reemplázalas con tus propias imágenes.

### Problemas con las fuentes de Google

El proyecto utiliza fuentes de Google (Inter, Pacifico, Poppins). Asegúrate de tener conexión a internet para que estas fuentes se carguen correctamente.

### Puerto 3000 ya en uso

Si el puerto 3000 ya está en uso, puedes especificar un puerto diferente:

```shellscript
npm run dev -- -p 3001
# o
yarn dev -p 3001
```

¡Listo! Con estos pasos deberías poder ejecutar "Los dulces de Lu" en tu computadora local sin problemas. Si tienes alguna duda o encuentras algún problema específico, no dudes en preguntar.![image](https://github.com/user-attachments/assets/ea29a4c3-e55d-4678-8595-5a8b43ef464b)

