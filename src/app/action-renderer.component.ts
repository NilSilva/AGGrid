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
			<button data-action="edit">Editar</button>
			<button onclick="this.disabled=true" data-action="delete" style="margin-left: 10px">
				Eliminar
			</button>
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
