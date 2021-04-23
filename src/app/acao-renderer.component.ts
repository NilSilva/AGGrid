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
			<button (click)="edit($event)">Editar</button>
			<button (click)="cancelar($event)" style="margin-left: 10px">
				Eliminar
			</button>
		</div>
	`,
})
export class AcaoRenderer implements ICellRendererAngularComp {
	params: ICellRendererParams;
	refresh(params: ICellRendererParams): boolean {
		return true;
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

	agInit(params: any): void {
		this.params = params;
	}

	edit(event) {
		if (event.target.innerHTML == 'Editar') {
			event.target.innerHTML = 'Guardar';
			event.target.dataset.acao = 'editar';

			event.target.nextElementSibling.innerHTML = 'Cancelar';
		} else {
			event.target.innerHTML = 'Editar';
			event.target.dataset.acao = 'guardar';

			event.target.nextElementSibling.innerHTML = 'Eliminar';
		}
	}

	cancelar(event) {
		if (event.target.innerHTML == 'Cancelar') {
			event.target.innerHTML = 'Eliminar';
			event.target.dataset.acao = "cancelar";

			event.target.previousElementSibling.innerHTML = 'Editar';
		} else {
			event.target.dataset.acao = 'eliminar';
		}
	}
}
