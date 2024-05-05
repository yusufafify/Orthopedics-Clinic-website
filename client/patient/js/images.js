function landingMedicalImages(images) {
  if (!images||images.length==0) {
    return `
    <p> No medical images found </p>
    `;
  }
  if(images.length>=3){
    let threeImages= images.slice(0,3)
    return threeImages
    .map((image,i) => 
      `

            <img alt="nature" class="object-cover h-96 w-full bg-clip-border  bg-white hover:opacity-90 shadow-md cursor-pointer rounded-xl"
              src="${image.src}" />

            
  `)
    .join("");
  }
  return images
    .map((image,i) => 
      `

            <img alt="nature" class="object-cover h-96 w-full bg-clip-border  bg-white hover:opacity-90 shadow-md cursor-pointer rounded-xl"
              src="${image.src}" />

            
  `)
    .join("");
}
export { landingMedicalImages };