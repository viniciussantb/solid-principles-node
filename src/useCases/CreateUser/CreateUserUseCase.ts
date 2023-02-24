import { User } from "../../entities/User";
import { IMailProvider, IMessage } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositores/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private userRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute (data: ICreateUserRequestDTO) {
        const  userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User(data);
        const message: IMessage = {
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "App team",
                email: "team@app.com"
            },
            subject: "Welcome Mail",
            body: "<p>Welcome to our APP!</p>"
        }

        await this.userRepository.save(user);
        await this.mailProvider.sendMail(message);
    }
}