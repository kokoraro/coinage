import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollezioneComponent } from 'src/app/collezione/collezione.component';
import { ParametriComponent } from 'src/app/parametri/parametri.component';
import { UnitsComponent } from 'src/app/units/units.component';
import { ResourcesComponent } from 'src/app/resources/resources.component';
import { AddSchedaComponent } from 'src/app/gestione/scheda/add-scheda/add-scheda.component';
import { EditSchedaComponent } from 'src/app/gestione/scheda/edit-scheda/edit-scheda.component';
import { BackupComponent } from 'src/app/gestione/backup/backup.component';

const routes: Routes = [
  { path: 'collezione', component: CollezioneComponent },
  { path: 'collezione/:ambito', component: CollezioneComponent },
  { path: 'parametri/:param', component: ParametriComponent },
  { path: 'units/:unit', component: UnitsComponent },
  { path: 'resources/:res', component: ResourcesComponent },
  { path: 'gestione/add-scheda', component: AddSchedaComponent },
  { path: 'gestione/edit-scheda/:id', component: EditSchedaComponent },
  { path: 'gestione/backup', component: BackupComponent },
  { path: '', redirectTo: '/collezione', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
