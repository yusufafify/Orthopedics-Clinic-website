async function handleSubmit(appointmentId,newDate){
  try{
    const response=await fetch("http://localhost:8008/edit_appointment",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify({
        appointmentId:appointmentId,
        date:newDate,
      }),
    });
    const data = await response.json();
    console.log(data);
    if(data){
      alert(data.message);
      window.location.reload();
    }
  }
  catch(err){
    console.error(err);
  }
}

export {handleSubmit}