import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { <FTName | capitalize>Entity } from '../entities';
import { BaseRepository } from 'src/core/interfaces/repository.interface';


export class  <FTName | capitalize>Repository extends BaseRepository<<FTName | Capitalize>Entity> {
  constructor(
    @InjectRepository(<FTName | capitalize>Entity)
    private <FTName>Repository: Repository<<FTName | capitalize>Entity>,
  ) {
    super(
      <FTName>Repository.target,
      <FTName>Repository.manager,
      <FTName>Repository.queryRunner,
    );
  }
}
