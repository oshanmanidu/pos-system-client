import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieManagerService {
  constructor(private cookieService: CookieService) {}

public setToken(token: string, name:string): void {
  const expires = new Date();
  expires.setHours(expires.getHours() + 9); // Set expiration time to 1 hour
  this.cookieService.set(name, token, expires, '/'); // Set the cookie with the specified name, value, expiration, and path 
}

public tokenExists(name:string): boolean {
  return this.cookieService.check(name);
}

public getToken(name:string): string | undefined {
  return this.cookieService.get(name);
}

public tokenIsExistsWithPromise(name:string): Promise<boolean> {

  return new Promise((resolve, reject) => {
    try {const exists = this.cookieService.check(name);
      if (exists) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error) {
      reject(false);
    }
  });
}



}
