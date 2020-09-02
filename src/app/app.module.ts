import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CandidateNameFilterPipe } from './pipe/candidate-name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    PageNotFoundComponent,
    CandidateNameFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
