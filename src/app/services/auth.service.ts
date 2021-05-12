import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) { }

  getUser(): Observable<string | null> {
    return this.user$.asObservable();
  }

  private setUser(user: string | null): void {
    this.user$.next(user);
  }

  login(user: string): void {
    this.setUser(user);
    this.router.navigateByUrl('/library');
  }

  logout(): void {
    this.setUser(null);
  }
}
