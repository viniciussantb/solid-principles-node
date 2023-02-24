import { Task, TaskTracker } from "../entities/TaskTracker";

export interface ITaskTrackerRepository {
    findByUserId(userId: string): Promise<TaskTracker>;
    save(userId: string): Promise<string>;
    insertTask(userId: string, weekday: string, task: Task): Promise<string>;
    deleteTask(userId: string, weekday: string, taskId: string): Promise<void>;
    updateTask(userId: string, weekday: string, taskId: string): Promise<void>;
}