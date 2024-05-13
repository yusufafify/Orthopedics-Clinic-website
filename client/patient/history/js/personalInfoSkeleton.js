function personalInfoSkeleton(infoObj, isFetchDone) {
  if (!isFetchDone) {
    return `
    <div class="max-w-full animate-pulse">
    <h2 class="text-lg font-bold mb-2">Patient Information</h2>

  <div
    class="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
    &nbsp;
  </div>
  <div
    class="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
    &nbsp;
  </div>
  <div
    class="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
    &nbsp;
  </div>
  <div
    class="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
    &nbsp;
  </div>
</div>
    `;
  }
  return `
  <h2 class="text-lg font-bold mb-2">Patient Information</h2>

                <p>Age: ${infoObj.age}</p>
                <p>Height: ${infoObj.height} cm</p>
                <p>Weight: ${infoObj.weight} kg</p>
                <p>Phone: ${infoObj.phoneNumber}</p>
                <p>Email: ${infoObj.email}</p>
  `;
}

export { personalInfoSkeleton };
