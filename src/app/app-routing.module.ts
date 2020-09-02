import { NgModule } from '@angular/core';    
import { Routes, RouterModule } from '@angular/router';    
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';

const routes: Routes = [
  { path: '', component: CandidateListComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({    
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]    
})    
export class AppRoutingModule { } 

