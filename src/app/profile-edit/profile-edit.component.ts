import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared.service';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserFormData} from '../shared/models/userFormData.model';
import * as globalVars from '../app.globals';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  userForm: FormGroup;
  hide = true;
  hide2 = true;
  hide3 = true;
  URL: string;
  constructor(private http: HttpClient, private form: FormBuilder,
              private sharedService: SharedService,
  ) {
    const hostname = window.location.hostname;
    console.log(hostname);
    this.URL =  hostname !== 'localhost' ? `http://${hostname}` : globalVars.baseUrl;
    if (this.URL === 'http://192.168.1.78') {
      this.URL = 'http://192.168.1.78:8082';
    }
  }

  ngOnInit() {
    const hash = location.hash;
    const token = hash.split('=')[1];
    this.sharedService.token = token;
    this.userForm = this.form.group({
      'lastPassword': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'passwordConfirmation': new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const picked: UserFormData =  (({ lastPassword, password, passwordConfirmation }) => ({lastPassword, password, passwordConfirmation}))(formData);
      this.sharedService.changeUserPassword(picked)
        .subscribe((res: any) => {
          if (res.code === 'ERROR') {
            return  this.sharedService.createNotification('error', 'Server Xətası', 'Xəta');
          } else if (res.code === 'OK') {
            setTimeout(() => window.top.location.href = `${this.URL}/ROS/login`, 1000);
            this.sharedService.createNotification('success', 'Şifrə dəyişdirildi');
          } else if (res.code !== 'OK') {
            this.sharedService.createNotification('error', res.code);
          }
        }, er => this.sharedService.createNotification('error', 'Xəta',  er));
    }
  }
  getErrorMessage() {
    return this.userForm.get('lastPassword').hasError('required') && 'Indiki Şifrə daxil edilməyib';
  }
  onGoBack() {
    window.history.back();
  }

}
