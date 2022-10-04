import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm:FormGroup;
  errormessage:string;
  constructor( private authservice:AuthService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.signinForm =this.formbuilder.group(
      {
        username: ['' , [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }
  onSubmit(){
    const username=this.signinForm.get('username').value;
    const password= this.signinForm.get('password').value;
const userForm=this.signinForm.value;
    this.authservice.signInUser(userForm).subscribe((res)=>{
      //console.log(res.headers.get('authorization'));
   let jwt=   res.headers.get('authorization');
      this.authservice.saveToken(jwt);
      this.router.navigateByUrl('/tasks')
    },error =>{
      this.router.navigate(['/auth','signin']);
    });
  }
}
