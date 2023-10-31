import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataBaseService } from '../../services/data-base.service';
import { Usuario } from '../../model/Usuario';
import { showAlertDUOC, showAlertYesNoDUOC } from '../../model/Message';
import { MessageEnum } from '../../model/MessageEnum';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Animation, AnimationController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { APIClientService } from 'src/app/services/apiclient.service'; 

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent],
  standalone: true
  
})
export class InicioPage implements OnInit, AfterViewInit  {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;  componente_actual = 'qr';
  listaUsuarios: Usuario[] = [];
  nombre = '';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService
    , private animationController: AnimationController
    ) { }

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(esPrimerInicioSesion => {
      this.componente_actual = 'qr';
      this.bd.datosQR.next('');
    });
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }
  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }
  
}

