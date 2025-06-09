import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, throwError } from 'rxjs';
import { TipoRequisicaoRestEnum } from '../../enum/tipo-requisicao-enum';

const headers = new HttpHeaders()
  .set('Content-Type', 'application/json; charset-UTF-8')
  .set('Access-Control-Allow-Origin', '*')
  .set('Cache-Control', 'no-cache')
  .set('Pragma', 'no-cache')
  .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');


@Injectable({
  providedIn: 'root'
})
export class HttpRestService {

  private API = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
  ) { }

  /**
 * Gera uma solicitação de consulta de acordo com o tipo da requisição.
 *
 * @param tipoRequisicao
 * @param path
 * @param params
 * @param body
 * @param url
 */
  gerarSolicitacao(
    tipoRequisicao: TipoRequisicaoRestEnum,
    path: string,
    params?: HttpParams | undefined,
    body?: any | null,
    url?: string
  ) {
    let headers: any;
    this.API;
    headers = this.geraHeader();
    return this.montaRequest(tipoRequisicao, path, params, body, url, headers);
  }

  private geraHeader() {
    const headers = {
      'Content-Type': 'application/json; charset-UTF-8',

    };
    return headers;
  }

  private montaRequest(
    tipoRequisicao: TipoRequisicaoRestEnum,
    path: string,
    params?: HttpParams | undefined,
    body?: any | null,
    url?: string,
    headers?: object | null
  ) {
    let solicitacao$: Observable<any>;
    switch (tipoRequisicao) {
      case TipoRequisicaoRestEnum.GET: {
        solicitacao$ = this.get(path, params, url, headers);
        break;
      }
      default: {
        solicitacao$ = throwError(
          'Somente é permitido um dos seguintes tipos de requisição: GET, POST, PUT ou DELETE'
        );
        break;
      }
    }
    return solicitacao$;
  }

  /**
 * Requisição GET.
 *
 * @param path
 * @param params
 * @param url
 */
  private get(path: string, params?: HttpParams, url?: string, headers?: any) {
    return this.http
      .get(url ? url : this.API + path, { headers })
      .pipe(take(1));
    /* return this.http.get(url ? url : API + path, {
          headers: headers,
          params: params,
          reportProgress: true
        }); */
  }
}
