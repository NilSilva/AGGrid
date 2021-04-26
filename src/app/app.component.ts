import { AfterViewInit, Component, ViewChild } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { AcaoRenderer } from './acao-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { NewRowRenderer } from './new-row-renderer.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;

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
			cellRenderer: 'acaoRenderer',
		},
	];

	onCellClicked(params) {
		console.log('Cell clicked.');
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
				params.api.stopEditing(false);

				console.log('Saving data:');
				console.log(params.data);
			} else if (action === 'cancelar') {
				params.api.stopEditing(true);
			} else {
				params.api.stopEditing(true);
			}
		} else {
			if (params.event.target.dataset.newrow === 'true') {
				let x = params.api.applyTransaction({
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
		params.api.refreshCells({
			columns: ['acao'],
			rowNodes: [params.node],
			force: true,
		});
	}
}
