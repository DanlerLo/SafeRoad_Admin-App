import { Component, AfterViewInit  } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as Highmaps from 'highcharts/highmaps';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})

export class ModuloComponent implements AfterViewInit {
  totalUsers: number=0;
  totalMecanicos: number=0;
  totalMecanicosActivos: number = 0;
  totalUsuariossActivos: number = 0;
  totalMembresia: number=0;
  totalGanancias: number = 0;
  generosMecanicos = 0;
  generosUsuarios= 0;
  hombresMecanicos = 0;
  mujeresMecanicos = 0;
  hombresClientes = 0;
  mujeresClientes = 0;
  totalServicios = 0; 
  pending = 0;
  totalOk = 0;
  totalNoOk = 0;
  totalIds = 0; 
  totalCalificaciones = 0; 
  totalSolicitudes= 0;

  mechanicRatings: { mechanicId: string, qualification: number }[] = [];

  constructor(private firestore: AngularFirestore) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit()  {
    interface Mecanico {
      isAviable: boolean;
    }
    interface Usuarios {
      isAviable: boolean;
    }
    interface MecanicoData {
      gender: string;
    }
    interface ClienteData{
      gender: string;
    }
    interface ServicioData{
      customerAcceptance: string;
    }
    interface Membresia{
      precio: any;
    }
    interface MechanicQualification {
      mechanicId: string;
      qualification: any;
    }

    interface RequestData{
      status: string;
    }
    
    this.createProfitsChart();
    this.fechaUsuarios();
    this.fechaMecanicos();

    this.firestore.collection('users').valueChanges().subscribe(users => {
    this.totalUsers = users.length;
    if (this.totalUsers && this.totalMecanicos) {
      this.createChart(this.totalUsers, this.totalMecanicos);
    }});

    this.firestore.collection('mecanicos').valueChanges().subscribe(mecanicos => {
    this.totalMecanicos = mecanicos.length;
    if (this.totalUsers && this.totalMecanicos) {
      this.createChart(this.totalUsers , this.totalMecanicos);
    }});

    this.firestore.collection<Mecanico>('mecanicos').valueChanges().subscribe(mecanicos => {
    this.totalMecanicosActivos = mecanicos.filter(mecanico => mecanico.isAviable === true).length;
    });

    this.firestore.collection<Usuarios>('users').valueChanges().subscribe(users => {
    this.totalUsuariossActivos = users.filter(users => users.isAviable === true).length;
    });

    this.firestore.collection<Membresia>('membresias').valueChanges().subscribe(membresias => {
      console.log('Todas las membresías:', membresias);
      this.totalGanancias = membresias.reduce((total, membresia) => {
        return total + parseFloat(membresia.precio);
      }, 0);
      console.log('Total de ganancias:', this.totalGanancias);
    });

    this.firestore.collection<MecanicoData>('mecanicos').valueChanges().subscribe(mecanicos => {
      const generosMecanicos = mecanicos.map(mecanico => mecanico.gender);
      const hombresMecanicos = generosMecanicos.filter(genero => genero === 'Masculino').length;
      const mujeresMecanicos = generosMecanicos.filter(genero => genero === 'Femenino').length;
      this.createPieChartMecanicos(hombresMecanicos, mujeresMecanicos);
    });
    
    this.firestore.collection<ClienteData>('users').valueChanges().subscribe(users => {
      const generosUsuarios = users.map(user => user.gender);
      const hombresClientes = generosUsuarios.filter(genero => genero === 'Masculino').length;
      const mujeresClientes = generosUsuarios.filter(genero => genero === 'Femenino').length;
      this.createPieChartUsers(hombresClientes, mujeresClientes);
    });

    this.firestore.collection<ServicioData>('services').valueChanges().subscribe(service => {
      const totalServicios = service.map(service => service.customerAcceptance);
      const totalOk = totalServicios.filter(servicio => servicio === 'Ok').length;
      const pending = totalServicios.filter(servicio => servicio === 'pending').length;
      const totalNoOk = totalServicios.filter(servicio => servicio === 'NoOk').length;
      this.createBarChartServices(totalOk, totalNoOk, pending);
    });

    this.firestore.collection<RequestData>('requests').valueChanges().subscribe(soli => {
      const totalSolicitudes = soli.map(soli => soli.status);
      const totlaPending = totalSolicitudes.filter(solicitud => solicitud === 'pending').length;
      const totalInProcess = totalSolicitudes.filter(solicitud => solicitud === 'inProcess').length;
      const totalBilling = totalSolicitudes.filter(solicitud => solicitud === 'inBilling').length;
      const totalCustomer = totalSolicitudes.filter(solicitud => solicitud === 'inCustomerAcceptance').length;
      const totalSelecting = totalSolicitudes.filter(solicitud => solicitud === 'selecting').length;
      const totalFinished = totalSolicitudes.filter(solicitud => solicitud === 'finished').length;
      const totalRejected = totalSolicitudes.filter(solicitud => solicitud === 'inBilling').length;
      this.createColumnChartSolicitudes(totlaPending, totalInProcess, totalBilling, totalCustomer, totalSelecting, totalFinished, totalRejected);
    });

    combineLatest([
      this.firestore.collection<MechanicQualification>('mechanicQualifications').valueChanges(),
      this.firestore.collection('mecanicos').get()
    ]).subscribe(([qualifications, snapshot]) => {
      console.log('AQUI DEBEN APARECERLAS CALIFICACIONES', qualifications)
      const mechanicRatingsMap: { [mechanicId: string]: number[] } = {};
      qualifications.forEach(qualification => {
        if (!mechanicRatingsMap[qualification.mechanicId]) {
          mechanicRatingsMap[qualification.mechanicId] = [];
        }
        mechanicRatingsMap[qualification.mechanicId].push(qualification.qualification);
      });
      this.mechanicRatings = Object.keys(mechanicRatingsMap).map(mechanicId => {
        const ratings = mechanicRatingsMap[mechanicId];
        const qualification = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
        return { mechanicId, qualification };
      });
    
      const mechanicNames: { [mechanicId: string]: string } = {};
      snapshot.forEach(doc => {
        const mechanicData = doc.data() as { uid: string, name: string };
        mechanicNames[mechanicData.uid] = mechanicData.name;
      });
    
      const chartData = this.mechanicRatings.map(item => ({
        name: mechanicNames[item.mechanicId],
        y: item.qualification
      }));
    
      this.createBarChart(chartData);
    });
}

createChart(totalUsers: number, totalMechanics: number) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Clientes y mecánicos'
    },
    series: [
      {
        name: 'Total',
        type: 'pie',
        data: [
          ['Usuarios', totalUsers],
          ['Mecánicos', totalMechanics]
        ] }]};
  Highcharts.chart('container', chartOptions);
}

