function getMedicalHistory(array, isFetchDone) {
  if (!isFetchDone) {
    return `
    
              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              

    `;
  }
  if (array.length === 0) {
    return `<div class="bg-white p-6 rounded-lg shadow-md ">
      <h2 class="text-md ml-[10px] font-semibold mb-4"> No Medical History yet</h2>
    </div>`;
  }
  return array.map(
    (history) =>
      `
      
      <div class="bg-white p-6 rounded-lg shadow-md ">
      <div class="flex justify-between">
          <h3 class="text-lg font-bold mb-2">${history.title}</h3>
          <button id='deleteBtn${history.history_id}' class="text-red-700 hover:bg-red-500 hover:p-2 hover:text-white transition-all duration-300 rounded-xl">delete</button>
          </div>
        <p class="mb-2">Date: ${history.date}</p>
        <p>
          Description: ${history.description}
        </p>
        
      </div>
      
    
    `
  );
}

export { getMedicalHistory };
