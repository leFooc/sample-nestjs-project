import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Patch, Put, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { App, CreateAppDTO } from "./app.type";
import { BadRequestResponse, NotFoundResponse } from "@common";

@ApiTags("app")
@ApiExtraModels(App, CreateAppDTO)
@Controller("app")
export class AppController {
    constructor(
        private readonly appService: AppService
    ) {};


    @ApiOkResponse({
        description: "Successful operation",
        isArray: true,
        schema: {
            type: "array",
            items: {
                $ref: getSchemaPath(App)
            }
        }
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.appService.findAll();
    }

    @ApiParam({
        name: "id",
        description: "Id of the app",
        type: "string",
        example: "1"
    })
    @ApiOkResponse({
        description: "Successful operation",
        schema: {
            $ref: getSchemaPath(App)
        }
    })
    @BadRequestResponse({message: "Bad request", description: "Invalid Id"})
    @NotFoundResponse({message: "App not found", description: "Not found"})
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getById(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.appService.findById(id);
    };

    @ApiBody({
        description: "Multiple apps to create or update in the system",
        schema: {
            type: "array",
            items: {
                $ref: getSchemaPath(CreateAppDTO)
            }
        }
    })
    @ApiOkResponse({description: "successful operation"})
    @Put()
    @HttpCode(HttpStatus.OK) 
    upsert(
        @Body(new ParseArrayPipe({
            items: CreateAppDTO,
            transformOptions: {enableImplicitConversion: true}
        })) data: CreateAppDTO[]
    ) {
        return this.appService.upsert(data);
    };

    @ApiParam({
        name: "id",
        description: "Id of the app",
        type: "string",
        example: "1"
    })
    @ApiBody({
        description: "data to update the app",
        schema: {
            $ref: getSchemaPath(CreateAppDTO)
        }
    })
    @ApiOkResponse({description: "Successful operation"})
    @BadRequestResponse({message: "Bad request", description: "Invalid Id"})
    @NotFoundResponse({message: "App not found", description: "Not found"})
    @Patch()
    @HttpCode(HttpStatus.OK)
    updateById(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe({
            transformOptions: {enableImplicitConversion: true}
        })) data: CreateAppDTO
    ) {
        return this.appService.updateById(id, data);
    };
};