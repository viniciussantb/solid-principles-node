import { IMailProvider } from "../../providers/IMailProvider";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "../../repositores/implementations/PostgresUserRepo";
import { IUsersRepository } from "../../repositores/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
    let usersRepository: IUsersRepository;
    let createUserUseCase: CreateUserUseCase;
    let spyMailProvider: IMailProvider;

    beforeAll(() => {
        usersRepository = new PostgresUserRepository();
        spyMailProvider = new MailtrapMailProvider();
        createUserUseCase = new CreateUserUseCase(
            usersRepository,
            spyMailProvider
        );
    });

    it("should create a user", async () => {
        const userDto : ICreateUserRequestDTO = {
            name: "José",
            email: "jose@email.com",
            password: "jose123",
        }

        const user = await createUserUseCase.execute(userDto);

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name', 'José');
    });
});