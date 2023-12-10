import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomersComponent implements OnInit {

  products: any;

  constructor(private customerService: CustomerServiceService, private router: Router) { }
 
  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next:data=>{
        this.products=data
        console.log(data)
      },
      error:err=>{
        console.log(err)
        console.log(err.status)
        if(err.status){
          this.router.navigateByUrl('/unAuthorized')
        }
      }
    })
  }

}
