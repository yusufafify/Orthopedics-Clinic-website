

async function handleCancel(appointmentId){
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
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes, cancel appointment!",
        cancelButtonText: "No, keep appointment!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch("http://localhost:8008/cancel_appointment",{
            method:"DELETE",
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({
              appointmentId:appointmentId,
            }),
          });
          const data = await response.json();
          if(data){
            swalWithTailwindButtons.fire({
              title: "Cancelled!",
              text: data.message,
              icon: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your appointment cancellation has been cancelled.",
            icon: "error",
          });
        }
      });
  }catch(error){
    console.error(error);
  }
}

export { handleCancel };
