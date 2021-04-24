import { AfterViewInit, Component, ViewChild } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { AcaoRenderer } from './acao-renderer.component';
import { AgGridAngular } from "ag-grid-angular";
import{ NewRowRenderer } from './new-row-renderer.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit{
	@ViewChild('agGrid') agGrid: AgGridAngular;

	onAddRow(){
		let rows = [];
		rows.push(this.agGrid.api.getRowNode('0'));

		this.agGrid.api.applyTransaction({
			remove: [this.agGrid.api.getRowNode('0').data],
		});

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
		newRowRenderer: NewRowRenderer
	};

	columnDefs = [
		{
			headerName: 'Nome',
			field: 'name',
			sortable: true,
			editable: true,
			width: 700,
			colSpan: function(params){
				if(params.node.rowIndex == 0){
					return 4;
				} else {
					return 1;
				}
			},
			cellRendererSelector: function(params){
				if(params.node.rowIndex == 0){
					return {
						component: 'newRowRenderer'
					}
				} else {
					return null;
				}
			}
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
					colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
				});
			} else if (action === 'eliminar') {
				console.log('Deleting:');
				console.log(params.data);

				params.api.applyTransaction({
					remove: [params.node.data],
				});
			} else if (action === 'guardar') {
				console.log('Saving data:');
				console.log(params.data);
				console.log(params.data.name);

				params.api.stopEditing(false);
			} else if (action === 'cancelar') {
				params.api.stopEditing(true);
			} else {
				params.api.stopEditing(true);
			}
		} /* else {
			if (params.event.target.dataset.newRow) {
				params.api.applyTransaction({
					add: {
						name: "aaaaaaaa",
						code: 0,
						level: "1"
					}
				});
			}
		} */
	}

	ngAfterViewInit() {
		this.onAddRow();
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

	newRow(event){
		this.newRow({name: "nil", code: 0, level: "1"});
		console.log(this.localidades);

	}
}
