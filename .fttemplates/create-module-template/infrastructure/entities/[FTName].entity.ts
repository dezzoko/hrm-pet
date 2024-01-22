import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '<FTName>' })
export class <FTName | capitalize>Entity {
  @PrimaryGeneratedColumn()
  id: number;
}
