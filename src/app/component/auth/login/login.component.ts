import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form !: FormGroup;
  email: any = '';
  password: any = '';

  constructor(
    private fb : FormBuilder,
    private authService: AuthService)
  {
      this.form = this.fb.group({
      email : [this.email, [Validators.required, Validators.email]],
      password : [this.password,[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.form.value.email, this.form.value.password);
  }

}
