import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresTaskTrackerRepository } from "../../repositores/implementations/PostgresTaskTrackerRepo";
import { PostgresUserRepository } from "../../repositores/implementations/PostgresUserRepo";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase }