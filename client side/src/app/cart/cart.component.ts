import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Productservice } from '@app/_models';

import { User, Category } from '@app/_models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    currentUser: User;
    currentUserSubscription: Subscription;
    cartItems : Productservice[];

  constructor( 
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

  ngOnInit() {
    this.cartItems = this.currentUser.cart;
  }

   ngOnDestroy() {

     this.currentUser.cart = this.cartItems;

     this.userService.update(this.currentUser);
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

  deleteProductFromCart(prod : Productservice){
    
     this.cartItems = this.cartItems.filter(obj => obj !== prod);


  }


}
