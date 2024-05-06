
async function handleSubmit(appointmentId, newDate){
  try{
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-700 text-white font-md p-2 rounded",
        cancelButton: "bg-red-500 hover:bg-red-700 text-white font-md p-2 mr-2 rounded",
      },
      buttonsStyling: false,
      showConfirmButton: false, // Hide the default "OK" button
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "This will change the appointment date!",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes, change date!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch("http://localhost:8008/edit_appointment",{
            method:"PATCH",
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({
              appointmentId: appointmentId,
              date: newDate,
            }),
          });
          const data = await response.json();
          console.log(data)
          if(data){
            if(data.flag){

              swalWithTailwindButtons.fire({
                title: "Date Changed!",
                text: data.message,
                icon: "success",
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }else{
              swalWithTailwindButtons.fire({
                title: "Error!",
                text: data.message,
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "Try Again!",
              });
            
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your appointment date change has been cancelled.",
            icon: "error",
          });
        }
      });
  }
  catch(error){
    console.error(error);
  }
}

export {handleSubmit};
