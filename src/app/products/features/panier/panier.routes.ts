import {Routes} from "@angular/router";
import {PanierComponent} from "./panier.component";

export const PANIER_ROUTES: Routes = [
	{
		path: "panier",
		component: PanierComponent,
	},
	{ path: "**", redirectTo: "panier" },
];
