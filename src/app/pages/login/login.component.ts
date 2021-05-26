import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layouts/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;

  constructor(     public router: Router,  
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, public authService: AuthService , private formBuilder: FormBuilder
    ) {}
v

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)


    }  

  ngOnDestroy() {
  }

}
