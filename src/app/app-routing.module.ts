import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { MecanicoComponent } from './component/dashboard/mecanico/mecanico.component';
import { ViewMecanicoComponent } from './component/dashboard/mecanico/view-mecanico/view-mecanico.component';
import { ViewUsuarioComponent } from './component/dashboard/usuarios/view-usuarios/view-usuarios.component';
import { UsuariosComponent } from './component/dashboard/usuarios/usuarios.component';
import { AuthguardGuard } from './shared/guard/authguard.guard';
import { GeocercaComponent } from './component/dashboard/geocerca/geocerca.component';
import { ModuloComponent } from './component/dashboard/modulo/modulo.component';

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'dashboard', children :
  [
    {path : '', redirectTo: 'usuarios', pathMatch: 'full'},
    {path : 'usuarios', component: UsuariosComponent},
    {path : 'mecanico', component: MecanicoComponent},
    {path : 'geocerca', component: GeocercaComponent},
    {path : 'modulo', component: ModuloComponent},
    {path : 'mecanico/:id', component: ViewMecanicoComponent},
    {path : 'usuarios/:id', component: ViewUsuarioComponent},
  ], canActivate: [AuthguardGuard]},
  {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
