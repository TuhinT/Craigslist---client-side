import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Productservice } from '@app/_models';
import { ActivatedRoute } from "@angular/router";
import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrls: ['./update-prod.component.css']
})
export class UpdateProdComponent implements OnInit {



  product: any;
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







 
