import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  // { path: 'idea-details', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'idea', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' },
  { path: 'idea/:id', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' },
  { path: 'idea-list', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
