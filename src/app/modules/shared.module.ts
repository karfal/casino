import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// COMPONENTS
import { CasinoGameComponent } from "../components/casino-game/casino-game.component";
import { LastPlayedComponent } from "../components/last-played/last-played.component";
import { MenuItemComponent } from "../components/menu-item/menu-item.component";
import { DateComponent } from "../custom-forms/date/date.component";
import { ProviderDropdownComponent } from "../custom-forms/provider-dropdown/provider-dropdown.component";
import { TogglerComponent } from "../partials/toggler/toggler.component";

// PIPES
import { ImageSrcPipe } from "../pipes/image-src.pipe";
import { KeyValuePipe } from "../pipes/key-value.pipe";
import { ObjectValuePipe } from "../pipes/object-value.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    // COMPONENTS
    CasinoGameComponent,
    LastPlayedComponent,
    ProviderDropdownComponent,
    DateComponent,
    MenuItemComponent,
    TogglerComponent,
    // PIPES
    ImageSrcPipe,
    ObjectValuePipe,
    KeyValuePipe
  ],
  exports: [
    // COMPONENTS
    CasinoGameComponent,
    LastPlayedComponent,
    ProviderDropdownComponent,
    DateComponent,
    MenuItemComponent,
    TogglerComponent,
    // PIPES
    ImageSrcPipe,
    ObjectValuePipe,
    KeyValuePipe
  ]
})
export class SharedModule {
}
