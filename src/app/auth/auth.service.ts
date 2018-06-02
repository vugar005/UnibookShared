import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
@Injectable()
export class AuthService {
  constructor() {}
  getToken(): Observable<any> {
    return  of(localStorage.getItem('uni_token'));

  }
}
