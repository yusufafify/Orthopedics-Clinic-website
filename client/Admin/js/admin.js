
fetch("http://localhost:8008/Dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,

    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   document.getElementById('first_name').value=data.name.split(' ')[0];
      //   document.getElementById('last_name').value=data.name.split(' ')[1];
     
    
      const totals = data.Total[0];
     //Statistics at the top
      document.getElementById('totalPatients').innerHTML = totals.patients?totals.patients:"NULL"; 
      document.getElementById('totalAppointments').innerHTML = totals.appointments?totals.appointments:"NULL"; 
      document.getElementById('totalDoctors').innerHTML = totals.doctors? totals.doctors:"NULL"; 
      document.getElementById('totalRevenue').innerHTML =  totals.revenue?totals.revenue:"NULL"; 
     

    })
    .catch((error) => {
      console.error("Error:");
      
    });




    






  //DATA received in this format
//    const sampleData = [
//         { id: '1', name: "Alice Smith",doctor:" Ahmed" ,date: "20-4-2024", time:"22:30 ", status: "Paid"  },
//         { id: '2', name: "Bob Johnson",doctor:" Mohamed" ,date: "21-4-2024", time:"20:30 ", status: "Paid" },
//         { id: '3', name: "Carol Williams", doctor:" Ahmed",date: "20-3-2024", time:"21:30 ", status: "Paid" },
        
//     ];

const searchInput = document.getElementById('search');

let appointmentsData = []; // Define this globally to store the fetched data

// fetch("http://localhost:8008/Dashboard", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`
        
//     },
// })
// .then((response) => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then((data) => {
//     appointmentsData = data.recent_appointments; // Store the fetched data globally
    
//     renderTable(appointmentsData); // Render the initial table
// })
// .catch((error) => {
//     console.error("Error:", error.message);
//     alert('Failed to fetch data: ' + error.message);
// });

async function getDashboardData() {
    try {
        const response = await fetch("http://localhost:8008/Dashboard", {
            method: "GET",
            headers: {  
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        appointmentsData = data.recent_appointments; // Store the fetched data globally
        renderTable(appointmentsData); // Render the initial table
    } catch (error) {
        console.error("Error:", error.message);
        alert('Failed to fetch data: ' + error.message);
    }
}

getDashboardData();



function openModal(item) {
    const dialog = document.querySelector('[data-dialog="dialog"]');
    const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');

    // Example of setting up the content dynamically
    // You need to have elements inside your modal to hold these values
    dialog.querySelector('#modalName').value = item.patientName;
    dialog.querySelector('#modalDate').value = item.date;
    dialog.querySelector('#modalTime').value = item.time;
    dialog.querySelector('#modalStatus').value = item.status;
    dialog.querySelector('#modalPayment').value = item.paymentMethod;


    
    // Store the appointment ID in the delete button
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.dataset.appointmentId = item.AppointmentId;  // Using data attributes to store the appointment ID


    // Store the appointment ID in the Submit button
    const submitBtn = document.getElementById('confirmEditbtn');
    submitBtn.dataset.appointmentId = item.AppointmentId;  // Using data attributes to store the appointment ID

  
    // Show the dialog
    dialogBackdrop.style.opacity = '1';
    dialogBackdrop.classList.remove('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const closeButtons = document.querySelectorAll('[data-dialog-close="true"]');
    const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');
  
    // Function to close dialog
    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        dialogBackdrop.style.opacity = '0';
        setTimeout(() => dialogBackdrop.classList.add('hidden'), 300); // Ensure opacity transition completes
      });
    });
  });




  
// Function for search bar filtering
function renderTable(filteredData) {
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the table first
  
  filteredData.forEach(item => {
      const row = tableBody.insertRow();
      row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

      // Creating cells as per your existing setup
      const cells = ['AppointmentId', 'patientName', 'doctorName', 'date',  'paymentMethod', 'status'].map(key => {
          const cell = row.insertCell();
          cell.textContent = item[key];
          if (key === 'AppointmentId') {
            cell.className = "p-4 font-bold  align-middle"; // Change styles here for DoctorId
        } else {
            cell.className = "p-4  align-middle [&amp;:has([role=checkbox])]:pr-0";
        }          return cell;
      });

      const editCell = row.insertCell();
      editCell.className = "p-4 font-bold  hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0";
      const editBtn = document.createElement("button");
      editBtn.textContent = "...";
      editBtn.onclick = function() {
          openModal(item);
      };
      editCell.appendChild(editBtn);
  });
}







