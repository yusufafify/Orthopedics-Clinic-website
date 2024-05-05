async function fetchAppointments() {
  try {
    const response = await fetch("http://localhost:8008/get_patient_appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return;
  }
}


export { fetchAppointments };