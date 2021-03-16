import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/firebaseServices/User/users.service';
import { NgAuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  admin;
  userID;

  subscription: Subscription[] = [];

  @ViewChild('mySidenav') sideNav: ElementRef;
  constructor(private userSrv:UsersService, private authSrv:NgAuthService,public translate: TranslateService) { }

  openNav() {
    this.sideNav.nativeElement.style.marginLeft = "0";
  }
  
  closeNav() {
    this.sideNav.nativeElement.style.marginLeft = "-250px";
  }

  logout() {
    this.authSrv.SignOut();
  }

  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem('user')).uid;
    this.subscription.push(this.userSrv.getSpcUser(this.userID).subscribe(data => {
      this.admin = { id: data.payload.id, ...(data.payload.data() as {}) };
      if(this.admin.isAdmin === false) this.logout();
    })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

}