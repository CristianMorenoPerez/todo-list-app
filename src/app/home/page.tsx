"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  deleteTodoFromApi,
  fetchTasksThunk,
  openAndClose,
} from "@/store/taskSlice";
import { Task } from "../interfaces";

import { DrawerComponent } from "@/components/drawerComponent";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormTask } from "./components/form";
import FilterBar from "@/components/filterBar";
import TaskCard from "@/components/task-card";
import { CheckCircle, Clock, FilterIcon, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const drawer = useSelector((state: RootState) => state.drawer);
  const { tasks, filters } = useSelector((state: RootState) => state.tasks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasksThunk()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const onOpenDrawer = () => dispatch(openAndClose(!drawer.value));

  const handleDeleteTask = (id: number) => dispatch(deleteTodoFromApi(id));

  // Calculate task counts
  const pendingTasksCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  const completedTasksCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const allTasksCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (filters.status !== "all") {
        if (filters.status === "completed" && !task.completed) return false;
        if (filters.status === "pending" && task.completed) return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return task.title.toLowerCase().includes(searchLower);
      }

      return true;
    });
  }, [tasks, filters]);

  if (isLoading) {
    return (
      <div className="container mt-[100px] text-center">Cargando tareas...</div>
    );
  }

  return (
    <div className="container mt-[100px] max-h-screen">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row text-center md:text-start md:justify-between p-4 gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-yellow-500">✨</span> ¡Controla tus tareas!{" "}
            <span className="text-yellow-500">✨</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Organiza, prioriza y sigue tu progreso de forma fácil y rápida.
            ¡Todo en un solo lugar!
          </p>
        </div>

        <Button
          data-testid="nueva"
          className="mt-4 md:mt-0 bg-primary"
          variant="default"
          onClick={onOpenDrawer}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 container">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pendientes
              </p>
              <p className="text-2xl font-bold">{pendingTasksCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completadas
              </p>
              <p className="text-2xl font-bold">{completedTasksCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <FilterIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total de tareas
              </p>
              <p className="text-2xl font-bold">{allTasksCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Barra de Filtros */}
      <FilterBar />

      <ScrollArea className="h-[600px] w-full  flex justify-center">
        {/* Lista de Tareas o Mensaje de No Tareas */}
        <div
          className={`flex flex-wrap items-center gap-4 container ${
            tasks.length >= 2 ? "justify-center" : "justify-start"
          }`}
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.title}
                task={task}
                completed={task.completed}
                onDelete={() => handleDeleteTask(task.id!)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full mt-10">
              <p className="text-lg font-medium">
                📭 No hay tareas que mostrar
              </p>
              <p className="text-sm">
                Intenta crear una nueva tarea o ajustar los filtros.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Drawer para Agregar Tareas */}
      <DrawerComponent>
        <FormTask />
      </DrawerComponent>
    </div>
  );
}
