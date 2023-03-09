import { ITaskTrackerRepository } from "../../repositores/ITaskTrackerRepository";
import { TaskTrackerController } from "./TaskTrackerController";
import { CreateTaskTrackerDTO } from "./CreateTaskTrackerDTO";
import { TaskTrackerUseCase } from "./TaskTrackerUseCase";
import { PostgresTaskTrackerRepository } from "../../repositores/implementations/PostgresTaskTrackerRepo";
import { Task } from "../../entities/TaskTracker";
import request from "supertest";
import { app } from "../../app";

describe("TaskTrackerController tests", () => {
    let taskTrackerRepository: ITaskTrackerRepository;
    let taskTrackerUseCase: TaskTrackerUseCase;
    let taskTrackerController: TaskTrackerController;
    let taskMock: Task;

    beforeAll(() => {
        taskTrackerRepository = new PostgresTaskTrackerRepository();
        taskTrackerUseCase = new TaskTrackerUseCase(taskTrackerRepository);
        taskTrackerController = new TaskTrackerController(taskTrackerUseCase);
        taskMock = {
            done: false,
            name: "Study test with jest",
            id: "12"
        }
    });

    it("should return a 201 create status", async () => {
        const createTaskDTO: CreateTaskTrackerDTO = {
            task: taskMock,
            weekday: "monday",
            userId: "12"
        }

        await request(app)
            .post('/taskTracker')
            .send(createTaskDTO)
            .expect(201);
    })
});

