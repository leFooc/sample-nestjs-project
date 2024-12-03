import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBadRequestResponse, ApiExtraModels, ApiNotFoundResponse } from "@nestjs/swagger";

export const BadRequestResponse = (options?: {
    message?: string,
    description?: string,
}) => {
    return applyDecorators(
        ApiBadRequestResponse({
            description: options.description ?? undefined,
            example: {
                statusCode: HttpStatus.BAD_REQUEST,
                error: "Bad Request",
                messsage: options.message ?? undefined
            },
        })
    );
};

export const NotFoundResponse = (options?: {
    message?: string,
    description?: string
}) => {
    return applyDecorators(
        ApiNotFoundResponse({
            description: options.description ?? undefined,
            example: {
                statusCode: HttpStatus.NOT_FOUND,
                error: "Not Found",
                message: options.message ?? undefined
            },
        })
    );
};