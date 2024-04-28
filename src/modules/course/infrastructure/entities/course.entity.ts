import { CourseCategoryEntity } from 'src/modules/course-category/infrastructure';
import { UserEntity } from 'src/modules/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.courses)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.approvedCourses)
  approvedBy: UserEntity;

  @Column({
    type: 'timestamp without time zone',
    name: 'approved_at',
    nullable: true,
  })
  approvedAt: Date;

  @ManyToOne(
    () => CourseCategoryEntity,
    (courseCategory) => courseCategory.courses,
  )
  courseCategory: CourseCategoryEntity;

  @Column({ default: false, name: 'is_approved' })
  isApproved: boolean;

  @Column({ nullable: true })
  additionalInfoUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
