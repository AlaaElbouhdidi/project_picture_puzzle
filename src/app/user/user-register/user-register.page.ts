import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {AlertController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  get email() { return this.registerForm.controls.email }

  get password() { return this.registerForm.controls.password }

  async submitForm(): Promise<void> {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    try {
      await this.userService.register(email, password);
      await loading.dismiss();
      this.registerForm.reset();
      const successAlert = await this.alertController.create({
        cssClass: 'default-alert',
        header: 'Success',
        message: 'Account successfully created',
        buttons: [
          {
            text: 'Login',
            handler: () => {
              this.router.navigate(['/user-login']);
            }
          }
        ]
      });
      await successAlert.present();
    } catch (e) {
      await loading.dismiss();
      const errorAlert = await this.alertController.create({
        cssClass: 'default-alert',
        header: 'Error',
        message: e.message,
        buttons: ['Try again']
      });
      await errorAlert.present();
      this.registerForm.reset();
    }
  }

}
