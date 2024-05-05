async function handleCancel(appointmentId){
  try{
    const response=await fetch("http://localhost:8008/cancel_appointment",{
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
    console.log(data);
    if(data){
      alert(data.message);
      window.location.reload();
    }
  }catch(error){
    console.error(error);
  }
}

export { handleCancel };