import { Request, Response } from "express";
import { uuid } from "uuidv4";
import { CreateTaskTrackerDTO } from "./CreateTaskTrackerDTO";
import { TaskTrackerDTO } from "./TaskTrackerDTO";
import { TaskTrackerUseCase } from "./TaskTrackerUseCase";

export class TaskTrackerController {
    constructor(
        private taskTrackerUseCase: TaskTrackerUseCase
    ) {}

    async handleInsertTask(request: Request, response: Response): Promise<Response> {
        const { userId, weekday, name } = request.body;

        try {
            const createTaskTrackerDTO: CreateTaskTrackerDTO = {
                userId,
                weekday,
                task: {
                    id: uuid(),
                    name,
                    done: false
                }
            }

            await this.taskTrackerUseCase.insertTask(createTaskTrackerDTO);

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err || 'bad request'
            });
        }
    }

    async handleUpdateTask(request: Request, response: Response): Promise<Response> {
        const { userId, weekday, taskId } = request.body;

        try {
            const taskTrackerDTO: TaskTrackerDTO = {
                userId,
                weekday,
                taskId
            }

            await this.taskTrackerUseCase.updateTask(taskTrackerDTO);

            return response.status(204).send();
        } catch (err) {
            return response.status(400).json({
                message: err || 'bad request'
            });
        }
    }

    async handleDeleteTask(request: Request, response: Response): Promise<Response> {
        const { userId, weekday, taskId } = request.body;

        try {
            const taskTrackerDTO: TaskTrackerDTO = {
                userId,
                weekday,
                taskId
            }

            await this.taskTrackerUseCase.deleteTask(taskTrackerDTO);

            return response.status(202).send();
        } catch (err) {
            return response.status(400).json({
                message: err || 'bad request'
            });
        }
    }
}