import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";

export class App {
    @ApiPropertyOptional({
        name: "id",
        description: "id of the app",
        type: "integer",
        example: 1
    })
    readonly id: number;

    @ApiPropertyOptional({
        name: "name",
        description: "name of the app",
        type: "string",
        example: "TikTok"
    })
    readonly name: string;

    @ApiPropertyOptional({
        name: "timeLimit",
        description: "usage limit of the app",
        type: "number",
        example: 3600
    })
    readonly timeLimit: number;

    @ApiPropertyOptional({
        name: "logo",
        description: "url to logo of the app",
        type: "string",
        example: "https://google.com"
    })
    readonly logo: string;
};

export class CreateAppDTO extends OmitType(App, ["id"]) {};