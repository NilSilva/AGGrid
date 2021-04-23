import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'acao-component',
	template: `
		<div *ngIf="!isEditing">
			<button data-acao="editar">Editar</button>
			<button data-acao="eliminar" style="margin-left: 10px">
				Eliminar
			</button>
		</div>
		<div *ngIf="isEditing">
			<button data-acao="cancelar" style="margin-left: 10px">
				Cancelar
			</button>
			<button data-acao="guardar" style="margin-left: 10px">
				Guardar
			</button>
		</div>
	`,
})
export class AcaoRenderer implements ICellRendererAngularComp {
	public isEditing: boolean;

	refresh(params: ICellRendererParams): boolean {
		let editingCells = params.api.getEditingCells();

		this.isEditing = editingCells.some((cell) => {
			return cell.rowIndex === params.node.rowIndex;
		});

		return this.isEditing;
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

	agInit(params: any): void {
		let editingCells = params.api.getEditingCells();

		this.isEditing = editingCells.some((cell) => {
			return cell.rowIndex === params.node.rowIndex;
		});
	}
}
