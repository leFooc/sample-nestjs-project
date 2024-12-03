import { Injectable } from "@nestjs/common";
import { CreateUserDTO, User } from "./user.type";

@Injectable()
export class UserRepository {
    private userList: User[] = [];
    static id: number = 3;

    constructor() {
        this.userList.push({
            id: 1,
            firstName: "dummy",
            lastName: "dummy",
            email: "dummy@email.com",
            password: "12345",
            medalPoint: 10
        },
        {
            id: 2,
            firstName: "dummy 2",
            lastName: "dummy 2",
            email: "dummy@email.com",
            password: "12345",
            medalPoint: 10
        });
    };

    public findAll(): Promise<User[]> {
        return new Promise((rs, rj) => {
            rs(this.userList);
        });
    };

    public findById(id: number): Promise<User | undefined> {
        return new Promise((rs, rj) => {
            const user = this.userList.find(user => user.id === id);
            rs(user);
        });
    };

    public create(data: CreateUserDTO): Promise<User> {
        return new Promise((rs, rj) => {
            const id = UserRepository.id;
            this.userList.push({...data, id});
            UserRepository.id++;
            rs(this.userList[id]);
        });
    };

    public updateById(id: number, data: CreateUserDTO): Promise<void> {
        return new Promise((rs, rj) => {
            const userId = this.userList.findIndex(user => user.id === id);
            if (userId === -1) rs();
            this.userList.splice(userId, 1, {...data, id: userId});
            rs();
        });
    };

    public deleteById(id: number): Promise<void> {
        return new Promise((rs, rj) => {
            const userId = this.userList.findIndex(user => user.id === id);
            this.userList.splice(userId, 1);
            rs();
        });
    };
}