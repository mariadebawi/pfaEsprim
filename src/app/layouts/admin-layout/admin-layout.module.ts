import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FilterPipeModule } from 'ngx-filter-pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EtudiantComponent } from 'src/app/pages/etudiant/etudiant.component';
import { AvisComponent } from 'src/app/pages/avis/avis.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FilterPipeModule,
  ],
  declarations: [
    EtudiantComponent,
    AvisComponent

  ]
})

export class AdminLayoutModule {}
