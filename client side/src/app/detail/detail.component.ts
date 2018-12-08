import { Component, OnInit, Input } from '@angular/core';
import { Productservice } from '@app/_models';
import { ActivatedRoute } from "@angular/router";
import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  product : any;
  pnames : string = "Hello";
  products: Productservice[] = [];

 constructor(private route: ActivatedRoute,  private userService: UserService, private alertService: AlertService) {}
  ngOnInit() {
   
    this.route.params.subscribe(params => {
  //  this.product._id = params.id;
       this.userService.getProductById(params.id).pipe(first()).subscribe(prod => {
            this.product = prod;
            console.log(prod);
        });
    });
  }

  update(){

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
  

}
