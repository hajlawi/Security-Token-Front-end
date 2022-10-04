import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase';
import {AuthService} from "./auth.service";
import {error} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authservice: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
        if (this.authservice.tokenAdmin()) {

          resolve(true);
        } else {
          this.router.navigate((['/auth','signin']));
          resolve(false);
        }
      }
    );
  }
}
