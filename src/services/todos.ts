import axios from 'axios';
import { Task } from '@/app/interfaces/Task.interface';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com/todos';

// Crear una instancia de axios con configuración base
const todoApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para guardar tareas en localStorage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Función para obtener tareas de localStorage
const getTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Obtener todos los todos
export const fetchTodos = async (): Promise<Task[]> => {
  // Show loading toast
  const toastId = toast.loading("Cargando tareas...");

  try {
    // Verificar si ya tenemos tareas en localStorage
    const localTasks = getTasksFromLocalStorage();
    if (localTasks.length > 0) {
      // Dismiss loading toast
      toast.dismiss(toastId);
      return localTasks;
    }

    // Si no hay tareas locales, obtenerlas de la API
    const response = await todoApi.get('');
    const apiTasks = response.data.map((todo: Task) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId || 1
    }));

    // Guardar las tareas de la API en localStorage
    saveTasksToLocalStorage(apiTasks);

    // Dismiss loading toast
    toast.dismiss(toastId);

    return apiTasks;
  } catch (error) {
    // Dismiss loading toast in case of error
    toast.dismiss(toastId);

    console.error('Error fetching todos:', error);
    // Verificar si hay datos en localStorage como fallback
    const localTasks = getTasksFromLocalStorage();
    if (localTasks.length > 0) {
      console.log('Usando datos locales como fallback');
      return localTasks;
    }

    toast.error('Error ', {
      description: 'Error al cargar las tareas. Verifica tu conexión a internet.',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    // Si no hay datos locales, propagar el error
    throw new Error('No se pudieron cargar las tareas. Verifica tu conexión a internet.');
  }
};
// Crear un nuevo todo
export const createTodo = async (task: Omit<Task, "id">): Promise<Task> => {
  // Show loading toast and store its ID
  const toastId = toast.loading("Guardando Tarea");

  try {
    // Hacer la solicitud a la API para simular el proceso
    const response = await todoApi.post('', {
      title: task.title,
      completed: task.completed || false,
      userId: task.userId || 1,
    });

    // Crear una nueva tarea con ID único
    const newTask: Task = {
      ...response.data,
      id: Date.now(), // Usar timestamp como ID único
    };

    // Obtener tareas actuales y añadir la nueva
    const currentTasks = getTasksFromLocalStorage();
    const updatedTasks = [...currentTasks, newTask];

    // Guardar en localStorage
    saveTasksToLocalStorage(updatedTasks);

    // Dismiss loading toast first
    toast.dismiss(toastId);

    // Then show success toast
    setTimeout(() => {
      toast.success('Tarea creada exitosamente', {
        description: 'La tarea se creó correctamente.',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }, 100);

    return newTask;
  } catch (error) {
    // Dismiss loading toast in case of error
    toast.dismiss(toastId);

    console.error('Error creating todo:', error);

    // Show error toast
    toast.error('Error ', {
      description: 'No se pudo crear la tarea',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    throw error;
  }
};
// Actualizar un todo existente
export const updateTodo = async (task: Task): Promise<Task> => {
  try {
    // Obtener tareas actuales
    const currentTasks = getTasksFromLocalStorage();

    const existingTask = currentTasks.find(t => t.id === task.id);

    if (existingTask) {
      // Show loading toast
      const toastId = toast.loading("Actualizando tarea...");

      try {
        if (typeof task.id === 'number' && task.id < 1000) {
          await todoApi.put(`/${task.id}`, {
            id: task.id,
            title: task.title,
            completed: task.completed,
            userId: task.userId || 1,
          });
        }

        // Actualizar la tarea específica localmente
        const updatedTasks = currentTasks.map((t) =>
          t.id === task.id ? task : t
        );

        // Guardar en localStorage
        saveTasksToLocalStorage(updatedTasks);

        // Dismiss loading toast
        toast.dismiss(toastId);

        // Show success toast with a small delay
        setTimeout(() => {
          toast.success('Tarea actualizada exitosamente', {
            description: 'La tarea se actualizó correctamente.',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }, 100);

        return task;
      } catch (apiError) {
        // Dismiss loading toast if API call fails
        toast.dismiss(toastId);

        console.log('No se pudo actualizar en la API, continuando con actualización local', apiError);

        // Still update locally
        const updatedTasks = currentTasks.map((t) =>
          t.id === task.id ? task : t
        );
        saveTasksToLocalStorage(updatedTasks);

        // Show success toast with a small delay
        setTimeout(() => {
          toast.success('Tarea actualizada localmente', {
            description: 'La tarea se actualizó en el almacenamiento local.',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }, 100);

        return task;
      }
    } else {
      toast.error('Error ', {
        description: 'Tarea no encontrada',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      throw new Error('Tarea no encontrada');
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
// Eliminar un todo
// Eliminar un todo
export const deleteTodo = async (id: number): Promise<number> => {
  // Show loading toast
  const toastId = toast.loading("Eliminando tarea...");

  try {
    // Obtener tareas actuales
    const currentTasks = getTasksFromLocalStorage();

    // Verificar si la tarea existe en nuestro almacenamiento local
    const existingTask = currentTasks.find(t => t.id === id);

    if (existingTask) {
      try {
        // Intentar hacer la solicitud a la API solo si parece ser un ID válido de la API
        if (id < 1000) {
          await todoApi.delete(`/${id}`);

        }
      } catch (apiError) {
        // Ignorar errores de la API, continuamos con la eliminación local
        console.log('No se pudo eliminar en la API, continuando con eliminación local', apiError);
      }

      // Filtrar la tarea a eliminar
      const updatedTasks = currentTasks.filter((t) => t.id !== id);

      // Guardar en localStorage
      saveTasksToLocalStorage(updatedTasks);

      // Dismiss loading toast
      toast.dismiss(toastId);

      // Show success toast with a small delay
      setTimeout(() => {
        toast.success('Tarea eliminada exitosamente', {
          description: 'La tarea se eliminó correctamente.',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }, 100);

      return id;
    } else {
      // Dismiss loading toast
      toast.dismiss(toastId);

      toast.error('Error ', {
        description: 'Tarea no encontrada',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      throw new Error('Tarea no encontrada');
    }
  } catch (error) {
    // Dismiss loading toast in case of error
    toast.dismiss(toastId);

    console.error('Error deleting todo:', error);
    throw error;
  }
};


// Obtener un todo específico por ID
export const getTodoById = async (id: string | number): Promise<Task | undefined> => {
  try {
    // Obtener tareas de localStorage
    const tasks = getTasksFromLocalStorage();

    // Buscar la tarea por ID
    const task = tasks.find((t) => t.id == id);

    if (!task) {
      // Si no se encuentra localmente, intentar obtenerla de la API
      const response = await todoApi.get(`/${id}`);
      const apiTask = response.data;

      return {
        id: apiTask.id,
        title: apiTask.title,
        completed: apiTask.completed,
        userId: apiTask.userId
      };
    }

    return task;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};