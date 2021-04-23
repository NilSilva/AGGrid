import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'acao-component',
	templateUrl: './acao-renderer.component.html',
})
export class AcaoRenderer implements ICellRendererAngularComp {
	public params: any;

	refresh(params: ICellRendererParams): boolean {
		return true;
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
	}

	agInit(params: any): void {
		this.params = params;
	}

	btnClickedHandler(event) {
		this.params.clicked(this.params.value);
	}
}
