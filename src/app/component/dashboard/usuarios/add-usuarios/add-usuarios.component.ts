import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  name !: string;
  phoneNumber !: string;
  mail !: string;
  identification !: string;
  birthdate !: Date;
  qualification !: string;
  uid !: string;
  buttonName !: string;



  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddUsuariosComponent>
  ) {
      this.title = data.title;
      this.uid = data.uid;
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.mail = data.mail;
      this.identification = data.identification;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      uid: [this.uid, []],
      name : [this.name, [Validators.required]],
      phoneNumber : [this.phoneNumber, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.mail, [Validators.required, Validators.email]],
      cedula : [this.identification, [Validators.required]],
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerUsuario() {
    this.dialogRef.close(this.form.value);
  }

}
