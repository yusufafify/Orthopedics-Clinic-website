let data=[];




console.log(data)
const chartConfig = {
  series: [
    {
      name: "number of appointments",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  chart: {
    type: "bar",
    height: 550,
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#276973"],
  plotOptions: {
    bar: {
      columnWidth: "40%",
      borderRadius: 2,
    },
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};



async function getData(){
  try{
    const response = await fetch('http://localhost:8008/get_number_of_app_per_month', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    );
    data = await response.json();
    console.log(data);
    chartConfig.series[0].data = [data.JAN, data.FEB, data.MAR, data.APR, data.MAY, data.JUN, data.JUL, data.AUG, data.SEP, data.OCT, data.NOV, data.DEC];
    const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);

chart.render();
  }
  catch(err){
    console.log(err);
  }

}


getData();