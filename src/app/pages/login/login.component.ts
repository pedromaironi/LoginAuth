import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  recordarUsuario = false;
  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }



  login( form: NgForm ) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    // console.log('El formulario es valido');
    // console.log(this.usuario);
    // console.log(form);
    this.auth.LogIn(this.usuario).subscribe( (resp) => {
      console.log(resp); // Devuelve un json con la autentificacion del usuario. Email, idToken, RefreshToken
      Swal.close();
      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        title: 'hola',
        icon: 'error',
        text: 'Correo y/o clave incorrecta'
      });
      // console.log(err.error.error.message);
    });

  }
}
