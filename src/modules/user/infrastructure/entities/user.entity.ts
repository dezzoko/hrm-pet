import { Exclude } from 'class-transformer';
import { DepartmentEntity } from 'src/modules/department/infrastructure';
import { RoleEntity } from 'src/modules/role/infrastructure';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'user' })
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true, type: 'double precision' })
  salary: number;

  @Exclude()
  @Column({ nullable: true })
  currentHashedRefreshToken?: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;
}
