import { Injectable } from '@angular/core';
import { UbigeoStatic } from '../data/ubigeo.class';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from './http-client.service';
import { CONFIGPROD } from './config/config.constant';
import 'rxjs/add/operator/map';

@Injectable()

export class MisdatosService {
  private url: string = CONFIGPROD.url;
  constructor(private http: HttpClient) {
  }

  changeDatosPersona(idusuario,objpersona){
    let ruta = `${this.url}/usuarios/${idusuario}`;
    let data = JSON.stringify(objpersona);
    return this.http.put(ruta, objpersona)
            .map(res => {
                const data1 = res.json();
                return data1;
            })
  }
  getDatosPersona(idusuario){
    let ruta = `${this.url}/usuarios/${idusuario}`;
    return this.http.get(ruta)
            .map(res=>res.json());

  }
  changeDatosEmpresa(idempresa,objempresa){
    let ruta = `${this.url}/companies/${idempresa}`;
    let data = JSON.stringify(objempresa);
    return this.http.put(ruta, objempresa)
            .map(res => {
                const data1 = res.json();
                return data1;
            })
  }
  getDatosEmpresa(idempresa){
    let ruta = `${this.url}/companies/${idempresa}`
    return this.http.get(ruta)
            .map(res=>res.json());
  }
  verificarUrl(urlempresa){
    let ruta = `${this.url}/companies-urlperfil/${urlempresa}`
    return this.http.get(ruta)
          .map(res=>res.json());
  }
  getCountry(idcountry){
    let ruta = `${this.url}/countries/${idcountry}`
    return this.http.get(ruta)
            .map(res=>res.json());
  }
}
