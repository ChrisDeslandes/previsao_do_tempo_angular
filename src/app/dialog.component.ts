import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'caixa-dialogo',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
  })
  export class DialogComponent {
    public temperatura: string = '';
    public dataHora: string = '';
    public descricao: string = '';
    public diaNoite: string = '';
    public umidade: string = '';
    public velocidadeVento: string = '';
    public nascerSol: string = '';
    public porSol: string = '';
    public condicao: string = '';
    public mediaTempMax: string = '';
    public mediaTempMin: string = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: {codWOEID: string}, private http: HttpClient) {
      this.getDados();
    }

    private getDados() {
      const url = 'https://api.hgbrasil.com/weather?format=json-cors&key=e33a1dfe&woeid=' + this.data.codWOEID;
      this.http.get<any>(url).subscribe(data => {
        if (data.status === 200) {
          this.temperatura = data.results.temp;
          this.dataHora = data.results.date + ' ' + data.results.time;
          this.descricao = data.results.description;
          this.diaNoite = data.results.currently;
          this.umidade = data.results.humidity;
          this.velocidadeVento = data.results.wind_speedy;
          this.nascerSol = data.results.sunrise;
          this.porSol = data.results.sunset;
          if (data.results.condition_slug === 'storm') {
            this.condicao = 'tempestade';
          } else if (data.results.condition_slug === 'snow') {
            this.condicao = 'neve';
          } else if (data.results.condition_slug === 'hail') {
            this.condicao = 'granizo';
          } else if (data.results.condition_slug === 'rain') {
            this.condicao = 'chuva';
          } else if (data.results.condition_slug === 'fog') {
            this.condicao = 'neblina';
          } else if (data.results.condition_slug === 'clear_day') {
            this.condicao = 'dia limpo';
          } else if (data.results.condition_slug === 'clear_night') {
            this.condicao = 'noite limpa';
          } else if (data.results.condition_slug === 'cloud') {
            this.condicao = 'nublado';
          } else if (data.results.condition_slug === 'cloudly_day') {
            this.condicao = 'nublado de dia';
          } else if (data.results.condition_slug === 'cloudly_night') {
            this.condicao = 'nublado de noite';
          } else if (data.results.condition_slug === 'none_day') {
            this.condicao = 'erro ao obter, mas está de dia';
          } else if (data.results.condition_slug === 'none_night') {
            this.condicao = 'erro ao obter, mas está de noite';
          } else {            
            this.condicao = data.results.condition_slug;
          }
          this.mediaTempMax = this.calculaMedia(
            data.results.forecast[0].max,
            data.results.forecast[1].max,
            data.results.forecast[2].max,
            data.results.forecast[3].max,
            data.results.forecast[4].max,
            data.results.forecast[5].max,
            data.results.forecast[6].max,
            );
          this.mediaTempMin = this.calculaMedia(
            data.results.forecast[0].min,
            data.results.forecast[1].min,
            data.results.forecast[2].min,
            data.results.forecast[3].min,
            data.results.forecast[4].min,
            data.results.forecast[5].min,
            data.results.forecast[6].min,
            );
        } else {
          alert("Houve um erro com a requisição! Tente novamente mais tarde!")
        }
      })      
    }

    private calculaMedia(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number) {
      return Math.round((n1 + n2 + n3 + n4 + n5 + n6 + n7) / 7).toString();
    }

  }