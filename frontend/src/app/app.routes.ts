import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'member', component: MemberComponent, pathMatch: 'full' },
  { path: 'create', component: MemberFormComponent, pathMatch: 'full' },
  { path: ':id/edit', component: MemberFormComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
