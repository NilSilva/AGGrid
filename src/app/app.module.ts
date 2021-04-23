import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import { AcaoRenderer } from './acao-renderer.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		AgGridModule.withComponents([AcaoRenderer, CommonModule])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
