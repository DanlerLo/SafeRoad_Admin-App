import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-mecanico',
  templateUrl: './delete-mecanico.component.html',
  styleUrls: ['./delete-mecanico.component.css']
})
export class DeleteMecanicoComponent implements OnInit {
  mecanicoName !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeleteMecanicoComponent>
  ) {
      this.mecanicoName = data.mecanicoName;
      this.title = data.title;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteMecanico = true;
    this.dialogRef.close(deleteMecanico);
  }
}
