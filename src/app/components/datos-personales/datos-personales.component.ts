import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MisdatosService } from '../../services/misdatos.service';
import { FileItem } from "../../models/file-item";
import { PublicarService } from '../../services/publicar.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  visible: boolean = false;
  btnguardar:boolean=true;
  misdatosdataconfig: any = {
        'activemodal': false,
        'titulo': 'Mensaje de Easymaq',
        'descripcion': 'En unos momentos le estaremos informando a su correo'

  };
  archivos: FileItem[] = [];

  iduser:any;
  idcompany:any;

  /*Formulario*/
  nombres:any;
  apellidos:any;
  dni:any;
  email1:any;
  email2:any;
  telefono1:any;
  telefono2:any;
  fechaNacimiento:any;
  datosPersonales:any;
  datosEmpresa:any;
  imagen:any;


  nombreEmpresa:any;
  webEmpresa:any;
  ruc:any;

  constructor(private _activatedRoute:ActivatedRoute, private _misDatosService:MisdatosService , private _publicarService:PublicarService) { }
  startDate = new Date(1990, 0, 1);
  ngOnInit() {
    this._activatedRoute.params
          .map(parametros=>parametros['id'])
          .subscribe(id=>{
            this.iduser=id;
            let datos=this._misDatosService.getDatosPersona(this.iduser)
                            .subscribe(res=>{
                              this.datosPersonales = res;
                              // console.log("datos:",this.datosPersonales);
                              this.nombres=this.datosPersonales.firstName;
                              this.apellidos=this.datosPersonales.lastName;
                              this.dni=this.datosPersonales.dni;
                              this.email1=this.datosPersonales.email;
                              this.email2=this.datosPersonales.emailAlternativo;
                              this.telefono1=this.datosPersonales.phone01;
                              this.telefono2=this.datosPersonales.phone02;
                              this.fechaNacimiento=this.datosPersonales.dateBirthday;
                              this.imagen=this.datosPersonales.urlPhoto;
                              datos.unsubscribe();
                            })
          
            this.idcompany=JSON.parse(localStorage.getItem('client')).companyId;
            console.log('idcompany' , this.idcompany);
            let datosEmp = this._misDatosService.getDatosEmpresa(this.idcompany)
                                    .subscribe(res=>{
                                      this.datosEmpresa=res;
                                      this.nombreEmpresa=this.datosEmpresa.name;
                                      this.webEmpresa=this.datosEmpresa.website;
                                      this.ruc=this.datosEmpresa.ruc;
                                      
                                    })
          })
    
   }

   confirm(texto:string){
    this.misdatosdataconfig.activemodal=true;
    this.misdatosdataconfig.descripcion=texto;
   }

  archivosImagenes(event) {
    this.archivos = event;
    // console.log(this.archivos);
    this.imagen=this.archivos[0].base64file;
  }

   guardar(){
     this.btnguardar=false;
     this.visible = true;
     let objPersona = {
      firstName:this.nombres,
      lastName:this.apellidos,
      dni:this.dni,
      email:this.email1,
      emailAlternativo:this.email2,
      phone01:this.telefono1,
      phone02:this.telefono2,
      dateBirthday:this.fechaNacimiento,
      urlPhoto:''
     }
     let files=[];
     this.archivos.forEach((obj) => {
        files.push(obj.archivo);
      });
     let objEmpresa={
      name:this.nombreEmpresa,
      website:this.webEmpresa,
      ruc:this.ruc,
      urlPerfil:this.idcompany,      
     }
     console.log(objEmpresa)
     this._publicarService.uploadFile(files)
                    .subscribe(res=>{
                      // console.log(res);
                      var result = JSON.parse(res.response).data;
                      objPersona.urlPhoto=result[0];
                      let guardar = this._misDatosService.changeDatosPersona(this.iduser,objPersona)
                                          .subscribe(res=>{
                                            console.log('1',res)
                                            // let guardarEmpresa = this._misDatosService.changeDatosEmpresa(this.idcompany,objEmpresa)
                                            //                                           .subscribe(res=>{
                                            //                                             console.log('2',res)
                                            //                                             this.visible = false;
                                            //                                             this.btnguardar=true;
                                            //                                             this.confirm("Datos actualizados correctamente")
                                            //                                             guardarEmpresa.unsubscribe();
                                            //                                           })
                                            this.visible = false;
                                            this.btnguardar=true;
                                            this.confirm("Datos actualizados correctamente")
                                            
                                            guardar.unsubscribe();
                      });
                    })

    //  console.log(objPersona);

   }
}


