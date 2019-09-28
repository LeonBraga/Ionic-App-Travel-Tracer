
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  login: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('usuarios');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user;
      })
    );
  }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update({ login: user.login, senha: user.senha });
  }

  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}
