import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  { path: 'edit_user', component: EditUserComponent },
  {
    path: 'new_user',
    loadChildren: () =>
      import('./new-user/new-user.module').then((m) => m.NewUserModule),
  },
  {
    path: 'create_doc',
    loadChildren: () =>
      import('./create-doc/create-doc.module').then((m) => m.CreateDocModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
