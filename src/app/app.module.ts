import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowFlowersComponent } from './show-flowers/show-flowers.component';
import { FlowerService } from './flowerService/flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';

@NgModule({
  declarations: [
    AppComponent,
    ShowFlowersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FlowerService,
    FlowerRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
