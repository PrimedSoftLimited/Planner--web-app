let projectChart = document.getElementById('projectChart').getContext('2d');


//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontFamily = '#777';

let massPopChart = new Chart(projectChart, {
    type: 'pie', //bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
        labels: ['Unassigned', 'Pending', 'Completed'],
        datasets: [{
            label: 'Milestones',
            data: [
                7,
                20,
                22
            ],
            // backgroundColor:'green'
            backgroundColor: [
                '#343a40',
                '#343434',
                'grey'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: '3',
            hoverBorderColor: '#000'


        }]
    },
    options: {
        // title:{
        //     display:true,
        //     text:'Largest cities in Masachusetts',
        //     fontSize: 25
        // },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#343a40',
            }
        },

        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        }
    }
})
let membersChart = document.getElementById('membersChart').getContext('2d');


//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontFamily = '#777';

let membersDataChart = new Chart(membersChart, {
    type: 'bar', //bar, horizontal, pie, line, doughnut, radar, polarArea
    data: {
        labels: ['Jane', 'Emma', 'Susan', 'Jackson', 'Miranda'],
        datasets: [{
            label: 'Total Tasks',
            data: [
                3,
                14,
                11,
                6,
                1
            ],
            // backgroundColor:'green'
            backgroundColor: [
                '#343a40',
                '#343434',
                'grey',
                'purple',
                'black'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: '3',
            hoverBorderColor: '#000'


        }]
    },
    options: {
        // title:{
        //     display:true,
        //     text:'Largest cities in Masachusetts',
        //     fontSize: 25
        // },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#343a40',
            }
        },

        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        }
    }
})