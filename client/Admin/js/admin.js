
fetch("http://localhost:8080/personal_data", {
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
     
      

      appInstance[1].__x.$data.chartData =  new Array(9).fill(100);
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
 