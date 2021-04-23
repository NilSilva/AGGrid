import { Component } from '@angular/core';
import distritosConcelhosFreguesias from './distritosConcelhosFreguesias.json';
import { AcaoRenderer} from './acao-renderer.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'AGGrid';

	public localidades: {
		name: string;
		code: number;
		level: string;
	}[] = distritosConcelhosFreguesias;

	public editType = 'fullRow';

	public frameworkComponents = {
		acaoRenderer: AcaoRenderer,
	};

	columnDefs = [
		{
			headerName: 'Nome',
			field: 'name',
			sortable: true,
			editable: true,
			width: 700,
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
			width: 380,
			colId: 'acao',
			cellRenderer: 'acaoRenderer',
			cellRendererParams:{
				clicked: function(field: any){
					console.log(this);
				}
			}
		},
	];

	onCellClicked(params) {
		if (
			params.column.colId === 'acao' &&
			params.event.target.dataset.acao
		) {
			let action = params.event.target.dataset.acao;

			if (action === 'editar') {
				params.api.startEditingCell({
					rowIndex: params.node.rowIndex,
					colKey: params.columnApi.getDisplayedCenterColumns()[0]
						.colId,
				});
			}

			if (action === 'eliminar') {
				params.api.applyTransaction({
					remove: [params.node.data],
				});
			}

			if (action === 'guardar') {

				params.api.stopEditing(false);
			}

			if (action === 'cancelar') {
				params.api.stopEditing(true);
			}
		}
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
