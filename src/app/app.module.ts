import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowFlowersComponent } from './show-flowers/show-flowers.component';
import { FlowerService } from './flowerService/flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';
import { CreateFlowerComponent } from './create-flower/create-flower.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowFlowersComponent,
    CreateFlowerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    FlowerService,
    FlowerRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
