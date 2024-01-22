import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'test' })
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
