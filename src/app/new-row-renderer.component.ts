import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'new-row-component',
	template: `
		<div style="display: flex;margin-top:10px;justify-content: center;overflow: hidden;">
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
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}
}
