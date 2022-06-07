import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Previsão do Tempo';
  estadoSelecionado = '';
  mostrarErro = false;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    if (this.estadoSelecionado) {
      let dialogRef = this.dialog.open(DialogComponent,
        {
          width: '800px',
          height: '700px',
          data:
            {
              codWOEID: this.estadoSelecionado
            }
        });
    } else {
      this.mostrarErro = true;
    }
  }
}