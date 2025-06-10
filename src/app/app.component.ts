import { Component, OnInit } from '@angular/core';
import { TipoRequisicaoRestEnum } from '../enum/tipo-requisicao-enum';
import { LoadingService } from './layout/loading/loading.service';
import { HttpRestService } from './service/http-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'predict-btc';
  dadosModelo: any = {};

  constructor(
    private httpRestService: HttpRestService,
    private loadingService: LoadingService,
  ) { }
  ngOnInit(): void {
    this.loadingService.show();
    this.httpRestService.gerarSolicitacao(TipoRequisicaoRestEnum.GET,
      `/predict`).subscribe(rs => {
        this.loadingService.hide();
        this.dadosModelo = rs
      });
  }
}
