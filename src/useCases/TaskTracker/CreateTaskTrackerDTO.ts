import { Task } from "../../entities/TaskTracker";

export interface CreateTaskTrackerDTO {
    userId: string;
    weekday: string;
    task: Task;
}