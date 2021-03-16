import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/firebaseServices/User/users.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerList;
  subscription: Subscription[] = [];

  constructor(private customerSrv:UsersService) { }

  ngOnInit(): void {
    this.subscription.push(this.customerSrv.getUsers().subscribe(data => {
      this.customerList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      })
    }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

  makeAdmin(value, id) {
    this.customerSrv.makeAdmin(value, id);
  }

  deleteCustomer(id) {
    this.customerSrv.deleteUser(id);
  }

}
