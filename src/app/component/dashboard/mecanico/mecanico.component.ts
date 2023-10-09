import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mecanico } from 'src/app/shared/model/Mecanico';
import { DataService } from 'src/app/shared/service/data.service';
import { AddMecanicoComponent } from './add-Mecanico/add-Mecanico.component';
import { DeleteMecanicoComponent } from './delete-Mecanico/delete-mecanico.component';

@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.component.html',
  styleUrls: ['./mecanico.component.css']
})
export class MecanicoComponent implements OnInit {

  mecanicossArr : any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'mail', 'local', 'adress','cedula','isAviable','action'];
  dataSource!: MatTableDataSource<Mecanico>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMecanicos();
  }

  addMecanico() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Registrar Mecanico',
      buttonName : 'Registrar'
    }

    const dialogRef = this.dialog.open(AddMecanicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addMecanico(data);
        this.openSnackBar("Registro exitoso.", "OK")
      }
    })
  }

  editMecanico(row : any) {
    if(row.uid == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Editar Mecanico";
    dialogConfig.data.buttonName = "Actualizar";
    dialogConfig.data.name = row.name;

    const dialogRef = this.dialog.open(AddMecanicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateMecanico(data);
        this.openSnackBar("Se ha actualizado.", "OK")
      }
    })
  }

  deleteMecanico(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Eliminar Mecanico',
      mecanicoName : row.name
    }

    const dialogRef = this.dialog.open(DeleteMecanicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deleteMecanico(row.id);
        this.openSnackBar("Mecanico eliminado .", "OK")
      }
    })
  }

  getAllMecanicos() {
    this.dataApi.getAllMecanicos().subscribe(res => {
      this.mecanicossArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.mecanicossArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewMecanico(row : any) {
    window.open('/dashboard/mecanico/'+row.id,'_blank');
  }
  getHistorialServicios(row: any) {
    window.open('/dashboard/workPerformed/' + row.id, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
