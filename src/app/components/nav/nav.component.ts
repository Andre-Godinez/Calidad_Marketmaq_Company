import { Component, OnInit } from '@angular/core';
import { MisdatosService } from '../../services/misdatos.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  name_emp:any;
  img_emp:any;
  idempresa:any;
  idusuario:any;
  constructor(private _misdatosService:MisdatosService) {
    this.idempresa=JSON.parse(localStorage.getItem('client')).companyId;
    this.idusuario=JSON.parse(localStorage.getItem('client')).id;
    this.getdatosUsuario();
    this.getdatosEmpresa();
  }
  active2:boolean=false;
  datosUsuario:any;
  datosEmpresa:any;
  ngOnInit() {
    this.name_emp=JSON.parse(localStorage.getItem('client')).name;
    this.img_emp=JSON.parse(localStorage.getItem('client')).company.urlImage;

    // console.log(this.name_emp);
    // console.log(this.img_emp);
    
  }


  getdatosUsuario(){
    let datos = this._misdatosService.getDatosPersona(this.idusuario)
                      .subscribe(res=>{
                        this.datosUsuario=res;
                        console.log(this.datosUsuario);
                        datos.unsubscribe();
                      })
  }
  getdatosEmpresa(){
    let datosEmpr = this._misdatosService.getDatosEmpresa(this.idempresa)
                      .subscribe(res=>{
                        this.datosEmpresa=res;
                        console.log(this.datosEmpresa);
                        datosEmpr.unsubscribe();
                      })
  }
  logout(){
    localStorage.removeItem('client');
  }
  funcionActive(event){
    event.target.classList.remove('collapsed');
    this.active2=true;
    // console.log(this.active2);
  }
}
