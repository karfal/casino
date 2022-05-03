import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

// MODELS
import { User } from "../models/user";

@Injectable()
export class UserService {

  user$: BehaviorSubject<User | null>;

  constructor() {
    this.user$ = new BehaviorSubject<User | null>(null);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
