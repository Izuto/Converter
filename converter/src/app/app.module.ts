import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG modules used by converter component
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { ConverterComponent } from './converter.component';

@NgModule({
  declarations: [AppComponent, ConverterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot([]), FormsModule, CardModule, InputNumberModule, DropdownModule, ButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
