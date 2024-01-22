import { Injectable } from "@nestjs/common";
import {<FTName | capitalize>Domain} from '../domain';

import {
  Create<FTName | Capitalize>Params,
  Get<FTName | Capitalize>sParams,
  Update<FTName | Capitalize>Params,
} from '../domain/<FTName>.domain-type';

@Injectable()
export class <FTName | capitalize>Service{
    constructor(private readonly <FTName>Domain: <FTName | capitalize>Domain){}


      public async get<FTName | Capitalize>s(params: Get<FTName | Capitalize>sParams) {
    return this.<FTName>Domain.get<FTName | Capitalize>s(params);
  }

  public async get<FTName | Capitalize>ById(id: number) {
    return this.<FTName>Domain.get<FTName | Capitalize>ById(id);
  }

  public async update<FTName | Capitalize>(params: Update<FTName | Capitalize>Params) {
    return this.<FTName>Domain.update<FTName | Capitalize>(params);
  }

  public async delete<FTName | Capitalize>(id: number) {
    return this.<FTName>Domain.delete<FTName | Capitalize>(id);
  }

  public async create<FTName | Capitalize>(params: Create<FTName | Capitalize>Params) {
    return this.<FTName>Domain.create<FTName | Capitalize>(params);
  }


}