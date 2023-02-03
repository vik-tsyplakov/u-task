import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Validation from './../utils/validation';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.css'],
})
export class PasswordValidationComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            //Validators.pattern('^[0-9]+$'), // password is easy > Only digits  +
            //Validators.pattern('^[a-zA-Z]+$'), // password is easy > Only letters +
            //Validators.pattern('^[#?!@$%^&*-]+$'), // password is easy > Only symbols +
            //Validators.pattern('^[A-Za-z0-9]+$'), // password is medium > Only letters and numbers +
            //Validators.pattern('^(?=.*[A-Za-z])(?=.*[@$!%*#?&^])[A-Za-zd@$!%*#?&^]{8,}$'), // password is medium > Only letters and symbols ++

            Validators.pattern('^(D [^0-9])+$'), // password is medium >  Only numbers and symbols ??

            //Validators.pattern('^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), // password is strong >  Password must exceed minimum eight characters, at least one letter, one symbol and one number ++
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
