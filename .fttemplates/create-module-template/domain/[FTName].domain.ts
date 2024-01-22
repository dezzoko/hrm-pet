import { Injectable } from "@nestjs/common";
import {<FTName | capitalize>Repository} from '../infrastructure'

import {
  Create<FTName | Capitalize>Params,
  Get<FTName | Capitalize>sParams,
  Update<FTName | Capitalize>Params,
} from './<FTName>.domain-type';

@Injectable()
export class <FTName | capitalize>Domain{
    constructor(private readonly <FTName>Repository: <FTName | capitalize>Repository){}

      public async get<FTName | Capitalize>ById(id: number) {
    return this.<FTName>Repository.findBy({ id });
  }

  public async get<FTName | Capitalize>s(params: Get<FTName | Capitalize>sParams): Promise<any> {
    return this.<FTName>Repository.findWithPagination(params);
  }

  public async update<FTName | Capitalize>(params: Update<FTName | Capitalize>Params) {
    const updated<FTName | Capitalize> = await this.<FTName>Repository.update(
      { id: params.id },
      {
        ...params,
      },
    );
    return updated<FTName | Capitalize>;
  }

  public async delete<FTName | Capitalize>(id: number) {
    await this.<FTName>Repository.delete({ id });
  }

  public async create<FTName | Capitalize>(params: Create<FTName | Capitalize>Params) {
    const created<FTName | Capitalize> = this.<FTName>Repository.create(params);
    await this.<FTName>Repository.save(created<FTName | Capitalize>);
    return created<FTName | Capitalize>;
  }
}