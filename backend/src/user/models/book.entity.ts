import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from './user.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @ManyToMany(type=>User, user=>user.books)
  users:User[];
}
