function landingMedicalHistory(history) {
  if (!history|| history.length === 0) {
    return `
    <p> No medical history found </p>
    `;
  }
  if (history.length >= 3) {
    let threeHistory = history.slice(0, 3);
    return threeHistory
      .map(
        (history) =>
          `
              <li>${history.title}- ${history.date}</li>

           
  `
      )
      .join("");
  }
  return history
    .map(
      (history) =>
        `
              <li>${history.title}- ${history.date}</li>

           
  `
    )
    .join("");
}

export { landingMedicalHistory };
