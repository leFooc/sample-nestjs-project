import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO, User } from "./user.type";

@Injectable()
export class UserService{
    private repos: UserRepository
    constructor(
    ) {
        this.repos = new UserRepository();
    };

    public async findById(id: number) {
        const user = await this.repos.findById(id);
        if (!user) throw new NotFoundException("User not found");
        return user;
    };

    public create(data: CreateUserDTO) {
        return this.repos.create(data);
    };

    public async update(id: number, data: CreateUserDTO) {
        await this.findById(id);
        await this.repos.updateById(id, data);
    };

    public async delete(id: number) {
        await this.findById(id);
        await this.repos.deleteById(id);
    }
}