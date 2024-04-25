import { CourseEntity } from 'src/modules/course/infrastructure';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courseCategory' })
export class CourseCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CourseEntity, (CourseEntity) => CourseEntity.courseCategory)
  courses: CourseEntity[];
}
