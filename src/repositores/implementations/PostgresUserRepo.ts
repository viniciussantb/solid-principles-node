import { uuid } from "uuidv4";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";

export class PostgresUserRepository implements IUsersRepository {
    private users: User[] = [{
        id: "12",
        name: "sweetness",
        email: "sweetness@email.com",
        password: "sweetness123"
    }];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}