import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Etudiant from '../models/etudiant.model';
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private dbPath = '/etudiant';

  etusiantsRef: AngularFirestoreCollection<Etudiant>;

  constructor(private db: AngularFirestore) {
    this.etusiantsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Etudiant> {
    return this.etusiantsRef;
  }

  create(etudiant: Etudiant): any {
    return this.etusiantsRef.add({ ...etudiant });
  }

  update(id: string, data: any): Promise<void> {
    return this.etusiantsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.etusiantsRef.doc(id).delete();
  }
}
