import { Productservice } from '@app/_models';

export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    cart: Productservice[];
    token: string;
    isAdmin: boolean;
    address: string;
    contact: string;
}
