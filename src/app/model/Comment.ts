import { User } from './User';

export class Comment {
    blogId: string;
    author: User;
    content: string;
    subComments: string[];
}
