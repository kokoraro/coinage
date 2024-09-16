import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxElectronModule } from 'ngx-electron';
import { NgxChildProcessModule } from 'ngx-childprocess';
import { NgxFsModule } from 'ngx-fs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HotkeyModule } from 'angular2-hotkeys';

import { MaterialModule } from 'src/app/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppComponent } from 'src/app/app.component';
import { SideMenuComponent } from 'src/app/side-menu/side-menu.component';
import { CollezioneComponent } from 'src/app/collezione/collezione.component';
import { MonetaDetailsComponent } from 'src/app/collezione/moneta-details/moneta-details.component';
import { PrePipe } from 'src/app/collezione/moneta-details/pipe/pre.pipe';
import { MoneteTableComponent } from 'src/app/collezione/monete-table/monete-table.component';
import { ParametriComponent } from 'src/app/parametri/parametri.component';
import { UnitsComponent } from 'src/app/units/units.component';
import { ResourcesComponent } from 'src/app/resources/resources.component';
import { AddSchedaComponent } from 'src/app/gestione/scheda/add-scheda/add-scheda.component';
import { EditSchedaComponent } from 'src/app/gestione/scheda/edit-scheda/edit-scheda.component';
import { FormSchedaComponent } from 'src/app/gestione/scheda/form-scheda/form-scheda.component';
import { QuantityInputComponent } from 'src/app/gestione/scheda/form-scheda/quantity-input/quantity-input.component';
import { ResourceInputComponent } from 'src/app/gestione/scheda/form-scheda/resource-input/resource-input.component';
import { YearInputComponent } from 'src/app/gestione/scheda/form-scheda/year-input/year-input.component';
import { BackupComponent } from 'src/app/gestione/backup/backup.component';
import { BackupProgressComponent } from 'src/app/gestione/backup/backup-progress/backup-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    CollezioneComponent,
    MonetaDetailsComponent,
    PrePipe,
    MoneteTableComponent,
    ParametriComponent,
    UnitsComponent,
    ResourcesComponent,
    AddSchedaComponent,
    EditSchedaComponent,
    FormSchedaComponent,
    QuantityInputComponent,
    ResourceInputComponent,
    YearInputComponent,
    BackupComponent,
    BackupProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxElectronModule,
    NgxChildProcessModule,
    NgxFsModule,
    PerfectScrollbarModule,
    HotkeyModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [ 
    MonetaDetailsComponent,
    BackupProgressComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
