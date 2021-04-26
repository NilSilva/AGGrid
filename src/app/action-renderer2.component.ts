import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'action2-component',
	template: `
		<div>
			<button data-action="save">Guardar</button>
			<button onclick="this.disabled=true" data-action="cancel" style="margin-left: 10px">
				Cancelar
			</button>
		</div>
	`,
})
export class ActionRenderer2 implements ICellRendererAngularComp {
	params: ICellRendererParams;

	refresh(params: ICellRendererParams): boolean {
		return false;
	}

	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

	agInit(params: any): void {
		this.params = params;
	}
}
