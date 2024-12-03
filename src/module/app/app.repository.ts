import { Injectable } from "@nestjs/common";
import { App, CreateAppDTO } from "./app.type";

@Injectable()
export class AppRepository {
    private appList: App[] = [];
    static id = 3;

    constructor() {
        this.appList.push(
            {
                id: 1,
                name: "TikTok",
                timeLimit: 3600,
                logo: "https://google.com"
            },
            {
                id: 2,
                name: "Youtube",
                timeLimit: 7200,
                logo: "https://google.com"
            }
        );
    };

    public find(): Promise<App[]> {
        return new Promise((rs, rj) => {
            return this.appList;
        });
    };

    public findById(id: number): Promise<App | undefined> {
        return new Promise((rs, rj) => {
            const user = this.appList.find(user => user.id === id);
            rs(user);
        });
    };

    public upsert(data: CreateAppDTO[]): Promise<any> {
        return Promise.all(data.map(curApp => {
            return new Promise((rs, rj) => {
                const index = this.appList.findIndex(app => app.name === curApp.name);
                if (index === -1) {
                    const id = AppRepository.id;
                    this.appList.push({...curApp, id});
                    AppRepository.id++;
                } else {
                    this.appList.splice(index, 1, {...curApp, id: index});
                }
                rs(true);
            })
        }));
    };

    public updateById(id: number, data: CreateAppDTO): Promise<void> {
        return new Promise((rs, rj) => {
            const id = this.appList.findIndex(app => app.id === id);
            if (id === -1) rs();
            this.appList.splice(id, 1, {...data, id});
            rs();
        })
    }

    public deleteById(id: number): Promise<void> {
        return new Promise((rs, rj) => {
            const appId = this.appList.findIndex(user => user.id === id);
            if (appId === -1) rs();
            this.appList.splice(appId, 1);
            rs();
        });
    };
};