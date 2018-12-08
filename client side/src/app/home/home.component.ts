import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Category } from '@app/_models';
import { Productservice } from '@app/_models';

import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    products: Productservice[] = [];
    categories: Category[] = [];
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
      //  this.loadAllUsers();
      this.fetchcategories();
        this.loadAllProducts();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    private loadAllProducts() {
        this.userService.getAllp().pipe(first()).subscribe(products => {
            this.products = products;
        });
    }

    private fetchcategories()
    {
       this.userService.getAllCat().pipe(first()).subscribe(categories => {
          this.categories = categories;
       })
    }

    getCurrentUser()
    {
     return this.currentUser;
    }


    checked() 
    {
       return this.categories.filter(item => { return item.checked; });
    }

    addCart(prod:Productservice){

       this.currentUser.cart.push(prod);

        this.loading = true;
        this.userService.update(this.currentUser)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Added to cart', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }


    deleteProduct(prod:Productservice){

      prod.markDelete = true;
      
      this.loading = true;
        this.userService.updateProduct(prod)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Delete successful', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

    gotoProductDetails(url:string, id:string) {

       var myurl = `${url}/${id}`;
       this.router.navigateByUrl(myurl).then(e => {
         if (e) {
           console.log("Navigation is successful!");
         } else {
           console.log("Navigation has failed!");
         }
       });
    }

}
