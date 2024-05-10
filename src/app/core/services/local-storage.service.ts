import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class LocalStorageService {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T = string>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item) as T;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
