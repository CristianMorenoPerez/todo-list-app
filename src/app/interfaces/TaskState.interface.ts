import { FilterState } from "./Filter-state.interface";
import { Task } from "./Task.interface";

export interface TaskState {
    tasks: Task[];
    filters: FilterState;
}