import { TaskTracker } from "../../entities/TaskTracker";
import { ITaskTrackerRepository } from "../../repositores/ITaskTrackerRepository";
import { CreateTaskTrackerDTO } from "./CreateTaskTrackerDTO";
import { TaskTrackerDTO } from "./TaskTrackerDTO";

export class TaskTrackerUseCase {
    constructor(
        private taskTrackerRepository: ITaskTrackerRepository
    ) {}

    async getTask(userId: string): Promise<TaskTracker> {
        return await this.taskTrackerRepository.findByUserId(userId);
    }

    async insertTaskTracker(userId: string) {
        await this.taskTrackerRepository.save(userId);
    }

    async insertTask(data: CreateTaskTrackerDTO) {
        const { userId, weekday, task } = data;
        await this.taskTrackerRepository.insertTask(userId, weekday, task);
    }

    async deleteTask(data: TaskTrackerDTO) {
        const { userId, weekday, taskId } = data;

        await this.taskTrackerRepository.deleteTask(userId, weekday, taskId);
    }

    async updateTask(data: TaskTrackerDTO) {
        const { userId, weekday, taskId } = data;

        await this.taskTrackerRepository.updateTask(userId, weekday, taskId);
    }
}