import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private state: { [key: string]: any } = {};

  // Lưu state với key duy nhất
  setState(key: string, data: any) {
    this.state[key] = data;
  }

  // Lấy state
  getState(key: string) {
    return this.state[key];
  }

  // Xóa state (nếu cần)
  clearState(key: string) {
    delete this.state[key];
  }
}
