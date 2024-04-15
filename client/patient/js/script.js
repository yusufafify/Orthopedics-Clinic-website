var sideNav = document.getElementById('sidebar');
var toggleBtn = document.getElementById('sideOpenBtn');
let closeBtn = document.getElementById('sideCloseBtn');
let state=false;
toggleBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('-translate-x-full');
    state=false;}
    else{
      sideNav.classList.remove('-translate-x-full');
      state=true;
    }
});
closeBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('-translate-x-full');
    state=false;}
    else{
      sideNav.classList.remove('-translate-x-full');
      
      state=true;
    }
});




const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  chart: {
    type: "line",
    height: 240,
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
  colors: ["#020617"],
  stroke: {
    lineCap: "round",
    curve: "smooth",
  },
  markers: {
    size: 0,
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
 
const chart = new ApexCharts(document.querySelector("#chart"), chartConfig);
const chart2 = new ApexCharts(document.querySelector("#chart2"), chartConfig);

 
chart.render();
chart2.render();