import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';

export const routes: Routes = [
  { path: 'members', component: MemberComponent },
  { path: '', redirectTo: '/members', pathMatch: 'full' },
];
