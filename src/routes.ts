import { Router } from "express";

const router = Router();

router.post('/users', (resquest, response) => {
    return response.status(201).send();
});

export { router }