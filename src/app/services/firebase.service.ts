import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {

  }
  
  getvolunteers() {
    return this.db.collection('volunteers').snapshotChanges();
  }

  getvolunteerByNameAndPassword(){
    //return this.db.collection('volunteers',ref =>ref.where('name','==','rakesh')).get();
    let cityRef = this.db.collection('volunteers').doc('rakesh');
    return cityRef.get()
  }

  searchvolunteers(searchValue){
    return this.db.collection('volunteers',ref => 
      ref.where('email', '==', searchValue.formUserEmail)
      .where('password', '==', searchValue.formUserPassword))
      .snapshotChanges()
  }

  searchvolunteersByAge(value){
    return this.db.collection('volunteers',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value) {
    console.log(value,"value");
    return this.db.collection('volunteers').add({
      name: value.formUserName,
      address: value.formUserAddress,
      email:value.formUserEmail,
      gender: value.formUserGender,
      password: value.formUserPassword,
      proffession: value.formUserProffession,
      age: parseInt(value.formUserAge),
      phoneno:value.formUserPhoneno
    });
  }
}
