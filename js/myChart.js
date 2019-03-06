var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
        datasets: [{
            data: [320, 350, 200, 280, 440, 300, 320, 450, 500, ],
            backgroundColor: [
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca',
                '#80bfca'
            ],

        }, {
            data: [300, 320, 350, 290, 560, 240, 300, 250, 510],
            backgroundColor: [
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
                '#ff9a38',
            ]
        }],

    },
    options: {
        scales: {
            xAxes: [{
                stacked: false,
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                stacked: false,
                gridLines: {
                    display: false,
                },
                ticks: {
                    beginAtZero: true // minimum value will be 0.
                }
            }],

        },
        legend: {
            display: false,
        },
        axis: {
            display: false,
        }
    }
});