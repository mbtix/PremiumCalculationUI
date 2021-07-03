import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