// Event listener for the search bar input
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (!searchText) {
      renderTable(appointmentsData); // If no input, show all data
      return;
  }

  // Filter data based on ID or name match (case insensitive)
  console.log(appointmentsData[0].patientName)
  const filteredData = appointmentsData.filter(item => 
      item.AppointmentId.toLowerCase().includes(searchText) || 
      item.patientName.toLowerCase().includes(searchText)
  );
  renderTable(filteredData);
});


//Delete Appointment Event listener
document.getElementById('deleteBtn').addEventListener('click', function () {
  const appointmentId = this.dataset.appointmentId; // Retrieve the stored appointment ID
  deleteAppointment(appointmentId);
});

async function deleteAppointment(appointmentId) {
  console.log('Deleting appointment ID:', appointmentId);


try{
  const response = await fetch(
        "http://localhost:8008/cancel_appointment",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({appointmentId: appointmentId}),
        }
      );
      const data = await response.json();
      console.log(data);
      window.location.reload();

      
}
catch (error) {
    console.log(error);
   }


  
}


//Edit Appointment EVENT listner



document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById('confirmEditbtn');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action (form submission in this case)

        // Fetch all inputs
        //const name = document.getElementById('modalName').value.trim();
        //const email = document.getElementById('modalEmail').value.trim();
        //const password = document.getElementById('password').value.trim();
        //const age = document.getElementById('age').value.trim();
        //const role = document.querySelector('input[name="role"]:checked');
        //const gender = document.querySelector('input[name="gender"]:checked');
        //const address = document.getElementById('address').value.trim();
        const date = document.getElementById('modalDate').value.trim();
        //const appTime = document.getElementById('modalTime').value.trim();
        const paymentMethod = document.getElementById('modalPayment').value.trim();
        const status = document.getElementById('modalStatus').value.trim();
        
        const _id=this.dataset.appointmentId;
        
        //const workinghours = document.getElementById('working-hours').value.trim();
        
        // Validate all required inputs
        if (!date ||  !paymentMethod || !status) {
            alert("Please fill in all required fields.");
            return; // Stop the function if validation fails
        }

        // Prepare data object with validated values
        const AppointmentData = {
           _id,
           date,
           paymentMethod,
           status
        };

        console.log(AppointmentData);
        UpdateAppointmentForm(AppointmentData);  // Call the function to submit data
    });
});




async function UpdateAppointmentForm(AppointmentData) {
    try {
      const response = await fetch(
        "http://localhost:8008/edit_appointment_admin",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(AppointmentData),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Updated Info",
        text: "",
        timer: 1500,
        showConfirmButton: false,
      })
      setTimeout(() => {
        window.location.reload();
    }, 1500);
    } catch (error) {
      console.log(error);
    }
  }





//Charts


fetch("http://localhost:8008/Dashboard", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
})
.then((response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data) => {
    const chartConfig1 = {
        series: [
            {
                name: "Appointments",
                data: data.monthly_appointments.slice(0, 9),
            },
        ],
        chart: {
            type: "bar",
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
        colors: ["#418995"],
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
                "Dec"
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

    const chartConfig2 = {
        series: [
            {
                name: "Revenue",
                data: data.monthly_revenue.slice(0, 9),
            },
        ],
        chart: {
            type: "bar",
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
        colors: ["#418995"],
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
                "Dec"
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

    const chart1 = new ApexCharts(document.querySelector("#bar-chart1"), chartConfig1);
    chart1.render();

    const chart2 = new ApexCharts(document.querySelector("#bar-chart2"), chartConfig2);
    chart2.render();
})
.catch((error) => {
    console.error("Error:", error.message);
    alert('Failed to fetch data: ' + error.message);
});



//Pie chart
fetch("http://localhost:8008/get_count_of_allapps", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
})
.then((response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data) => {
    const chartConfig = {
        series: [data.pending, data.completed, data.cancelled],
        chart: {
            type: "pie",
            width: 500,
            height: 500,
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
        colors: ["#276973", "#a4d6d6", "#619ca5"],
        legend: {
            show: true,
        },
        ooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class="tooltip-container">' +
                        '<span class="tooltip-label">' + w.config.labels[dataPointIndex] + ': </span>' +
                        '<span class="tooltip-value">' + series[seriesIndex] + '</span>' +
                    '</div>';
            },
        },
        labels: ["Pending", "Completed", "Cancelled"] // Add labels for each data point
    };

    const chart = new ApexCharts(document.querySelector("#pie-chart"), chartConfig);
    chart.render();
})
.catch((error) => {
    console.error("Error:", error.message);
    alert('Failed to fetch data: ' + error.message);
});