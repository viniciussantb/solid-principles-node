import { Request, Response } from "express";
import { uuid } from "uuidv4";
import { TaskTracker } from "../../entities/TaskTracker";
import { CreateTaskTrackerDTO } from "./CreateTaskTrackerDTO";
import { TaskTrackerDTO } from "./TaskTrackerDTO";
import { TaskTrackerUseCase } from "./TaskTrackerUseCase";

export class TaskTrackerController {
    constructor(
        private taskTrackerUseCase: TaskTrackerUseCase
    ) {}

    async handleGetTask(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.query.userId;
            const taskTracker = await this.taskTrackerUseCase.getTask(userId.toString());

            return response.status(200).send(taskTracker);
        } catch (err) {
            return response.status(500).json({
                message: err || 'Unexpected Error'
            });
        }
    }

    async handleInsertTaskTracker(request: Request, response: Response): Promise<Response> {
        const { userId } = request.body

        try {
            await this.taskTrackerUseCase.insertTaskTracker(userId);
            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err || 'Bad Request'
            });
        }
    }

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