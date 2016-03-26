import { Component, View } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink } from 'angular2/router';
import { HomeComponent } from './modules/home/home.component';
import {AwayComponent} from './modules/away/away.component';

@Component({
    selector: 'main-app'
})

@View({
    templateUrl: '../html/app.component.html',
    directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home',  component: HomeComponent, useAsDefault: true },
    { path: '/Away', name: 'Away',  component: AwayComponent }
    // { path: '/utils/:id', name: 'Utils', component: UtilsComponent }
])

export class AppComponent { }

//test