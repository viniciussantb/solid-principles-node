import { uuid } from "uuidv4";

export interface Task {
    id?: string;
    name: string;
    done: boolean;
}

export class TaskTracker {
    public readonly id: string;
    public readonly userId: string;

    public monday: Task[] = [];
    public tuesday: Task[] = [];
    public wednesday: Task[] = [];
    public thursday: Task[] = [];
    public friday: Task[] = [];

    constructor(userId: string, id?: string) {
        this.userId = userId;

        if(!id) {
            this.id = uuid();
        }
    }
}