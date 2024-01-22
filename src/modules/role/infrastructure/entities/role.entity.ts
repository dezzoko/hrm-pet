import { UserEntity } from 'src/modules/user';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'role' })
@Unique(['roleName'])
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
