import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/usersModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore,
    public afs: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  getSpcUser(userId: any) {
    return this.firestore.collection('users').doc(userId).snapshotChanges();
  }
  createUser(user: UserModel) {
    return this.firestore.collection('users').add(user);
  }
  makeAdmin(value: boolean,forID: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${forID}`);
      const userState: UserModel = {
        isAdmin: value
      }

      return userRef.set(userState, {
        merge: true
      })
  }
  updateUser(user: UserModel) {
    delete user.uid;
    this.firestore.doc('users/' + user.uid).update(user);
  }
  deleteUser(userId: number) {
    this.firestore.doc('users/' + userId).delete();
  }
}