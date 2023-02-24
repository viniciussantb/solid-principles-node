import { uuid } from "uuidv4";
import { Task, TaskTracker } from "../../entities/TaskTracker";
import { ITaskTrackerRepository } from "../ITaskTrackerRepository";

export class PostgresTaskTrackerRepository implements ITaskTrackerRepository {
    private tasksTracker: TaskTracker[] =[];

    async findByUserId(userId: string): Promise<TaskTracker> {
        const taskTracker = this.tasksTracker.find(taskTracker => taskTracker.userId === userId);

        return taskTracker;
    }

    async save(userId: string): Promise<string> {
        const taskTracker = new TaskTracker(userId);

        this.tasksTracker.push(taskTracker);
        return taskTracker.id;
    }

    async insertTask(userId: string, weekday: string, task: Task): Promise<string> {
        const taskTracker = await this.findByUserId(userId);
        switch (weekday) {
            case "monday":
                taskTracker.monday.push(task);
                return task.id;

            case "tuesday":
                taskTracker.tuesday.push(task);
                return task.id;
        
            case "wednesday":
                taskTracker.wednesday.push(task);
                return task.id;

            case "thursday":
                taskTracker.thursday.push(task);
                return task.id;

            case "friday":
                taskTracker.friday.push(task);
                return task.id;
            default:
                break;
        }
    }

    async deleteTask(userId: string, weekday: string, taskId: string): Promise<void> {
        const taskTracker = await this.findByUserId(userId);

        switch (weekday) {
            case "monday":
                taskTracker.monday = taskTracker.monday.filter((task) => {
                    return task.id != taskId;
                });
                
                break

            case "tuesday":
                taskTracker.tuesday = taskTracker.tuesday.filter((task) => {
                    return task.id != taskId;
                });
                break
        
            case "wednesday":
                taskTracker.wednesday = taskTracker.wednesday.filter((task) => {
                    return task.id != taskId;
                });
                break

            case "thursday":
                taskTracker.thursday = taskTracker.thursday.filter((task) => {
                    return task.id != taskId;
                });
                break

            case "friday":
                taskTracker.friday = taskTracker.friday.filter((task) => {
                    return task.id != taskId;
                });
                break
            default:
                break;
        }
    }

    async updateTask(userId: string, weekday: string, taskId: string): Promise<void> {
                const taskTracker = await this.findByUserId(userId);

        switch (weekday) {
            case "monday":
                taskTracker.monday = taskTracker.monday.map((task) => {
                    const tasks = task.id !== taskId ? task : { id: taskId, name: task.name, done: !task.done }
                    return tasks;
                })
                
                break

            case "tuesday":
                taskTracker.tuesday = taskTracker.tuesday.map((task) => {
                    const tasks = task.id !== taskId ? task : { id: taskId, name: task.name, done: !task.done }
                    return tasks;
                })
                break
        
            case "wednesday":
                taskTracker.wednesday = taskTracker.wednesday.map((task) => {
                    const tasks = task.id !== taskId ? task : { id: taskId, name: task.name, done: !task.done }
                    return tasks;
                })
                break

            case "thursday":
                taskTracker.thursday = taskTracker.thursday.map((task) => {
                    const tasks = task.id !== taskId ? task : { id: taskId, name: task.name, done: !task.done }
                    return tasks;
                })
                break

            case "friday":
                taskTracker.friday = taskTracker.friday.map((task) => {
                    const tasks = task.id !== taskId ? task : { id: taskId, name: task.name, done: !task.done }
                    return tasks;
                })
                break
            default:
                break;
        }
    }
}