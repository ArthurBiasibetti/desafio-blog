import { IBase } from '../../database/models/Base.model';
import { PostModel } from '../../database/models/Post.model';
import { UserRoles } from '../../database/models/User.model';

type Posts = PostModel & IBase;

export default interface ICreateSessionResponseDTO {
  id: string;
  name: string;
  role: UserRoles;
  posts: Posts[];
}
