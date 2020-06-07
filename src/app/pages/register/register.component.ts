import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _RegisterForm: FormGroup;
  EnableEdit:boolean=false;
  constructor(public formBuilder: FormBuilder,
    public firebaseService : FirebaseService,
    public router: Router) {

  }
  get f() { return this._RegisterForm.controls; }
  ngOnInit(): void {
    const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this._RegisterForm = this.formBuilder.group({
      formUserName: ['', Validators.required],
      formUserEmail: ['', Validators.required],
      formUserPhoneno:['', Validators.required],
      formUserAddress: ['', Validators.required],
      formUserGender: ['1', Validators.required],
      formUserAge:['',Validators.required],
      formUserProffession:['',Validators.required],
      formUserPassword:['',Validators.required],
      formUserConfirmPassword:['',Validators.required]
    });

  }
  onSubmit() {
    if (this._RegisterForm.invalid) {
      return;
    }
    if (this._RegisterForm.valid) {
      console.log(this._RegisterForm,"this._RegisterForm");
      this.firebaseService.createUser(this._RegisterForm.value).then(
        res => {
          this.router.navigate(['login']);
        }
      )
    }

  }
  onUpdate() {

  }

}
