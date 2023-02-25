import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import { taskTrackerController } from "./useCases/TaskTracker";

const router = Router();

router.post('/users', (resquest, response) => {
    return createUserController.handleCreateUser(resquest, response);
});

router.get('/task', (request, response) => {
    return taskTrackerController.handleGetTask(request, response);
})

router.post('/taskTracker', (request, response) => {
    return taskTrackerController.handleInsertTaskTracker(request, response);
})

router.post('/task', (request, response) => {
    return taskTrackerController.handleInsertTask(request, response);
});

router.put('/task', (request, response) => {
    return taskTrackerController.handleUpdateTask(request, response);
});

router.delete('/task', (request, response) => {
    return taskTrackerController.handleDeleteTask(request, response);
});

export { router }