import { AfterViewInit, Component, ViewChild } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { AcaoRenderer } from './acao-renderer.component';
import { AcaoRenderer2 } from './acao-renderer2.component';
import { AgGridAngular } from 'ag-grid-angular';
import { NewRowRenderer } from './new-row-renderer.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;

	public newRow = false;

	pinRow() {
		let rows = [];
		rows.push({});

		this.agGrid.api.setPinnedTopRowData(rows);
	}

	title = 'AGGrid';

	paginationPageSize = 10;

	public localidades: {
		name: string;
		code: number;
		level: string;
	}[] = distritosConcelhosFreguesias;

	public editType = 'fullRow';

	public frameworkComponents = {
		acaoRenderer: AcaoRenderer,
		acaoRenderer2: AcaoRenderer2,
		newRowRenderer: NewRowRenderer,
	};

	columnDefs = [
		{
			headerName: 'Nome',
			field: 'name',
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
			colId: 'acao',
			cellRendererSelector: function (params) {
				let beforeEdit = {
					component: 'acaoRenderer',
				};

				let afterEdit = {
					component: 'acaoRenderer2',
				};

				let editingCells = params.api.getEditingCells();

				let isRowEditing = editingCells.some((cell) => {
					return cell.rowIndex === params.node.rowIndex;
				});

				if (!isRowEditing) {
					return beforeEdit;
				} else {
					return afterEdit;
				}
			},
		},
	];

	onCellClicked(params) {
		if (
			params.column.colId === 'acao' &&
			params.event.target.dataset.acao
		) {
			let action = params.event.target.dataset.acao;

			if (action === 'editar') {
				console.log('Editing data:');
				console.log(params.data);

				params.api.startEditingCell({
					rowIndex: params.node.rowIndex,
					colKey: params.columnApi.getDisplayedCenterColumns()[0]
						.colId,
				});
			} else if (action === 'eliminar') {
				console.log('Deleting:');
				console.log(params.data);

				params.api.applyTransaction({
					remove: [params.node.data],
				});
			} else if (action === 'guardar') {
				if (this.newRow) {
					this.newRow = false;
				}
				params.api.stopEditing(false);

				console.log('Saving data:');
				console.log(params.data);
			} else if (action === 'cancelar') {
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
		} else {
			if (params.event.target.dataset.newrow === 'true') {
				this.newRow = true;
				params.api.applyTransaction({
					add: [{}],
					addIndex: 0,
				});

				params.api.startEditingCell({
					rowIndex: params.node.rowIndex,
					colKey: params.columnApi.getDisplayedCenterColumns()[0]
						.colId,
				});
			}
		}
	}

	ngAfterViewInit() {
		this.pinRow();
	}

	onRowEditingStarted(params) {
		params.api.refreshCells({
			columns: ['acao'],
			rowNodes: [params.node],
			force: true,
		});
	}

	onRowEditingStopped(params) {
		if (this.newRow) {
			this.newRow = false;
		}
		params.api.refreshCells({
			columns: ['acao'],
			rowNodes: [params.node],
			force: true,
		});
	}
}
