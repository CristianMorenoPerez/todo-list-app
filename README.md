# Todo List Application

Una aplicación moderna de gestión de tareas construida con Next.js, TypeScript y Tailwind CSS.

## Características

- Crear, leer, actualizar y eliminar tareas
- Marcar tareas como completadas
- Diseño responsive para todos los dispositivos
- Soporte offline con almacenamiento local
- Interfaz de usuario elegante con animaciones y transiciones
- Notificaciones toast para feedback al usuario

## Capturas de pantalla

![Todo List App](/public/desktop.png)![Todo List App](/public/form.png)

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

```bash
# Clonar el repositorio
git clone https://github.com/CristianMorenoPerez/todo-list-app.git

# Navegar al directorio del proyecto
cd todo-list-app

# Instalar dependencias
npm install -f
```

## Cofiguracion del entorno

Crea un archivo .env.local en el directorio raíz con el siguiente contenido:

```bash
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com/todos
```

## Ejecutar la aplicacion

```bash
# Modo desarrollo
npm run dev

# testing
npm run test

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Características

- Next.js - Framework de React para aplicaciones renderizadas en servidor
- TypeScript - Verificación de tipos estática
- Tailwind CSS - Framework CSS utility-first
- Sonner - Notificaciones toast
- Axios - Cliente HTTP
- JSONPlaceholder - API REST falsa online para pruebas

## Estructura del proyecto

```bash
todo-list/
├── public/           # Archivos estáticos
├── src/              # Código fuente
│   ├── app/          # Directorio app de Next.js
│   │   ├── home/        # Home pagina principal para ver las tareas
│   │   ├── components/  # Componentes React
│   │   ├── interfaces/  # Interfaces TypeScript
│   │   └── page.tsx     # Componente de página principal
│   └── services/     # Servicios API
├── .env.local        # Variables de entorno
├── next.config.js    # Configuración de Next.js
├── package.json      # Dependencias del proyecto
└── README.md         # Documentación del proyecto
```
