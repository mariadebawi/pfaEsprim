import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Avis from '../models/avis.model';
@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private dbPath = '/avis';

  avisRef: AngularFirestoreCollection<Avis>;

  constructor(private db: AngularFirestore) {
    this.avisRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Avis> {
    return this.avisRef;
  }

  create(avis: Avis): any {
    return this.avisRef.add({ ...avis });
  }

  update(id: string, data: any): Promise<void> {
    return this.avisRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.avisRef.doc(id).delete();
  }
}
