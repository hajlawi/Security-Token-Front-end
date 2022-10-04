import { Injectable } from '@angular/core';
import {reject} from "q";
import {catchError} from "rxjs/operators";
import {_catch} from "rxjs-compat/operator/catch";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error, promise} from "selenium-webdriver";
import {Subject} from "rxjs";
import {Task} from "../../models/task.model";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private host="http://localhost:8080";
public jwtToken=null;
public roles=Array<any>();
  constructor(private httpclient:HttpClient) {

  }


  signInUser(userForm) {


     return   this.httpclient.post<any>(this.host + "/login", userForm, {observe: 'response'});

  }
    createNewUser(userForm){

      return new Promise(
        (resolve, reject) => {
          this.httpclient.post(this.host + "/register",
            {username: userForm.username, password: userForm.password, repassword: userForm.repassword})
            .subscribe((res:any)=>{
          resolve(res);
        }, err => {
          reject("********" + err);
        });
    }
);
}
saveToken(jwt:string){
    this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
  let decode =jwt_decode(this.jwtToken);
  this.roles=decode.roles;

  }
loadToken(){
  this.jwtToken=localStorage.getItem('token');


}
  signOutUser(){
    localStorage.removeItem('token');
    this.jwtToken=null;

  }
  tokenAdmin() {
let roles=this.roles;
    for(let r of roles) {
      console.log(r)
      if(r=="ADMIN")
        return true;
      else
        return false
    }


    }



}