createProfitsChart() {
  interface Membresias {
    precio: any;
    fechaInicial: Date;
  }
  this.firestore.collection<Membresias>('membresias').valueChanges().subscribe(data => {
    const chartData = data.map(item => {
      console.log('Fecha:', item.fechaInicial, 'Precio:', item.precio);
      return {
        x: new Date(item.fechaInicial).getTime(),
        y: parseFloat(item.precio)
      };
    });
    console.log(chartData);
    const chartOptionsM: Highcharts.Options = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Ganancias',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Fecha',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Monto',
        },
      },
      series: [
        {
          name: 'Ganancias',
          type: 'column',
          data: chartData,
          dataLabels: {
            enabled: true,
            format: '{y:.2f} $',
          },
        },
      ],
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
    };
    console.log('Creando el gráfico');
    Highcharts.chart('profits-container', chartOptionsM);
  });
}

  fechaUsuarios(){
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Usuarios creados'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Número de usuarios'
      }},
    series: [
      {
        name: 'Usuarios',
        type: 'column',
        data: [
          ['1 de enero', 1],
          ['3 de enero', 1],
        ]}]};
  Highcharts.chart('fechaUsuarios', chartOptions);
}

  fechaMecanicos(){
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Mecanicos creados'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Número de Mecanicos'
      }},
    series: [
      {
        name: 'Mecanicos',
        type: 'column',
        data: [
          ['1 de enero', 3],
          ['2 de enero', 1],
          ['3 de enero', 2],
          ['4 de enero', 1]
        ]}]};
  Highcharts.chart('fechaMecanicos', chartOptions);
}

generoMChart(){
}

createPieChartMecanicos(hombres: number, mujeres: number) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Género de Mecánicos'
    },
    series: [
      {
        name: 'Cantidad',
        type: 'pie',
        data: [
          ['Femenino', mujeres],
          ['Masculino', hombres]
        ]
      }
    ]
  };
  Highcharts.chart('containerMecanicos', chartOptions);
}

createPieChartUsers(hombres: number, mujeres: number) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Género de Clientes'
    },
    series: [
      {
        name: 'Cantidad',
        type: 'pie',
        data: [
          ['Femenino', mujeres],
          ['Masculino', hombres]
        ]
      }
    ]
  };
  Highcharts.chart('containerUsers', chartOptions);
}

createBarChartServices(Ok:number, NoOk: number, pending: number){
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Servicios'
    },
    xAxis: {
      type: 'category'
    },
    series: [
      {
        name: 'Cantidad',
        type: 'column',
        data: [
          ['Terminado', Ok],
          ['No Terminado', NoOk],
          ['Pendiente', pending]
        ]
      }
    ]
  };
  Highcharts.chart('containerServices', chartOptions);
}

createBarChart(chartData: { name: string; y: number }[]) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Calificaciones Promedio de Mecánicos'
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Nombre del Mecánico' 
      },
      categories: chartData.map(item => { return item.name }),
      labels: {
        enabled: true
      }
    },
    yAxis: {
      title: {
        text: 'Calificación Promedio'
      }
    },
    series: [{
      name: 'Calificación Promedio',
      type: 'bar',
      data: chartData
    }]
  };
  Highcharts.chart('rating-container', chartOptions);
}

createColumnChartSolicitudes(
  pending: number,
  inProcess: number,
  inBilling: number,
  inCustomerAcceptance: number,
  selecting: number,
  finished: number,
  rejected: number
) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Estado de las Solicitudes'
    },
    xAxis: {
      categories: ['Pendiente', 'En proceso', 'En pago', 'Confirmación de cliente', 'Selección', 'Finalizado', 'Rechazado']
    },
    yAxis: {
      title: {
        text: 'Cantidad de Solicitudes'
      }
    },
    series: [
      {
        name: 'Solicitudes',
        type: 'column',
        data: [pending, inProcess, inBilling, inCustomerAcceptance, selecting, finished, rejected]
      }
    ]
  };

  Highcharts.chart('solicitud-chart-container', chartOptions);
}

}