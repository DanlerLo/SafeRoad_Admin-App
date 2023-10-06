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
  selector: 'app-view-mecanico',
  templateUrl: './view-mecanico.component.html',
  styleUrls: ['./view-mecanico.component.css']
})
export class ViewMecanicoComponent implements OnInit {

  id !: any;
  mecanicoObj !: any;
  allPatients : Usuarios[] = [];

  displayedColumns: string[] = ['name', 'phoneNumber', 'gender','mail','action'];
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
    this.getMecanicoById();
  }

  getMecanicoById() {
    this.dataApi.getMecanicoById(this.id).subscribe(res => {
      this.mecanicoObj = res;
    })
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
