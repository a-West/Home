import {Component, View} from 'angular2/core';
import { ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'home-component',
    templateUrl: '../../html/home/home.component.html'
})

export class HomeComponent {
	
	status: string = "IsHome"
}