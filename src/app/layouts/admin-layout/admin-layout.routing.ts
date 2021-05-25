import { Routes } from '@angular/router';
import { AvisComponent } from 'src/app/pages/avis/avis.component';
import { EtudiantComponent } from 'src/app/pages/etudiant/etudiant.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',      component: EtudiantComponent },
    { path: 'etudiant',      component: EtudiantComponent },
    { path: 'avis',      component: AvisComponent },

  
];
