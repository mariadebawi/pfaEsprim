import { Routes } from '@angular/router';
import { EtudiantComponent } from 'src/app/pages/etudiant/etudiant.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'etudiant',      component: EtudiantComponent },
    { path: '',      component: EtudiantComponent },

  
];
