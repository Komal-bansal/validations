import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from '../validators/custom-validation';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  states = [ 'Delhi', 'Maharashtra', 'Haryana', 'Kerela', 'Punjab', 'Madhya Pradesh' ];
  userForm: FormGroup;
  // loader activated when submitting the file
  submitLoader = false;
  today: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initForm();
  }

  // initialize form
    initForm = () => {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, CustomValidators.emailValidator()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11) ]],
      date: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  // submitting form
  submit = () => {
    this.submitLoader = true;
    this.http.post<User>('https://posturl.com', this.userForm).subscribe(res => {
      this.submitLoader = false;
    }, error => {
      this.submitLoader = false;
      alert('error occured in submitting');
    });
  }

  get name() { return this.userForm.get('name'); }
  get date() { return this.userForm.get('date'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get state() { return this.userForm.get('state'); }

}
