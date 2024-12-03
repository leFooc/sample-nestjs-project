import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDTO, User } from "./user.type";
import { NotFoundResponse, BadRequestResponse } from "@common/decorators";

@ApiTags("user")
@ApiExtraModels(User, CreateUserDTO)
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};

    @ApiParam({
        name: "id",
        description: "Id of the user",
        type: "string",
        example: "10"
    })
    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(User)
        },
    })
    @BadRequestResponse({message: "Bad Request", description: "Invalid id supplied"})
    @NotFoundResponse({message: "User not found", description: "User not found"})
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    get(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.userService.findById(id);
    };

    @ApiBody({
        schema: {
           $ref: getSchemaPath(CreateUserDTO)
        },
    })
    @ApiCreatedResponse({
        schema: {
            $ref: getSchemaPath(User)
        },
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body(new ValidationPipe({
            transformOptions: {enableImplicitConversion: true}
        })) data: CreateUserDTO
    ) {
        return this.userService.create(data);
    };

    @ApiParam({
        name: "id",
        description: "Id of the user",
        type: "string",
        example: "10"
    })
    @ApiBody({
        schema: {
            $ref: getSchemaPath(CreateUserDTO)
        }
    })
    @ApiOkResponse({description: "Successful operation"})
    @BadRequestResponse({message: "Bad request", description: "Invalid id supplied"})
    @NotFoundResponse({message: "User not found", description: "User not found"})
    @Put(":id")
    @HttpCode(HttpStatus.OK)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe({
            transformOptions: {enableImplicitConversion: true}
        })) data: CreateUserDTO  
    ) {
        return this.userService.update(id, data);
    };

    @ApiParam({
        name: "id",
        description: "Id of the user",
        type: "string",
        example: "10"
    })
    @ApiOkResponse({description: "Delete successfully"})
    @BadRequestResponse({message: "Bad request", description: "Invalid id supplied"})
    @NotFoundResponse({message: "User not found", description: "User not found"})
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    delete(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.userService.delete(id);
    };
};