import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Grupo {
  id?: string;
  nome: string;
  participantes: [
    {
      idUsuario: string;
    }
  ];
}

@Injectable({
  providedIn: 'root'
})

export class GruposService {
  private grupos: Observable<Grupo[]>;
  private grupoCollection: AngularFirestoreCollection<Grupo>;

  constructor(private afs: AngularFirestore) {
    this.grupoCollection = this.afs.collection<Grupo>('grupos');
    this.grupos = this.grupoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getGrupos(): Observable<Grupo[]> {
    return this.grupos;
  }

  getGrupo(id: string): Observable<Grupo> {
    return this.grupoCollection
      .doc<Grupo>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(grupo => {
          grupo.id = id;
          return grupo;
        })
      );
  }

  // addGrupo(grupo: Grupo): Promise<DocumentReference> {
  //   return this.grupoCollection.add(grupo);
  // }
  addGrupo(grupoNome: Grupo, ): Promise<DocumentReference> {
    return this.grupoCollection.add(grupoNome);
  }

  updateGrupo(grupo: Grupo, participantesNovos): Promise<void> {
    // let grupoRef = this.grupoCollection.doc(grupo.id);
    // console.log("grupoRef", grupoRef);


    return this.grupoCollection.doc(grupo.id).update({
      'participantes' : participantesNovos,
    });
  }

  deleteGrupo(id: string): Promise<void> {
    return this.grupoCollection.doc(id).delete();
  }
}
