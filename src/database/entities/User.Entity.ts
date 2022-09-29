import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity()
export class User extends Base {
  @Column({ length: 100 })
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
