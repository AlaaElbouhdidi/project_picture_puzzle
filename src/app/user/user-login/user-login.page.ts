import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.loginForm.controls.email }

  get password() { return this.loginForm.controls.password }

  async submitForm(): Promise<void> {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Logging in...',
    });
    await loading.present();
    try {
      await this.userService.loginWithPassword(email, password);
      await loading.dismiss();
      this.loginForm.reset();
    } catch (e) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'default-alert',
        header: 'Error',
        message: e.message,
        buttons: ['Try again']
      });
      await alert.present();
      this.loginForm.reset();
    }
  }

}
