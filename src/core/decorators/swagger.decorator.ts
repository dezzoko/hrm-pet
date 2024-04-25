import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiResponseOptions,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiQueryOptions,
  ApiQuery,
} from '@nestjs/swagger';

interface SwaggerDecoratorParams {
  apiOperation?: Partial<ApiOperationOptions>;
  apiResponse?: ApiResponseOptions;
  apiParams?: ApiParamOptions[];
  apiQueries?: ApiQueryOptions[];
}

export function SwaggerDecorator(params: SwaggerDecoratorParams) {
  const { apiOperation, apiResponse, apiParams, apiQueries } = params;
  const resultDecorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  if (apiOperation) {
    resultDecorators.push(ApiOperation(apiOperation));
  }

  if (apiResponse) {
    resultDecorators.push(ApiResponse(apiResponse));
  }

  if (apiParams?.length > 0) {
    resultDecorators.concat(apiParams.map((apiParam) => ApiParam(apiParam)));
  }
  if (apiQueries?.length > 0) {
    resultDecorators.concat(apiQueries.map((apiQuery) => ApiQuery(apiQuery)));
  }

  return applyDecorators(...resultDecorators);
}
