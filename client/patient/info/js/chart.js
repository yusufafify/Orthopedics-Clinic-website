//Bar chart for the patient's appointment data
let data = null;

const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  chart: {
    type: "line",
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
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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

const chart = new ApexCharts(
  document.querySelector("#line-chart"),
  chartConfig
);

chart.render();

const getChartData = async () => {
  try {
    const response = await fetch("http://localhost:8008/get_Avg_rating", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }

    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

getChartData();
