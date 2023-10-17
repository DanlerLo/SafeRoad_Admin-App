import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material/material.module';
import { MecanicoComponent } from './component/dashboard/mecanico/mecanico.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteMecanicoComponent } from './component/dashboard/mecanico/delete-Mecanico/delete-mecanico.component';
import { ViewMecanicoComponent } from './component/dashboard/mecanico/view-mecanico/view-mecanico.component';
import { LoginComponent } from './component/auth/login/login.component';
import { UsuariosComponent } from './component/dashboard/usuarios/usuarios.component';
import { AddUsuariosComponent } from './component/dashboard/usuarios/add-usuarios/add-usuarios.component';
import { DeleteusuarioComponent } from './component/dashboard/usuarios/delete-usuarios/delete-usuarios.component';
import { ViewUsuarioComponent } from './component/dashboard/usuarios/view-usuarios/view-usuarios.component';
import { GeocercaComponent } from './component/dashboard/geocerca/geocerca.component';
import { AddGeocercasComponent } from './component/dashboard/geocerca/add-geocercas/add-geocercas.component';
import { DeleteGeocercasComponent } from './component/dashboard/geocerca/delete-geocercas/delete-geocercas.component';
import { ViewGeocercasComponent } from './component/dashboard/geocerca/view-geocercas/view-geocercas.component';
import { NgChartsModule } from 'ng2-charts';
import { ModuloComponent } from './component/dashboard/modulo/modulo.component';
import * as Highcharts from 'highcharts';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    MecanicoComponent,
    SidebarComponent,
    UsuariosComponent,
    SidebarComponent,
    DeleteMecanicoComponent,
    ViewMecanicoComponent,
    AddUsuariosComponent,
    DeleteusuarioComponent,
    ViewUsuarioComponent,
    LoginComponent,
    DeleteusuarioComponent,
    ViewUsuarioComponent,
    GeocercaComponent,
    AddGeocercasComponent,
    DeleteGeocercasComponent,
    ViewGeocercasComponent,
    ModuloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    RouterModule.forRoot([]),
    MatDialogModule,
  ],
  providers: [
    { provide: Highcharts, useValue: Highcharts },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
