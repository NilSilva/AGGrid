import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'new-row-component',
	template: `
		<div
			data-newRow="true"
			style="cursor: pointer;text-align: center;color:#bec8d4"
		>
			<span data-newRow="true" style="vertical-align:middle;" class="material-icons"> playlist_add </span>
			<span data-newRow="true" style="vertical-align:middle;">Create new row</span>

		</div>
	`,
})
export class NewRowRenderer implements ICellRendererAngularComp {
	refresh(params: ICellRendererParams): boolean {
		throw new Error('Method not implemented.');
	}
	agInit(params: ICellRendererParams): void {}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}
}
