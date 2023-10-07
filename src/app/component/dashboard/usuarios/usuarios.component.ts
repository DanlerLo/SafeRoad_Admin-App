import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/shared/model/Usuarios';
import { DataService } from 'src/app/shared/service/data.service';
import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';
import { DeleteusuarioComponent } from './delete-usuarios/delete-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  ususariossArr: any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'mail', 'gender', 'isAviable', 'action'];
  dataSource!: MatTableDataSource<Usuarios>;
  selectedGender: string = '';
  selectedAvailability: boolean | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  addUsuarios() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Registrar Usuario',
      buttonName: 'Registrar'
    }

    const dialogRef = this.dialog.open(AddUsuariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.addUsuarios(data);
        this.openSnackBar("Registro exitoso.", "OK")
      }
    })
  }

  //Usuarios
  editUsuario(row: any) {
    if (row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Editar Usuario";
    dialogConfig.data.buttonName = "Actualizar";
    dialogConfig.data.phoneNumber = row.phoneNumber;

    const dialogRef = this.dialog.open(AddUsuariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.updateUsuarios(data);
        this.openSnackBar("Se ha actualizado.", "OK")
      }
    })
  }

  deleteUsuario(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Eliminar Usuario',
      usuarioName: row.name
    }

    const dialogRef = this.dialog.open(DeleteusuarioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.deleteUsuarios(row.id);
        this.openSnackBar("Usuario eliminado .", "OK")
      }
    })
  }

  getAllUsuarios() {
    this.dataApi.getAllUsuarios().subscribe(res => {
      this.ususariossArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.ususariossArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewUsuario(row: any) {
    window.open('/dashboard/usuarios/' + row.id, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.selectedGender !== '') {
      this.dataSource.data = this.ususariossArr.filter(user => user.gender === this.selectedGender);
    } else {
      this.dataSource.data = this.ususariossArr;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
