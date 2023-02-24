import { PostgresTaskTrackerRepository } from "../../repositores/implementations/PostgresTaskTrackerRepo";
import { TaskTrackerController } from "./TaskTrackerController";
import { TaskTrackerUseCase } from "./TaskTrackerUseCase";

const taskTrackerRepo = new PostgresTaskTrackerRepository;
const taskTrackerUseCase = new TaskTrackerUseCase(taskTrackerRepo);
const taskTrackerController = new TaskTrackerController(taskTrackerUseCase);

export { taskTrackerController, taskTrackerUseCase }