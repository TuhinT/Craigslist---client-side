import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Productservice } from '@app/_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


   product: Productservice  = {};
   currentuser: User;


    currentUserSubscription: Subscription;
     loading = false;
        registerForm: FormGroup;


  constructor(
         private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentuser = user;
        });
    }

  ngOnInit() {

  }

  saveProfile() {
       this.loading = true;
       console.log("test");
        this.userService.update(this.currentuser)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }

     create()
    {
      try{
            console.log("inner");
           console.log(this.product.pname);
            this.userService.addProduct(this.product).subscribe();
             this.userService.updateProduct(this.product)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);

                },
                error => {
                    this.alertService.error(error);

                });
      }
      catch(error)
      {
        console.log(error);
      }
    }

}
