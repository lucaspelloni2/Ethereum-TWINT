import React from 'react';
import {Line} from "react-chartjs-2";

const chartColor = '#FFFFFF';

class MonthChartArea extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.labels)
  }

  // General configuration for the charts with Line gradientStroke
  gradientChartOptionsConfiguration = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      bodySpacing: 4,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    responsive: 1,
    scales: {
      yAxes: [
        {
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }
      ]
    },
    layout: {
      padding: {left: 0, right: 0, top: 15, bottom: 15}
    }
  };

  dashboardShippedProductsChart = {
    data: canvas => {
      var ctx = canvas.getContext('2d');
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#80b6f4');
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
      gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');
      return {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Volume Portfolio in USD',
            borderColor: '#f96332',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#f96332',
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: this.props.chartPrices
          }
        ]
      };
    },
    options: this.gradientChartOptionsConfiguration
  };

  render() {



    return (
      <div className="chart-area">
        <Line data={this.dashboardShippedProductsChart.data} options={this.dashboardShippedProductsChart.options}/>
      </div>
    )
  }
}

export default MonthChartArea;