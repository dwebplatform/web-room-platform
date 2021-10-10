import { PrimaryGeneratedColumn,Column,Entity, JoinTable, ManyToMany } from "typeorm";
import { Book } from './book.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  
  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @JoinTable()
  @ManyToMany(type=> Book, (book)=>book.users)
  books: string[];
}