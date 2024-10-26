import {
  Component, OnInit,
} from "@angular/core";
import {Router, RouterModule} from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import {Button} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {PanierService} from "./shared/services/panier.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, Button, BadgeModule],
})
export class AppComponent implements OnInit{
  title = "ALTEN SHOP";
  badgeNumber : number = 0;
  constructor(private router: Router, private panierService : PanierService) {}
  voirPanier() {
    this.router.navigate(['/panier'])
  }

  ngOnInit(): void {
    this.panierService.panierCount$.subscribe(count => {
      this.badgeNumber = count;
    });
  }
}
