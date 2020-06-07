import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  constructor() {
    
  }
  
  @Input() singleRow;
  singleRowRecord:any;
  ngOnInit() {
  }
  ngOnChanges() {
    this.singleRowRecord=this.singleRow;
    console.log(this.singleRowRecord.name,"this.singleRowRecord");
  }
}
