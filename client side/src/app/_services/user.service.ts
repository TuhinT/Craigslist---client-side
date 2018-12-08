import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Category } from '@app/_models';
import { Productservice } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

   
   //Get all Categories
    
    getAllCat() {
        return this.http.get<Category[]>(`${environment.apiUrl}/home/cat`);
    }

    //CRUD for users

     getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user._id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

   //CRUD for products

    getAllp() {
        return this.http.get<Productservice[]>(`${environment.apiUrl}/home`);
    }

    addProduct(prod: Productservice) {
        return this.http.post(`${environment.apiUrl}/home/register`, prod);
    }

    updateProduct(prod: Productservice) {
        return this.http.put(`${environment.apiUrl}/home/${prod._id}`, prod);
    }

    deleteProd(prod: Productservice) {
        return this.http.delete(`${environment.apiUrl}/home/${prod._id}`);
    }

    getProductById(id: string) {
        return this.http.get(`${environment.apiUrl}/home/${id}`);
    }
}
