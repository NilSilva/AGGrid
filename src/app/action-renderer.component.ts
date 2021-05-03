import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'action-component',
	template: `
		<div style="vertical-align:middle;"  *ngIf="!isEditing">
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
		<div *ngIf="isEditing">
			<span
				data-action="save"
				style="margin-left: 10px;cursor: pointer;"
				class="material-icons"
			>
				save
			</span>
			<span
				data-action="cancel"
				style="margin-left: 10px;cursor: pointer;"
				class="material-icons"
			>
				cancel
			</span>
		</div>
	`,
})
export class ActionRenderer implements ICellRendererAngularComp {
	public isEditing: boolean;

	agInit(params: ICellRendererParams): void {
		let editingCells = params.api.getEditingCells();

		//Checks if rowIndex matches one of the editing cells
		this.isEditing = editingCells.some((cell) => {
			return cell.rowIndex === params.node.rowIndex;
		});
	}
	refresh(params: ICellRendererParams): boolean {
		return false;
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}
}
