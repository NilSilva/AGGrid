import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'new-row-component',
	template: `
		<div style="padding-left=auto;padding-right=auto;">
			<button data-newRow="true">
				New row
			</button>
		</div>
	`,
})
export class NewRowRenderer implements ICellRendererAngularComp {
	refresh(params: ICellRendererParams): boolean {
		throw new Error('Method not implemented.');
	}
	agInit(params: ICellRendererParams): void {
		console.log('teste');
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}
}
