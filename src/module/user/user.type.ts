import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class User {
    @ApiProperty({
        name: "id",
        description: "id of the user",
        type: "integer",
        required: false,
        example: 10
    })
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({
        name: "firstName",
        description: "first name of the user",
        type: "string",
        required: false,
        example: "John"
    })
    readonly firstName: string;

    @ApiProperty({
        name: "lastName",
        description: "last name of the user",
        type: "string",
        required: false,
        example: "James"
    })
    readonly lastName: string;

    @ApiProperty({
        name: "email",
        description: "email of the user",
        type: "string",
        required: false,
        example: "john@email.com"
    })
    readonly email: string;

    @ApiProperty({
        name: "password",
        description: "password of the user",
        type: "string",
        required: false,
        example: "12345"
    })
    readonly password: string;

    @ApiProperty({
        name: "medalPoint",
        description: "medal point of the user",
        type: "integer",
        required: false,
        example: 10
    })
    readonly medalPoint: number;
};

export class CreateUserDTO extends OmitType(User, ["id"]) {};