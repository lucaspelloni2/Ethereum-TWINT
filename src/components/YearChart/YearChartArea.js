import React from 'react';
import {Line} from "react-chartjs-2";

const chartColor = '#FFFFFF';

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

class YearChartArea extends React.Component {
  constructor(props) {
    super(props)
  }

  // ##############################
  // // // Dashboard view - All Products - Card
  // #############################
  dashboardAllProductsChart = {
    data: canvas => {
      let ctx = canvas.getContext('2d');
      let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#18ce0f');
      gradientStroke.addColorStop(1, chartColor);
      let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
      gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));
      return {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Volume Portfolio in USD',
            borderColor: '#18ce0f',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#18ce0f',
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
    options: this.gradientChartOptionsConfigurationWithNumbersAndGrid
  };

  gradientChartOptionsConfigurationWithNumbersAndGrid = {
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
          gridLines: {
            zeroLineColor: 'transparent',
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

  render() {
    return (
      <div className="chart-area">
        <Line data={this.dashboardAllProductsChart.data} options={this.dashboardAllProductsChart.options}/>
      </div>
    )
  }
}

export default YearChartArea;