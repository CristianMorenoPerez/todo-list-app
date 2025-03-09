import { FilterState } from "./Filter-state.interface";
import { Task } from "./Task.interface";

export type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'EDIT_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'TOGGLE_COMPLETE'; payload: string }
    | { type: 'SET_FILTER'; payload: FilterState }
    | { type: 'SET_TASKS'; payload: Task[] };