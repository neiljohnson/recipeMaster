import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  get(id: string): any {
    return JSON.parse(window.sessionStorage.getItem(id));
  }

  put(id: string, data: any): void {
    window.sessionStorage.setItem(id, JSON.stringify(data));
  }

  remove(id: string): void {
    window.sessionStorage.removeItem(id);
  }

  clearAll(): void {
    window.sessionStorage.clear();
  }
}
