"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Clock, Save, Trash2, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task } from "@/app/interfaces";
import { updateTodoInApi } from "@/store/taskSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Input } from "./ui/input";

interface TaskCardProps {
  completed: boolean;
  task: Task;
  onDelete?: () => void;
}

export default function TaskCard({
  completed = false,
  onDelete,
  task,
}: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isCompleted, setIsCompleted] = useState(completed);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleComplete = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    dispatch(updateTodoInApi({ ...task, completed: newStatus }));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    setIsDeleting(true);
    onDelete?.();
  };

  const handleCardClick = () => {
    if (!showConfirmation && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveTitle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editedTitle.trim() !== "") {
      setIsSaving(true);

      dispatch(updateTodoInApi({ ...task, title: editedTitle }))
        .then(() => {
          setIsSaving(false);
          setIsEditing(false);
        })
        .catch(() => {
          setIsSaving(false);
        });
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        editedTitle.length,
        editedTitle.length
      );
    }
  }, [isEditing, editedTitle]);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out overflow-hidden max-w-md w-full",
        isDeleting && "opacity-0 translate-x-full h-0 my-0"
      )}
    >
      <Card
        onClick={handleCardClick}
        className="w-full  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-l-4 border-l-yellow-500"
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            {!isEditing ? (
              <CardTitle className="text-xl font-medium line-clamp-1">
                {task.title}
              </CardTitle>
            ) : (
              <div className="w-full">
                <Input
                  ref={inputRef}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-xl font-medium"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleSaveTitle}
                  >
                    {isSaving ? (
                      <>
                        <span className="animate-pulse">Guardando...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3 w-3" /> Save
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    <X className="h-3 w-3" /> Cancel
                  </Button>
                </div>
              </div>
            )}
            {!showConfirmation && !isEditing && (
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 ml-2 flex-shrink-0"
                onClick={handleDeleteClick}
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!showConfirmation ? (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {isCompleted ? "Completada" : "Pendiente"}
              </span>
            </div>
          ) : (
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <p className="text-sm font-medium text-red-800 mb-3">
                Estas seguro de querer eliminar esta tarea?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={handleConfirmDelete}
                >
                  Eliminar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        {!showConfirmation && !isEditing && (
          <CardFooter className="flex gap-2">
            <Button
              variant={isCompleted ? "outline" : "default"}
              className={cn(
                "flex-1 transition-all",
                isCompleted
                  ? "hover:bg-red-50 hover:text-red-600"
                  : "hover:bg-green-500"
              )}
              onClick={(e) => handleToggleComplete(e, task)}
            >
              {isCompleted
                ? "Marcar como incompleta"
                : "Marcar como completada"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
