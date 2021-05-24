import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EtudiantComponent } from 'src/app/pages/etudiant/etudiant.component';
// import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  declarations: [
    EtudiantComponent
  ]
})

export class AdminLayoutModule {}
