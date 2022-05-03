import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

// MODELS
import { Menu, MenuItem } from "../models/menu";

@Injectable()
export class MenuService {

  menuToggled$: BehaviorSubject<boolean>;

  private readonly mainMenuUrl = "assets/main-menu.mock-data.json";
  private readonly menuUrl = "assets/";

  constructor(private http: HttpClient) {
    this.menuToggled$ = new BehaviorSubject<boolean>(false);
  }

  getMainMenu(): Promise<Menu[]> {
    return this.http.get<Menu[]>(this.mainMenuUrl).toPromise();
  }

  getMenu(section: string): Promise<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.menuUrl}` + section + "-menu.mock-data.json").toPromise();
  }
}
