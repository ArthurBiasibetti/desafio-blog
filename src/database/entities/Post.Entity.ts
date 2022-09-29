import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CategoryEntity } from './Category.Entity';
import { UserEntity } from './User.Entity';
import Base from './Base';

@Entity('posts')
export class PostEntity extends Base {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => UserEntity, (user) => user.posts) // note: we will create author property in the Photo class below
  public author: UserEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.posts)
  @JoinTable()
  public categories: CategoryEntity[];
}
