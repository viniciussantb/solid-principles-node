import { TaskTracker } from "../../entities/TaskTracker";
import { ITaskTrackerRepository } from "../../repositores/ITaskTrackerRepository";
import { IUsersRepository } from "../../repositores/IUserRepository";
import { CreateTaskTrackerDTO } from "./CreateTaskTrackerDTO";
import { TaskTrackerDTO } from "./TaskTrackerDTO";

export class TaskTrackerUseCase {
    constructor(
        private taskTrackerRepository: ITaskTrackerRepository,
    ) {}

    async getTask(userId: string): Promise<TaskTracker> {
        return await this.taskTrackerRepository.findByUserId(userId);
    }

    async insertTaskTracker(userId: string) {
        const taskId = await this.taskTrackerRepository.save(userId);

        if (taskId === 'user not found...') {
            throw new Error('User not found.');
        }
    }

    async insertTask(data: CreateTaskTrackerDTO) {
        const { userId, weekday, task } = data;
        const taskId = await this.taskTrackerRepository.insertTask(userId, weekday, task);

        if (taskId === 'user not found...') {
            throw new Error('User not found.');
        }
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