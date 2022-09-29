import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from '../models/User.model';
import { PostEntity } from './Post.Entity';
import Base from './Base';

@Entity('users')
export class UserEntity extends Base {
  @Column({ length: 100 })
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'USER'], default: 'USER' })
  public role: UserRoles;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
