import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {<FTName | capitalize>Service} from '../../application'
import { PaginationParams } from 'src/core';
import { Create<FTName | Capitalize>Input, Update<FTName | Capitalize>Input } from '../inputs';

@Controller()
export class <FTName | capitalize>Controller{
    constructor(private readonly <FTName>Service : <FTName | capitalize>Service){}
  
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async get<FTName | Capitalize>ById(@Param('id', ParseIntPipe) id: number) {
    return this.<FTName>Service.get<FTName | Capitalize>ById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async get<FTName | Capitalize>s(@Query() query: PaginationParams): Promise<any> {
    return this.<FTName>Service.get<FTName | Capitalize>s(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async create<FTName | Capitalize>(@Body() body: Create<FTName | Capitalize>Input) {
    return this.<FTName>Service.create<FTName | Capitalize>(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete<FTName | Capitalize>ById(@Param('id', ParseIntPipe) id: number) {
    return this.<FTName>Service.delete<FTName | Capitalize>(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('')
  public async update<FTName | Capitalize>(@Body() body: Update<FTName | Capitalize>Input) {
    return this.<FTName>Service.update<FTName | Capitalize>(body);
  }
}
