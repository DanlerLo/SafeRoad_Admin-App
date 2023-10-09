import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/shared/model/Usuarios';
import { DataService } from 'src/app/shared/service/data.service';

interface WorkPerformed {
  cost: number;
  mechanic: string;
  name: string;
}

@Component({
  selector: 'app-view-mecanico',
  templateUrl: './view-mecanico.component.html',
  styleUrls: ['./view-mecanico.component.css'],
})
export class ViewMecanicoComponent implements OnInit {
  id!: any;
  mecanicoObj!: any;
  dataSourceWork!: MatTableDataSource<any>;
  allMecanicos: Usuarios[] = [];
  displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'adress',
    'gender',
    'mail',
    'action',
  ];
  displayedColumnsWork: string[] = ['cost', 'mechanic', 'name'];
  dataSource!: MatTableDataSource<Usuarios>;
  workPerformed: WorkPerformed[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataService,
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getMecanicoById();
    this.getWorkPerformed(this.id);
  }

  getMecanicoById() {
    this.dataApi.getMecanicoById(this.id).subscribe((res) => {
      this.mecanicoObj = res;
      console.log(this.mecanicoObj);
    });
  }

  getWorkPerformed(mechanic: string) {
    this.firestore
      .collection('workPerformed')
      .valueChanges()
      .subscribe((res: unknown[]) => {
        console.log(res);
        this.workPerformed = (res as WorkPerformed[]).filter(
          (work) => work.mechanic === mechanic
        );
        this.dataSourceWork = new MatTableDataSource(this.workPerformed);
        if (this.paginator) {
          this.dataSourceWork.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSourceWork.sort = this.sort;
        }
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
