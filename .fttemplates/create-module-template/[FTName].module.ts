import { Module } from "@nestjs/common";
import {<FTName | capitalize>Controller} from './presentation'
import {<FTName | capitalize>Service} from './application'
import {<FTName | capitalize>Domain} from './domain'
import {<FTName | capitalize>Repository,<FTName | capitalize>Entity} from './infrastructure'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers:[<FTName | capitalize>Controller],
    providers:[<FTName | capitalize>Service,<FTName | capitalize>Domain,<FTName | capitalize>Repository,<FTName | capitalize>Entity],
      imports: [TypeOrmModule.forFeature([<FTName | capitalize>Entity])],

})
export class <FTName | capitalize>Module{}