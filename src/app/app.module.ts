import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActionRenderer } from './action-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HighlightRendererComponent } from './highlightRenderer.component';

@NgModule({
	declarations: [AppComponent, ActionRenderer, HighlightRendererComponent],
	imports: [
		BrowserModule,
		AgGridModule.withComponents([]),
		BrowserAnimationsModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
