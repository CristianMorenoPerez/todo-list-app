import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, FilterState } from "../app/interfaces";

import {
    createTodo,
    updateTodo,
    deleteTodo,
    fetchTodos,
    //   getTodoById,
} from "../services/todos";

// Async thunks
export const fetchTasksThunk = createAsyncThunk(
    "tasks/fetchTodos",
    async () => {
        return await fetchTodos();
    }
);

export const addTodoToApi = createAsyncThunk(
    "tasks/addTodoToApi",
    async (task: Omit<Task, "id">) => {

        return await createTodo(task);
    }
);

export const updateTodoInApi = createAsyncThunk(
    "tasks/updateTodoInApi",
    async (task: Task) => {
        return await updateTodo(task);
    }
);

export const deleteTodoFromApi = createAsyncThunk(
    "tasks/deleteTodoFromApi",
    async (id: number) => {
        await deleteTodo(id);
        return id;
    }
);



interface TaskState {
    tasks: Task[];
    filters: FilterState;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const loadFiltersFromLocalStorage = (): FilterState => {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== "undefined") {
        const savedFilters = localStorage.getItem("filters");
        return savedFilters
            ? JSON.parse(savedFilters)
            : {
                status: "all",
                searchTerm: "",
            };
    }

    // Valor por defecto si estamos en el servidor
    return {
        status: "all",
        searchTerm: "",
    };
};

const initialState: TaskState = {
    tasks: [],
    filters: loadFiltersFromLocalStorage(),
    status: 'idle',
    error: null
};

interface OpenDrawe {
    value: boolean;
}

const openDrawer: OpenDrawe = {
    value: false,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Mantenemos solo los reducers necesarios
        setFilter: (state, action: PayloadAction<FilterState>) => {
            state.filters = action.payload;
            localStorage.setItem("filters", JSON.stringify(action.payload));
        },
    },

    extraReducers(builder) {
        builder
            // Manejar fetchTasksThunk
            .addCase(fetchTasksThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar las tareas';
            })

            // Manejar addTodoToApi
            .addCase(addTodoToApi.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addTodoToApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(addTodoToApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al añadir la tarea';
            })

            // Manejar updateTodoInApi
            .addCase(updateTodoInApi.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateTodoInApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.tasks.findIndex(
                    (task: Task) => task.id === action.payload.id
                );
                if (index !== -1) {

                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTodoInApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al actualizar la tarea';
            })

            // Manejar deleteTodoFromApi
            .addCase(deleteTodoFromApi.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteTodoFromApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = state.tasks.filter(
                    (task: Task) => task.id !== action.payload
                );
            })
            .addCase(deleteTodoFromApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al eliminar la tarea';
            });
    },
});

const drawerSlice = createSlice({
    name: "drawer",
    initialState: openDrawer,
    reducers: {
        openAndClose: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { setFilter } = taskSlice.actions;
export const { openAndClose } = drawerSlice.actions;

export const taskReducer = taskSlice.reducer;
export const drawerReducer = drawerSlice.reducer;
