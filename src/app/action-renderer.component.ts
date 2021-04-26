import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'action-component',
	template: `
		<div>
			<span
				data-action="edit"
				style="margin-left: 10px;cursor: pointer;"
				class="material-icons"
			>
				edit
			</span>
			<span
				data-action="delete"
				style="margin-left: 10px;cursor: pointer;"
				class="material-icons"
			>
				delete
			</span>
		</div>
	`,
})
export class ActionRenderer implements ICellRendererAngularComp {
	params: ICellRendererParams;

	refresh(params: ICellRendererParams): boolean {
		return false;
	}

	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

	agInit(params: any): void {
		this.params = params;
	}
}
