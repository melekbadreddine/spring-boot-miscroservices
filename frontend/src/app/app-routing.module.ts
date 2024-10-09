import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent,
  },
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'create', pathMatch: 'full', component: MemberComponent },
  { path: ':id/edit', pathMatch: 'full', component: MemberFormComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'tools', pathMatch: 'full', component: ToolsComponent },
  { path: 'event', pathMatch: 'full', component: EventComponent },
  { path: 'article', pathMatch: 'full', component: ArticleComponent },
  {
    path: '**',
    pathMatch: 'full',
    component: MemberComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
