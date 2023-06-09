import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab2Page implements OnDestroy {
  @ViewChild('calendar', { static: false }) calendar!: IonDatetime;
  private higlightColors = {
    'XV años': { backgroundColor: '#428cff', textColor: '#fff' },
    Boda: { backgroundColor: '#2fdf75', textColor: '#000' },
    Cumpleaños: { backgroundColor: '#ffd534', textColor: '#000' },
  };
  event?: Evento;
  highlightedDates: ColorDate[] = [];
  events$: Subscription;
  event$?: Subscription;

  constructor(private eventoService: EventoService, title: Title) {
    title.setTitle('Calendario');
    this.events$ = eventoService.getEventos().subscribe((eventos) => {
      this.highlightedDates = [];
      eventos.forEach((evento) => this.marcarFecha(evento.fecha, evento.tipo));
      this.calendar.reset();
    });
  }

  onDateChange(event: any) {
    const date = event.detail.value[0];
    this.event$?.unsubscribe();
    this.event$ = this.eventoService.getEvento(date).subscribe((event) => {
      this.event = event[0];
      this.calendar.reset();
    });
  }

  getColor(tipo: string) {
    return tipo === 'XV años'
      ? 'primary'
      : tipo === 'Boda'
      ? 'success'
      : 'warning';
  }

  private marcarFecha(fecha: string, tipo: string) {
    const color =
      tipo === 'XV años'
        ? this.higlightColors['XV años']
        : tipo === 'Boda'
        ? this.higlightColors['Boda']
        : this.higlightColors['Cumpleaños'];
    this.highlightedDates.push({ date: fecha, ...color });
  }

  ngOnDestroy() {
    this.event$?.unsubscribe();
    this.events$.unsubscribe();
  }
}

interface ColorDate {
  date: string;
  backgroundColor: string;
  textColor: string;
}