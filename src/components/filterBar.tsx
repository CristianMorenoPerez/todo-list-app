"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setFilter } from "@/store/taskSlice";
import { FilterState } from "@/app/interfaces";
import { Input } from "./ui/input";
import { Filter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.tasks.filters);

  const handleFilterChange = (filterUpdate: Partial<FilterState>) => {
    dispatch(setFilter({ ...filters, ...filterUpdate }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 container">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar tarea..."
          className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          value={filters.searchTerm || ""}
          onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            value={filters.status}
            onChange={(value) =>
              handleFilterChange({
                status: value as unknown as "all" | "completed" | "pending",
              })
            }
          >
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {filters.status === "all"
                ? "Todas las tareas"
                : filters.status === "completed"
                ? "Completadas"
                : "Pendientes"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleFilterChange({ status: "all" })}
            >
              Todas las tareas
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterChange({ status: "pending" })}
            >
              Pendientes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterChange({ status: "completed" })}
            >
              Completadas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;
