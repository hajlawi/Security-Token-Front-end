import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isauth:boolean;
  constructor(private authservice: AuthService,private router :Router) { }

  ngOnInit(): void {


  }
OnsingOut(){
this.authservice.signOutUser();
  this.router.navigate(['/auth','signin']);
}


}
