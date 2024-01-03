import { UserEntity } from 'src/modules/user';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department' })
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.department, { nullable: true })
  users: UserEntity[];
}
