import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid-community';

@Component({
	selector: 'highlight-component',
	template: `
		<p style="margin:0">{{part1}}<mark>{{part2}}</mark>{{part3}}</p>
	`,
})
export class HighlightRendererComponent implements ICellRendererAngularComp {
	public part1;
	public part2;
	public part3;

	agInit(params: ICellRendererParams): void {
		this.part1 = this.part2 = this.part3 = '';

		if (params.api.getFilterModel().name === undefined) {
			this.part1 = params.value;
		} else {
			this.separateStrings(params.value, params.api.getFilterModel().name.filter);
		}
	}

	refresh(params: ICellRendererParams): boolean {
		return false;
	}

	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}

	separateStrings(value, filter) {
		console.log(value + ' includes ' + filter + '? ' + value.toUpperCase().indexOf(filter.toUpperCase()));
		this.part1 = value.slice(0, value.toUpperCase().indexOf(filter.toUpperCase()));
		this.part2 = value.slice(value.toUpperCase().indexOf(filter.toUpperCase()), this.part1.length + filter.length);
		this.part3 = value.slice(this.part1.length + filter.length, value.length);
	}
}
