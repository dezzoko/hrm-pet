import { UserEntity } from 'src/modules/user';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';

@Entity()
@Unique(['roleName'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
