import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as pdfMake from 'pdfmake/build/pdfMake'; // Importa pdfMake
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Importa pdfFonts

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

  constructor(private http: HttpClient) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  insertarEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerEmpleados(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-empleados`;
    return this.http.get<any[]>(url);
  }

  obtenerEmpleadoPorCedula(cedula: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-empleado/${cedula}`;
    return this.http.get<any[]>(url);
  }

  obtenerRolesEmpleado(idEmpleado: any): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-roles-empleado/${idEmpleado}`;
    return this.http.get<any[]>(url);
  }

  obtenerAnticiposEmpleado(idEmpleado: any, fecha: any): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-anticipos-empleado`;

    // Agrega los parámetros a la URL
    const params = new HttpParams()
      .set('idEmpleado', idEmpleado.toString())
      .set('fecha', fecha);

    return this.http.get<any[]>(url, { params })
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  modificarEstadoEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-estado-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  reincorporarEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/reincorporar-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  modificarSueldoEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-sueldo-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  imprimirRol(
    nombres: any,
    valor: any,
    fechaInicio: any,
    fechaPago: any,
    observaciones: any,
    cedula: any, dias: any,
    anticiposSumados: any,
    esSoloImpreso: boolean,
    ) {
    // Espera 1 segundo antes de continuar
    setTimeout(() => {
      const negocio = 'NIVEL 45';
      const direccion = 'Mariscal Lamar 21-110 y Luis Pauta'
      const contabilidad = 'No';
      const ruc = '0102134632';
      const imgUrl = "data:image/png;base64,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";
      //finImagen
      let necesitaPagar = 0;
      let anticiposPagados = 0;
      let cantidadRecibida = 0;

      if (esSoloImpreso){
        necesitaPagar = valor + anticiposSumados;
        anticiposPagados = anticiposSumados;
        cantidadRecibida = valor;
      }else{
        necesitaPagar = valor;
        anticiposPagados = anticiposSumados;
        cantidadRecibida = valor - anticiposSumados;
      }

      const documentDefinition: any = {
        pageSize: 'A4',
        styles: {
          width: 595.28,
          height: '100%',
          header: {
            bold: true,
            fontSize: 12,
            margin: [0, 5, 0, 10],
          },
        },
        content: [
          {
            columns: [
              {
                width: '50%',
                stack: [
                  {
                    image: imgUrl,
                    width: 50,
                    height: 50,
                  },
                  {},
                  negocio,
                  'Dir: ' + direccion,
                  'Obligado a llevar contabilidad: ' + contabilidad
                ],
              },
              {
                width: '*',
                stack: [
                  'RUC: ' + ruc,
                  {
                    text: 'Fecha de inicio. ' + this.formatearFecha(fechaInicio + ''),
                    fontSize: 15,
                    bold: true
                  },
                  {
                    text: 'Fecha de pago. ' + this.formatearFecha(fechaPago + ''),
                    fontSize: 15,
                    bold: true
                  },
                ]
              }
            ],
          },
          //Datos del empleado
          {
            layout: 'noBorders',
            table: {
              headerRows: 0,
              widths: ['auto'],
              body: [
                [
                  { text: 'Empleado: ' + nombres, alignment: 'left' },
                ],
                [
                  { text: 'Cedula/RUC: ' + cedula, alignment: 'left' },
                ]
              ]
            }
          },
          //Detalle del pago
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', '*'],
              body: [
                ['Dias trabajados', 'valor A Cancelar', 'Observaciones'],
                [dias, valor, observaciones]
              ],
            }
          },
          {
            columns: [
              {
                widths: ['*', '*'],
                stack: [
                  {
                    widths: ['*', '*'],
                    stack: [
                      {
                        columns: [
                          {
                            stack: [
                              { text: '', alignment: 'center', margin: [0, 0, 0, 40] },
                              { text: '____________________________', alignment: 'center' },
                              { text: 'ENTREGUE CONFORME', alignment: 'center' },
                            ]
                          },
                          {
                            stack: [
                              { text: '', alignment: 'center', margin: [0, 0, 0, 40] },
                              { text: '____________________________ ', alignment: 'center' },
                              { text: 'RECIBI CONFORME', alignment: 'center' },
                            ]
                          },
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                width: 'auto',
                align: 'right',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    ['Sueldo: ', { text: necesitaPagar, alignment: 'right' }],
                    ['Anticipos: ', { text: anticiposPagados, alignment: 'right' }],
                    ['Recibe: ', { text: cantidadRecibida, alignment: 'right' }],
                  ],
                },
              },
            ]
          }
        ],
      };
      try {
        pdfMake.createPdf(documentDefinition).download('Rol de pago:' + nombres);
      } catch (error) {
        console.error('Error al crear el PDF:', error);
      }

    }, 500);
  }

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }
}
