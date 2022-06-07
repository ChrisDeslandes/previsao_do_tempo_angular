import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'caixa-dialogo',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
  })
  export class DialogComponent {
    public cidade: string = '';
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
      const url = 'https://api.hgbrasil.com/weather?format=json-cors&key=89c337ab&woeid=' + this.data.codWOEID;
      this.http.get<any>(url).subscribe(data => {
        if (data) {
          this.cidade = data.results.city;
          this.temperatura = data.results.temp;
          this.dataHora = data.results.date + ' ' + data.results.time;
          this.descricao = data.results.description;
          this.diaNoite = data.results.currently;
          this.umidade = data.results.humidity;
          this.velocidadeVento = data.results.wind_speedy;
          this.nascerSol = data.results.sunrise;
          this.porSol = data.results.sunset;
          switch (data.results.condition_slug) {
            case 'storm':
              this.condicao = 'tempestade';
              break;
            case 'snow':
              this.condicao = 'neve';
              break;
            case 'hail':
              this.condicao = 'granizo';
              break;
            case 'rain':
              this.condicao = 'chuva';
              break;
            case 'fog':
              this.condicao = 'neblina';
              break;
            case 'clear_day':
              this.condicao = 'dia limpo';
              break;
            case 'clear_night':
              this.condicao = 'noite limpa';
              break;
            case 'cloud':
              this.condicao = 'nublado';
              break;
            case 'cloudly_day':
              this.condicao = 'nublado de dia';
              break;
            case 'cloudly_night':
              this.condicao = 'nublado de noite';
              break;
            case 'none_day':
              this.condicao = 'erro ao obter, mas está de dia';
              break;
            case 'none_night':
              this.condicao = 'erro ao obter, mas está de noite';
              break;
            default:
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