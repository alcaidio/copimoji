import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private localStorage: LocalstorageService) {}

  add(key: string, data: any) {
    this.localStorage.setItem(key, JSON.stringify(data));
  }

  push(key: string, data: any) {
    const arr = this.get(key) ?? [];
    this.add(key, [...arr, { ...data, date: Date.now() }]);
  }

  get(key: string) {
    const data = this.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }
}
