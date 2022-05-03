import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

// MODELS
import { Provider } from "../../models/provider";

@Component({
  selector: "provider-dropdown",
  template: `
    <span>Select providers...</span>
    <button (click)="toggle()">&#8801;</button>

    <ul>
      <li *ngFor="let provider of providers">
        <button [ngClass]="{'active': provider.selected}" (click)="addToParams(provider)">{{provider.name}}</button>
      </li>
    </ul>
  `,
  styleUrls: ["./provider-dropdown.component.scss"]
})
export class ProviderDropdownComponent implements OnInit {

  @HostBinding("class.toggled")
  toggled: boolean;

  @Input()
  providers: Provider[];

  hasParam: boolean;
  private selected: any[];

  constructor(private route: ActivatedRoute, private router: Router, private eRef: ElementRef) {
    this.selected = [];
    this.toggled = false;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(res => {
      this.hasParam = res.has("provider");

      this.providers?.map((p: Provider) => p.selected = res.getAll("provider").includes(p.name));
    });
  }

  @HostListener("document:click", ["$event"])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.toggled = false;
    }
  }

  addToParams(item: Provider) {
    if (!this.hasParam) {
      this.selected = [];
    }

    this.selected.includes(item.name) ? this.selected.splice(this.selected.indexOf(item.name), 1) : this.selected.push(item.name);

    this.router.navigate([], {queryParams: {provider: this.selected}, queryParamsHandling: "merge"});
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
