import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieManagerService {
  constructor(private cookieService: CookieService) {}

  // ✅ FIX: expiry was 9h but JWT lifetime is 10h — now aligned to 10h
  public setToken(token: string, name: string): void {
    const expires = new Date();
    expires.setHours(expires.getHours() + 10);
    this.cookieService.set(name, token, expires, '/');
  }

  public tokenExists(name: string): boolean {
    return this.cookieService.check(name);
  }

  public getToken(name: string): string | undefined {
    return this.cookieService.get(name);
  }

  public deleteToken(name: string): void {
    this.cookieService.delete(name, '/');
  }

  public tokenIsExistsWithPromise(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const exists = this.cookieService.check(name);
        exists ? resolve(true) : reject(false);
      } catch (error) {
        reject(false);
      }
    });
  }
}