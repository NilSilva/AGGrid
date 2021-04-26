import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'acao-component',
	template: `
		<div>
			<button data-acao="editar">Editar</button>
			<button onclick="this.disabled=true" data-acao="eliminar" style="margin-left: 10px">
				Eliminar
			</button>
		</div>
	`,
})
export class AcaoRenderer implements ICellRendererAngularComp {
	params: ICellRendererParams;

	refresh(params: ICellRendererParams): boolean {
		return false;
	}

	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

	agInit(params: any): void {
		this.params = params;
	}
}
