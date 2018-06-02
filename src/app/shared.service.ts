import {Injectable} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {UserFormData} from './shared/models/userFormData.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

@Injectable()
export class SharedService {
  URL: string;
  token: string;
  constructor(private snotifyService: SnotifyService,
              private authService: AuthService,
              private http: HttpClient) {
    this.URL = localStorage.getItem('uni_hostname');
  }

  createNotification(type: string, message: string, title = '') {
    switch (type) {
      case 'success':
        this.snotifyService.success(message, {
          timeout: 3000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        break;
      case 'error':
        this.snotifyService.error(message, title, {
          timeout: 3000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        break;
      case 'warning':
        this.snotifyService.warning(message, {
          timeout: 3000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        break;
    }
  }

  changeUserPassword(formData: UserFormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      })
    };
    const body = new HttpParams()
      .set('lastPassword', formData.lastPassword)
      .set('password', formData.password)
      .set('passwordConfirmation', formData.passwordConfirmation);
    return this.http.post(`${this.URL}/AdministrationRest/users/changePassword?token=${this.token}`, body, httpOptions);
  }
}
