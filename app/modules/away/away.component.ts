import {Component, View} from 'angular2/core';
import { ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'away-component',
    templateUrl: '../../html/away/away.component.html'
})

export class AwayComponent {	
	status: string = 'IsAway';
}