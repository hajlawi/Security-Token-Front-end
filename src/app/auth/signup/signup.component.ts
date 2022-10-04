import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup;
  errorMessage:string;
  constructor(private authservice:AuthService,
              private formBuilder:FormBuilder,
              private router:Router){}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signUpForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      repassword:['',[Validators.required ]]
    });
  }

  onSubmit() {
    const username=this.signUpForm.get('username').value;
    const password= this.signUpForm.get('password').value;
    const repassword= this.signUpForm.get('repassword').value;
   // const userForm=this.signUpForm.value;
    this.authservice.createNewUser({username,password,repassword}).then(()=>{
     // let jwt=   res.headers.get('authorization');
     // this.authservice.saveToken(jwt);
      this.router.navigateByUrl('/tasks')
    },error =>{
      this.router.navigate(['/auth','signin'])
    });
  }
  }

