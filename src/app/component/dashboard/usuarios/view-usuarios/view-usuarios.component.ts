import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/shared/model/Usuarios';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuarioComponent implements OnInit {

  id !: any;
  usuarioObj !: any;
  allPatients : Usuarios[] = [];

  displayedColumns: string[] = ['name', 'mobile', 'gender','prescription','action'];
  dataSource!: MatTableDataSource<Usuarios>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService,
    private dialog : MatDialog,
    private _snackBar : MatSnackBar
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUsuarioById();
    this.getAllPatientsForDoctor();
  }

  getUsuarioById() {
    this.dataApi.getUsuarioById(this.id).subscribe(res => {
      this.usuarioObj = res;
    })
  }

  getAllPatientsForDoctor() {
    this.dataApi.getAllUsuarios().subscribe(res => {
      this.allPatients = res.map((e : any) => {
        const data = e.payload.doc.data();
        if(data.usuario_id == this.id) {
          data.patient_id = e.payload.doc.id;
          return data;
        }
      })

      this.allPatients = this.allPatients.filter(item => item != undefined);
      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
