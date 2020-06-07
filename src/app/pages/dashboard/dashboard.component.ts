import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name', 'proffession', 'age','phone','action'];
  constructor(public formBuilder: FormBuilder,
    public firebaseService : FirebaseService,
    public router: Router) {

    }
  dataSource:any;
  ngOnInit() {
    this.firebaseService.getvolunteers().subscribe((response)=> {
     console.log(response,"response");
     this.dataSource=response.map(e => {
      return e.payload.doc.data()
    }); 
    console.log(this.dataSource,'this.dataSource');
    })
  }

}
