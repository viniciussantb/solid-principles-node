import { ITaskTrackerRepository } from "../../repositores/ITaskTrackerRepository";
import { TaskTrackerController } from "./TaskTrackerController";
import { TaskTrackerUseCase } from "./TaskTrackerUseCase";
import { PostgresTaskTrackerRepository } from "../../repositores/implementations/PostgresTaskTrackerRepo";
import { Task } from "../../entities/TaskTracker";
import request from "supertest";
import { app } from "../../app";
import { CreateTaskDTO } from "./CreateTaskDTO";

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
        }
    });

    it("should return a 201 create status", async () => {
        const createTaskDTO: CreateTaskDTO = {
            name: "Study test with jest and supertest",
            weekday: "monday",
            userId: "12"
        }

        await request(app)
            .post('/task')
            .send(createTaskDTO)
            .expect(201);
    });

    it("should return a 400 error status", async () => {
        const taskDTO: CreateTaskDTO = {
            name: "Study test with jest and supertest",
            weekday: "monday",
            userId: ""
        }

        await request(app)
            .post('/task')
            .send(taskDTO)
            .expect(400);
    });

    it("should return a taskTracker of a user", async () => {
        await request(app)
            .get('/task?userId=12')
            .expect(200);
    });

    
});

