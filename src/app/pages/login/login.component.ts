import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _LoginForm: FormGroup;
  EnableEdit:boolean=false;
  constructor(public formBuilder: FormBuilder,
    public firebaseService : FirebaseService,
    public router: Router,
    private afs: AngularFirestore) {
      
    }
    userDoc:any;
    tasks:any;
    get f() { return this._LoginForm.controls; }
    ngOnInit(): void {
      this.tasks=this.afs.collection('volunteers', ref => ref.where('name', '>=', 'rakesh'));
      const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
      this._LoginForm = this.formBuilder.group({
      formUserEmail: ['', Validators.required],
      formUserPassword:['',Validators.required]
      });
  }
  userdetails:any;
  onSubmit() {
        console.log(this._LoginForm.value,"this._LoginForm.value");    
        this.firebaseService.searchvolunteers(this._LoginForm.value).subscribe((response)=>{
          this.userdetails=response[0].payload.doc.data();
          if(this.userdetails) {
            this.router.navigate(['dashboard'])
          }
          console.log(this.userdetails,"this.userdetails");
        })
  }

}
