import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }


   onSubmit( form: NgForm) {

     if (form.invalid) { return; }
     Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
     Swal.showLoading();

    //  console.log('Formulario enviado');
    //  console.log(this.usuario);
    //  console.log(form);

     this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      Swal.close();
      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Correo en uso'
      });
    });

   }
}
