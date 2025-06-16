import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoRequisicaoRestEnum } from '../enum/tipo-requisicao-enum';
import { LoadingService } from './layout/loading/loading.service';
import { HttpRestService } from './service/http-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'predict-btc';
  dadosModelo: any = {};
  max = 90;
  min = 20;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 50;


  formPrevisao!: FormGroup;
  disabled = false;
  showDashboard = false;

  treshold = "O threshold é o valor de corte usado para decidir se a previsão do modelo será considerada como SUBIU ou CAIU. Quanto menor o threshold, mais fácil o modelo irá dizer SUBIU. Quanto maior, mais exigente ele será para dizer SUBIU. Ajuste esse valor conforme o quanto você quer que o modelo seja conservador ou arriscado."

  constructor(
    private httpRestService: HttpRestService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.formPrevisao = this.formBuilder.group({
      treshold: [{ value: 50, disabled: false }, [Validators.required]],
      periodo: [{ value: '1h', disabled: false }, [Validators.required]],
    });
  }

  fazerPrevisao() {
    const dadosForm = this.formPrevisao.getRawValue()
    const newTreshold = (dadosForm.treshold / 100);
    this.loadingService.show();
    this.httpRestService.gerarSolicitacao(TipoRequisicaoRestEnum.GET,
      `/predict/${dadosForm.periodo}/${newTreshold}`,
      undefined, // params
      null,      // body
      undefined, // url
      { observe: 'response' }).subscribe({
        next: response => {
          // sucesso
          this.loadingService.hide();
          if (response.status === 200) {
            this.dadosModelo = response.body
            this.showDashboard = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loadingService.hide();
          if (error.status === 0) {
            alert('Erro de conexão ou CORS:' + error.statusText);
          } else {
            alert('Erro HTTP:' + error.status + error.message);
          }

          // Exemplo de uso
          alert('Falha na requisição: ' + error.message);
        }
      });
  }
}
