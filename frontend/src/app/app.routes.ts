import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'create', component: MemberFormComponent, pathMatch: 'full' },
  { path: ':id/edit', component: MemberFormComponent, pathMatch: 'full' },
  { path: '**', component: MemberComponent },
];
