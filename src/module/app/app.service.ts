import { Injectable, NotFoundException } from "@nestjs/common";
import { AppRepository } from "./app.repository";
import { CreateAppDTO } from "./app.type";

@Injectable()
export class AppService {
    constructor(
        private readonly repos: AppRepository
    ) {};

    public findAll() {
        return this.repos.find();
    };

    public async findById(id: number) {
        const app = await this.repos.findById(id);
        if (!app) throw new NotFoundException("App not found");
        return app;
    };

    public async upsert(data: CreateAppDTO[]) {
        return await this.repos.upsert(data);
    };

    public async updateById(id: number, data: CreateAppDTO) {
        return await this.repos.updateById(id, data);
    };

    public async delete(id: number) {
        await this.findById(id);
        await this.repos.deleteById(id);
    };
};