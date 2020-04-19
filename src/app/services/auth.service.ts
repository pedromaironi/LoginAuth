import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyCNF-c_C6U86CX1mzggt0G5H3FjZqhF3sI'; // Configuracion del proyecto en FireBase['Engranaje'];
  public userToken: string;
  // Crear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient,
              private router: Router) {
    this.leerToken();
  }

  LogOut() {

  }

  LogIn(usuario: UsuarioModel) {
    const authData = {
      // ---usuario forma rapida
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        // console.log('entro en el map de rxjs');
        // tslint:disable-next-line: no-string-literal
        this.guardarToken( resp['idToken']);
        return resp;
      } )
    );
  }

  nuevoUsuario( usuario: UsuarioModel ) {
    const authData = {
      // ---usuario forma rapida
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
      // si el post regresa un error el .pipe nunca se ejecutara, para atrapar o manipular dicho error
      // se utilizaria catchError arriba de map
    ).pipe(
      // map de los rxJS el cual permite obtener una respuesta cuando se obtenga de este post de una suscripcion
      // y pasarla por el map para transformarla o servir como intermediario para leer la respuesta y ahi guardar esa informacion
      map( resp => {
        // console.log('entro en el map de rxjs');
        // tslint:disable-next-line: no-string-literal
        this.guardarToken( resp['idToken']);
        return resp;
      } )
    );
  }

  private guardarToken( idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expiraToken', hoy.getTime().toString());
  }

  leerToken() {

    // Verificar si existe el item llamado token
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  EstaAutenticado(): boolean {
    return this.userToken.length > 0;

    if (this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expiraToken'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);


    if (expiraDate > new Date()) {
        return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');

  }
}
