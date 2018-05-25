import React from 'react';
import {Bar} from "react-chartjs-2";

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

class DayChartArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  componentDidMount() {
    let colors = [];

    let chartPrices = Object.assign([], this.props.chartPrices);
    console.log(this.props.chartPrices);

    chartPrices.forEach(price => {
      if (price > 0) {
        colors.push("green");
      }
      else {
        colors.push("red");
      }
    });
    this.setState({colors: colors});



    console.log(colors);
  }


  async componentWillReceiveProps(nextProps) {
    let colors = ['red'];
    if(nextProps.chartPrices !== this.state.chartPrices) {
      let chartPrices = Object.assign([], nextProps.chartPrices);
      console.log(nextProps);

      chartPrices.forEach(price => {
        if (price > 0) {
          colors.push("#18ce0f");
        }
        else {
          colors.push('#f96332');
        }
      });
      this.setState({colors: colors});
    }
  }

  // ##############################
// // // Dashboard view - Bar Chart - Card
// #############################
  dashboard24HoursPerformanceChart = {
    data: canvas => {
      let ctx = canvas.getContext('2d');
      let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
      gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));
      return {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Performance',
            backgroundColor: this.state.colors,
            borderColor: this.state.colors,
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#2CA8FF',
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: this.props.chartPrices
          }
        ]
      };
    },
    options: {
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
    }
  };

  render() {
    return (
      <div className="chart-area">
        <Bar data={this.dashboard24HoursPerformanceChart.data} options={this.dashboard24HoursPerformanceChart.options}/>
      </div>
    )
  }
}


export default DayChartArea;