import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuarios.component.html',
  styleUrls: ['./delete-usuarios.component.css']
})
export class DeleteusuarioComponent implements OnInit {
  usuariosName !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeleteusuarioComponent>
  ) {
      this.usuariosName = data.usuariosName;
      this.title = data.title;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteUsuario = true;
    this.dialogRef.close(deleteUsuario);
  }
}
