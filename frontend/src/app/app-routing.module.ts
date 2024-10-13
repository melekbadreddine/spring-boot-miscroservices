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
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'member', component: MemberComponent, pathMatch: 'full' },
  { path: 'create', component: MemberFormComponent, pathMatch: 'full' },
  { path: ':id/edit', component: MemberFormComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'tools', component: ToolsComponent, pathMatch: 'full' },
  { path: 'event', component: EventComponent, pathMatch: 'full' },
  { path: 'article', component: ArticleComponent, pathMatch: 'full' },
  { path: '**', component: LoginComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
