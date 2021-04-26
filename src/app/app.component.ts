import { AfterViewInit, Component, ViewChild } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { ActionRenderer } from './action-renderer.component';
import { ActionRenderer2 } from './action-renderer2.component';
import { AgGridAngular } from 'ag-grid-angular';
import { NewRowRenderer } from './new-row-renderer.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;

	title = 'AGGrid';

	public newRow: boolean = false;

	public paginationPageSize: Number = 10;

	public localidades: {
		name: string;
		code: number;
		level: string;
	}[] = distritosConcelhosFreguesias;

	public editType = 'fullRow';

	public frameworkComponents = {
		actionRenderer: ActionRenderer,
		actionRenderer2: ActionRenderer2,
		newRowRenderer: NewRowRenderer,
	};

	columnDefs = [
		{
			headerName: 'Nome',
			field: 'name',
			colId: 'name',
			sortable: true,
			editable: true,
			width: 700,
			colSpan: function (params) {
				if (params.node.isRowPinned()) {
					return 4;
				} else {
					return 1;
				}
			},
			pinnedRowCellRenderer: 'newRowRenderer',
		},
		{
			headerName: 'Tipo',
			field: 'level',
			sortable: true,
			editable: true,
			width: 100,
		},
		{
			headerName: 'Código',
			field: 'code',
			sortable: true,
			width: 100,
		},
		{
			headerName: 'Ação',
			width: 180,
			colId: 'action',
			cellRendererSelector: function (params) {
				let beforeClickEdit = {
					component: 'actionRenderer',
				};

				let afterClickEdit = {
					component: 'actionRenderer2',
				};

				let editingCells = params.api.getEditingCells();

				//Checks if rowIndex matches one of the editing cells
				let isRowEditing = editingCells.some((cell) => {
					return cell.rowIndex === params.node.rowIndex;
				});

				if (!isRowEditing) {
					return beforeClickEdit;
				} else {
					return afterClickEdit;
				}
			},
		},
	];

	ngAfterViewInit() {
		this.pinRow();
	}

	onCellClicked(params) {
		//Check what column was clicked.
		if (
			params.column.colId === 'action' &&
			params.event.target.dataset.action
		) {
			let action = params.event.target.dataset.action;

			if (action === 'edit') {
				params.api.startEditingCell({
					rowIndex: params.node.rowIndex,
					colKey: params.columnApi.getDisplayedCenterColumns()[0]
						.colId,
				});
			} else if (action === 'delete') {
				console.log('Deleting:');
				console.log(params.data);

				params.api.applyTransaction({
					remove: [params.node.data],
				});
			} else if (action === 'save') {
				if (this.newRow) {
					this.newRow = false;
				}
				params.api.stopEditing(false);

				console.log('Saving data:');
				console.log(params.data);
			} else if (action === 'cancel') {
				if (this.newRow) {
					console.log('Deleting new row.');

					params.api.applyTransaction({
						remove: [params.node.data],
					});

					this.newRow = false;
				} else {
					params.api.stopEditing(true);
				}
			}
		} else if (
			params.column.colId === 'name' &&
			params.event.target.dataset.newrow
		) {
			this.newRow = true;
			params.api.applyTransaction({
				add: [{}],
				addIndex: 0,
			});

			params.api.startEditingCell({
				rowIndex: params.node.rowIndex,
				colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
			});
		}
	}

	onRowEditingStarted(params) {
		params.api.refreshCells({
			columns: ['action'],
			rowNodes: [params.node],
			force: true,
		});
	}

	onRowEditingStopped(params) {
		if (this.newRow) {
			this.newRow = false;
		}
		params.api.refreshCells({
			columns: ['action'],
			rowNodes: [params.node],
			force: true,
		});
	}

	pinRow() {
		let rows = [];
		rows.push({});

		this.agGrid.api.setPinnedTopRowData(rows);
	}
}
