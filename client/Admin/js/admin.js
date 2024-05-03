
fetch("http://localhost:8008/personal_data", {
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
     
     
     //Statistics at the top
      document.getElementById('totalPatients').innerHTML = data.value?data.value:"NULL"; 
      document.getElementById('totalAppointments').innerHTML = data.value?data.value:"NULL"; 
      document.getElementById('totalDoctors').innerHTML = data.value?data.value:"NULL"; 
      document.getElementById('totalRevenue').innerHTML = data.value?data.value:"NULL"; 

      const appInstance = document.querySelectorAll("[x-data]");
    // Use the server's chart data if available; otherwise, use an array of 200s (assuming 9 months as an example)
    
      appInstance[0].__x.$data.chartData =   new Array(9).fill(200);
     
      

      appInstance[1].__x.$data.chartData =  new Array(9).fill(150);
      Alpine.reinitialize();
    })
    .catch((error) => {
      console.error("Error:");
      
    });

 


    function chartOne() {
        return {
            // First chart
            chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        
          
    
            tooltipContent: '',
            tooltipOpen: false,
            tooltipX: 0,
            tooltipY: 0,
            init() {
                console.log("Chart data on init: ", this.chartData); // This will log the initial state of chartData
                
            },
            showTooltip(e) {
                console.log(e);
                this.tooltipContent = e.target.textContent
                this.tooltipX = e.target.offsetLeft - e.target.clientWidth;
                this.tooltipY = e.target.clientHeight + e.target.clientWidth;
            
            },
            hideTooltip(e) {
                this.tooltipContent = '';
                this.tooltipOpen = false;
                this.tooltipX = 0;
                this.tooltipY = 0;
            }
        }
    }


    function chartTwo() {
        return {
            // First chart
            chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        
          
    
            tooltipContent: '',
            tooltipOpen: false,
            tooltipX: 0,
            tooltipY: 0,
            init() {
                console.log("Chart data on init: ", this.chartData2); // This will log the initial state of chartData
               
            },
            showTooltip(e) {
                console.log(e);
                this.tooltipContent = e.target.textContent
                this.tooltipX = e.target.offsetLeft - e.target.clientWidth;
                this.tooltipY = e.target.clientHeight + e.target.clientWidth;
              
            },
            hideTooltip(e) {
                this.tooltipContent = '';
                this.tooltipOpen = false;
                this.tooltipX = 0;
                this.tooltipY = 0;
            }
        }
    }

    
    console.log(document.querySelectorAll("[x-data]"))

















    






  //DATA received in this format
   const sampleData = [
        { id: '1', name: "Alice Smith",doctor:" Ahmed" ,date: "20-4-2024", time:"22:30 ", status: "Paid"  },
        { id: '2', name: "Bob Johnson",doctor:" Mohamed" ,date: "21-4-2024", time:"20:30 ", status: "Paid" },
        { id: '3', name: "Carol Williams", doctor:" Ahmed",date: "20-3-2024", time:"21:30 ", status: "Paid" },
        
    ];

// fetch("http://localhost:8008/personal_data", {
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

const data = sampleData; // Use the sample data array
const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
const searchInput = document.getElementById('search');


// Clear existing data in table body
tableBody.innerHTML = ' ';


// Loop through each item in the data array
data.forEach(item => {
    // Create a new row and cells for each data element
    const row = tableBody.insertRow();
    row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

    const idCell = row.insertCell();
    idCell.className = "p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium"

    const nameCell = row.insertCell();
    nameCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

    const docCell = row.insertCell();
    docCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"



    const dateCell = row.insertCell();
    dateCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

    const timeCell = row.insertCell();
    timeCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

    const statusCell = row.insertCell();
    statusCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

    const editCell = row.insertCell();
    editCell.className="p-4 font-bold  hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0"


    // Add text to the cells
    idCell.textContent = item.id;
    nameCell.textContent = item.name;
    dateCell.textContent = item.date;
    timeCell.textContent = item.time;
    statusCell.textContent = item.status;
    docCell.textContent=item.doctor;

    const editBtn = document.createElement("button");
    editBtn.textContent = "\u2026";
    editBtn.className = "edit-btn";
    editBtn.onclick = function() {
    openModal(item); // Function to open modal and pass current item
};
    editCell.appendChild(editBtn);

   
});
// })
// .catch((error) => {
//     console.error("Error:", error.message);
//     alert('Failed to fetch data: ' + error.message);
// });


function openModal(item) {
const dialog = document.querySelector('[data-dialog="dialog"]');
const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');

// Example of setting up the content dynamically
// You need to have elements inside your modal to hold these values
dialog.querySelector('#modalName').value = item.name;
dialog.querySelector('#modalDate').value = item.date;
dialog.querySelector('#modalTime').value = item.time;
dialog.querySelector('#modalStatus').value = item.status;

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
    tableBody.innerHTML = ''; // Clear the table first
    
    filteredData.forEach(item => {
        const row = tableBody.insertRow();
        row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

        // Creating cells as per your existing setup
        const cells = ['id', 'name','doctor', 'date', 'time', 'status'].map(key => {
            const cell = row.insertCell();
            cell.textContent = item[key];
            cell.className = "p-4   hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0";
            return cell;
        });

        const editCell = row.insertCell();
        editCell.className = "p-4   hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0";
        const editBtn = document.createElement("button");
        editBtn.textContent = "\u2026";
        editBtn.onclick = function() {
            openModal(item);
        };
        editCell.appendChild(editBtn);
    });
}








// Event listener for the search bar input
searchInput.addEventListener('input', () => {
const searchText = searchInput.value.trim();
if (!searchText) {
    renderTable(data); // If no input, show all data
    return;
}

// Filter data based on ID match
const filteredData = data.filter(item => item.id.includes(searchText));
renderTable(filteredData)

});