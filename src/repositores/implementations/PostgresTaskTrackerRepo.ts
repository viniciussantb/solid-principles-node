import { Task, TaskTracker } from "../../entities/TaskTracker";
import { ITaskTrackerRepository } from "../ITaskTrackerRepository";

export class PostgresTaskTrackerRepository implements ITaskTrackerRepository {
    private tasksTracker: TaskTracker[] = [{
        id: "12",
        userId: "12",
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    }];

    async findByUserId(userId: string): Promise<TaskTracker> {
        const userTaskTracker = this.tasksTracker.find(task => task.userId === userId);
        return userTaskTracker;
    }

    async save(userId: string): Promise<string> {
        const taskTracker = new TaskTracker(userId);
        
        this.tasksTracker.push(taskTracker);
        return taskTracker.id;
    }

    async insertTask(userId: string, weekday: string, task: Task): Promise<string> {
        this.tasksTracker.find(taskTracker => {
            if (taskTracker.userId === userId) {         
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
        })
        return 'user not found...';
    }

    async deleteTask(userId: string, weekday: string, taskId: string): Promise<void> {
        this.tasksTracker.find(taskTracker => {
            if (taskTracker.userId === userId) {
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
        });

    }

    async updateTask(userId: string, weekday: string, taskId: string): Promise<void> {
        this.tasksTracker.find((taskTracker) => {
            if (taskTracker.userId === userId) {
                switch (weekday) {
                    case "monday":
                        taskTracker.monday.filter(task => {
                            if(task.id === taskId) {
                                task.done = !task.done;
                            }
                        })
                        
                        break
        
                    case "tuesday":
                        taskTracker.tuesday.filter(task => {
                            if(task.id === taskId) {
                                task.done = !task.done;
                            }
                        })
                        break
                
                    case "wednesday":
                        taskTracker.wednesday.filter(task => {
                            if(task.id === taskId) {
                                task.done = !task.done;
                            }
                        })
                        break
        
                    case "thursday":
                        taskTracker.thursday.filter(task => {
                            if(task.id === taskId) {
                                task.done = !task.done;
                            }
                        })
                        break
        
                    case "friday":
                        taskTracker.friday.filter(task => {
                            if(task.id === taskId) {
                                task.done = !task.done;
                            }
                        })
                        break
                    default:
                        break;
                }
            }
        });
    }
}