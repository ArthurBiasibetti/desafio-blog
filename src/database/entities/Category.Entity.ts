import { Column, Entity, ManyToMany } from 'typeorm';
import { PostEntity } from './Post.Entity';
import Base from './Base';

@Entity('categories')
export class CategoryEntity extends Base {
  @Column({ unique: true })
  public name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  public posts: PostEntity[];
}
