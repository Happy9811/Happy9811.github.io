//main js file:
let free_data = [];
let paid_data = [];
const state = [];

$(document).ready(() => {

    if(localStorage.getItem('free_data') && localStorage.getItem('paid_data'))  {
        paid_data = localStorage.getItem('paid_data');
        free_data = localStorage.getItem('free_data');

        
        paid_data = paid_data.split(",");
        free_data = free_data.split(',');
        showChart('Free Users');showChart('Paid Users');
    }
    
    if(localStorage.getItem('visitor_data') && localStorage.getItem('visitor_total')) {
        let data = localStorage.getItem('visitor_data');
        let total = localStorage.getItem('visitor_total');

        data = data.split(",");

        let ctx = document.getElementById('visitorsChart').getContext('2d');
        //Chart with user infomation
        let visitorsChart = new Chart(ctx, {
            type: 'line',
            
            //Information inside the chart:
            data: {

                //We set time info, that in this case take data to the lasts 6 months
                labels: ['today', '7 Days', '30 Days', '6 Months', '1 Year'],
                
                
                datasets: [{

                    //*Here we set the style information of the chart, like border width, border color and 
                    borderColor: '#0b9412',
                    fill: true,
                    borderWidth: 2,
                    backgroundColor:'rgb(21, 221, 14,0.3)',

                    //Here we set the label for the data type, in this case the amount of visitors separated for every month:
                    data: data,

                }]
            },

            //Here we make responsive our site:
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        //Here we abstract and show our current amount of visitors:
        visitorsChart.data.datasets[0].label = `Current visitors: ` + total;
    }

// localStorage.setItem('total_messages', json['Total Messages']);
// localStorage.setItem('average_inputs', json['Average Inputs Per User']);
// localStorage.setItem('unique_users', json['Unique Users that Chatted']);
// localStorage.setItem('monthly_costs', json['Monthly Costs']);
    if(localStorage.getItem('total_messages')) {
        let data = localStorage.getItem('total_messages');
        $('#totalmsg').html(data);
    }

    if(localStorage.getItem('average_inputs')) {
        let data = localStorage.getItem('average_inputs');
        $('#averageinput').html(data);
    }

    if(localStorage.getItem('unique_users')) {
        let data = localStorage.getItem('unique_users');
        $('#uniqueusers').html(data);
    }

    if(localStorage.getItem('monthly_costs')) {
        let data = localStorage.getItem('monthly_costs');
        $('#monthlycosts').html('$' + data);
    }


    $.get('https://chat.nofiltergpt.com/back/number.php?api_key=8e34b3c9d5a6f7e8c1b2a3d4e5f6a7b8', {}, (json) => {
        free_data = [];
        if(json && json.paid == 'false') {
            free_data.push(json.usersToday);
            free_data.push(json.usersLast7Days);
            free_data.push(json.usersLast30Days);
            free_data.push(json.usersLast6Months);
            free_data.push(json.usersLast1Year);
            free_data.push(json.totalUsers);
        }
        console.log("Free Users ==>", free_data)

        localStorage.setItem('free_data', free_data);
        showChart('Free Users');
    })

    $.get('https://chat.nofiltergpt.com/back/number2.php?api_key=8e34b3c9d5a6f7e8c1b2a3d4e5f6a7b8', {}, (json) => {
        paid_data = [];
        if(json && json.paid == "true") {
            paid_data.push(json.usersToday);
            paid_data.push(json.usersLast7Days);
            paid_data.push(json.usersLast30Days);
            paid_data.push(json.usersLast6Months);
            paid_data.push(json.usersLast1Year);
            paid_data.push(json.totalUsers);
        }

        console.log("Paid Users ==>", paid_data)

        localStorage.setItem('paid_data', paid_data);
        showChart('Paid Users');
    })
    

    $.get('https://chat.nofiltergpt.com/back/number3.php?api_key=8e34b3c9d5a6f7e8c1b2a3d4e5f6a7b8', {}, (json) => {
        let data = [];
        let total = 0;
        if(json && json.visitorsToday != undefined || json.visitorsToday != null ) {
            data.push(json.visitorsToday);
            data.push(json.visitorsLast7Days);
            data.push(json.visitorsLast30Days);
            data.push(json.visitorsLast6Months);
            data.push(json.visitorsLast1Year);

            total = json.totalVisitors;
        }

        console.log("Visitors data ==> ", data, total);

        localStorage.setItem('visitor_data', data);
        localStorage.setItem('visitor_total', total);

        //Canva element
        let ctx = document.getElementById('visitorsChart').getContext('2d');

        //Chart with user infomation
        let visitorsChart = new Chart(ctx, {
            type: 'line',
            
            //Information inside the chart:
            data: {

                //We set time info, that in this case take data to the lasts 6 months
                labels: ['today', '7 Days', '30 Days', '6 Months', '1 Year'],
                
                
                datasets: [{

                    //*Here we set the style information of the chart, like border width, border color and 
                    borderColor: '#0b9412',
                    fill: true,
                    borderWidth: 2,
                    backgroundColor:'rgb(21, 221, 14,0.3)',

                    //Here we set the label for the data type, in this case the amount of visitors separated for every month:
                    data: data,

                }]
            },

            //Here we make responsive our site:
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        //Here we abstract and show our current amount of visitors:
        visitorsChart.data.datasets[0].label = `Current visitors: ` + total;
    })
    

    $.get('https://chat.nofiltergpt.com/back/number4.php?api_key=8e34b3c9d5a6f7e8c1b2a3d4e5f6a7b8', {}, (json)=> {
        if(json) {
            localStorage.setItem('total_messages', json['Total Messages']);
            localStorage.setItem('average_inputs', json['Average Inputs Per User']);
            localStorage.setItem('unique_users', json['Unique Users that Chatted']);
            localStorage.setItem('monthly_costs', json['Monthly Costs']);

            $('#totalmsg').html(json['Total Messages']);
            $('#averageinput').html(json['Average Inputs Per User']);
            $('#uniqueusers').html(json['Unique Users that Chatted']);
            $('#monthlycosts').html(" $" + json['Monthly Costs']);
        }
    })
})

let showChart = (params) => {
    if(params && state.indexOf(params) == -1) {
        state.push(params);
    } 

    if(state.length != 2) {
        return ; 
    }

    // Chart.js code for Paid Users Stacked Bar and Line Chart
    let ctxStacked = document.getElementById('paidUsersStackedChart').getContext('2d');
    console.log(ctxStacked);

    let paidUsersStackedChart = new Chart(ctxStacked, {
        type: 'bar',
        data: {
            labels: ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last 1 Year', 'Total Users'],
            datasets: [{
                type: 'line',
                label: 'Free Users',
                data: free_data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Light blue for bars
                stack: 'Stack 0',
            }, {
                type: 'line',
                label: 'Paid Users',
                data: paid_data,
                borderColor: 'rgba(255, 159, 64, 1)',  // Orange for line
                fill: true,
                borderWidth: 2,
                yAxisID: 'y-axis-2'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false  // Don't draw grid for the second axis
                    }
                }
            }
        }
    });
}




