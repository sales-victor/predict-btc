import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

export interface ClassificationMetric {
  class: string;
  precision?: number;
  recall?: number;
  f1Score?: number;
  support?: number;
}

interface LinhaTabela {
  classe: string;
  precision: number;
  recall: number;
  f1score: number;
  support: number;
}

@Component({
  selector: 'app-fear-or-greed',
  standalone: false,
  templateUrl: './fear-or-greed.component.html',
  styleUrl: './fear-or-greed.component.scss'
})

export class FearOrGreedComponent implements OnChanges {


  @Input() dadosModelo: any;

  displayedColumns: string[] = ['class', 'precision', 'recall', 'f1Score', 'support'];
  currentValue = 61;
  dataSource = new MatTableDataSource<any>();
  sugestao: string = '';

  chartOptions: ChartOptions = {
    series: [0], // ✅ Garantido que não é undefined
    chart: {
      height: 300,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '60%'
        },
        track: {
          background: '#eee',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: '22px',
            show: true,
            offsetY: 10
          }
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        type: 'horizontal',
        gradientToColors: ['#28a745'], // fim
        stops: [0, 100],
        shade: 'light',
        opacityFrom: 1,
        opacityTo: 1
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Fear & Greed']
  };


  getImageFromBase64(base64: string): string {
    return `data:image/png;base64,${base64}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = [];
    if (!!changes['dadosModelo'].currentValue) {
      this.inicializaChart(changes['dadosModelo'].currentValue)
      this.sugestao = this.dadosModelo?.prediction == 0 ? 'VENDER' : 'COMPRAR'

    }
  }


  inicializaChart(dadosModelo: any) {
    this.dataSource.data = this.processarTabela()

    let valueChart = (dadosModelo?.pred_prob * 100).toFixed(2)

    this.chartOptions = {
      series: [Number(valueChart)], // ✅ Garantido que não é undefined
      chart: {
        height: 300,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 0,
            size: '60%'
          },
          track: {
            background: '#eee',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '22px',
              show: true,
              offsetY: 10
            }
          }
        }
      },

      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          type: 'horizontal',
          gradientToColors: ['#28a745'], // fim
          stops: [0, 100],
          shade: 'light',
          opacityFrom: 1,
          opacityTo: 1
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Fear & Greed']
    };

  }
  private processarTabela(): any[] {
    return Object.entries(this.dadosModelo?.classification).map(([key, value]: [string, any]) => {
      return {
        classe: key,
        precision: value["precision"],
        recall: value["recall"],
        f1score: value["f1-score"],
        support: key == 'accuracy' ? value : value['support']
      } as LinhaTabela;
    });;
  }

  getColorByValue(value: number): string {
    if (value < 30) return '#FF0000'; // medo
    if (value < 60) return '#FFC107'; // neutro
    return '#28a745'; // ganância
  }

}
