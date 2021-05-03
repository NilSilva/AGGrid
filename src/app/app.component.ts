import { AfterViewInit, Component, ViewChild } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { ActionRenderer } from './action-renderer.component';
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
		newRowRenderer: NewRowRenderer,
	};

	defaultColDef = {
		filter: true,
		floatingFilter: true,
	};

	columnDefs = [
		{
			headerName: 'Nome',
			field: 'name',
			colId: 'name',
			sortable: true,
			editable: true,
			width: 400,
			colSpan: function (params) {
				if (params.node.isRowPinned() && params.node.rowIndex === 0) {
					return 4;
				} else {
					return 1;
				}
			},
			cellRendererSelector: function (params) {
				if (params.node.isRowPinned() && params.node.rowIndex === 0) {
					return { component: 'newRowRenderer' };
				} else {
					return null;
				}
			},
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
			width: 100,
			colId: 'action',
			cellRenderer: 'actionRenderer',
			floatingFilter: false,
			filter: false,
		},
	];

	ngAfterViewInit() {
		this.pinCreateRowButton();
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
				params.api.stopEditing(false);

				if (this.newRow) {
					this.newRow = false;
					
					let transaction = params.api.applyTransaction({
						add: [params.node.data],
						addIndex: 0,
					});
					params.api.paginationGoToPage(
						Math.trunc(transaction.add[0].rowIndex / 10)
					);
					params.api.flashCells({
						rowNodes: transaction.add,
					});
				} else {
					let transaction = params.api.applyTransaction({
						update: [params.node.data],
					});
					params.api.paginationGoToPage(
						Math.trunc(transaction.update[0].rowIndex / 10)
					);
					params.api.flashCells({
						rowNodes: transaction.update,
					});
				}

				this.pinCreateRowButton();
				console.log('Saving data:');
				console.log(params.data);
			} else if (action === 'cancel') {
				if (this.newRow) {
					console.log('Deleting new row.');

					this.pinCreateRowButton();

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

			this.pinNewRow();

			params.api.startEditingCell({
				rowIndex: 1,
				rowPinned: 'top',
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
		this.pinCreateRowButton();
	}

	pinCreateRowButton() {
		let rows = [];
		rows.push({});

		this.agGrid.api.setPinnedTopRowData(rows);
	}

	pinNewRow() {
		let rows = [];
		rows.push({});
		rows.push({});

		this.agGrid.api.setPinnedTopRowData(rows);
	}
}
