import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-mecanico',
  templateUrl: './add-mecanico.component.html',
  styleUrls: ['./add-mecanico.component.css']
})
export class AddMecanicoComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  name !: string;
  phoneNumber !: string;
  email !: string;
  local !: string;
  cedula !: string;
  uid !: string;
  buttonName !: string;
  bio !: string;



  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddMecanicoComponent>
  ) {
      this.title = data.title;
      this.uid = data.uid;
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.email = data.email;
      this.local = data.local;
      this.cedula = data.cedula;
      this.bio = data.bio;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      uid: [this.uid, []],
      name : [this.name, [Validators.required]],
      phoneNumber : [this.phoneNumber, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      local : [this.local, [Validators.required]],
      cedula : [this.cedula, [Validators.required]],
      bio : [this.bio, [Validators.required]],
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerMecanico() {
    this.dialogRef.close(this.form.value);
  }

}
