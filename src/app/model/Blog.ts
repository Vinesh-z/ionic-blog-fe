import { User } from './User';

export class Blog {
    blogName: string;
    author: User;
    content: string;
    categoryId: string;
    likesCount: number;
    tags: string[];
    imageUrl: string[];
    reportCount: number;
}
