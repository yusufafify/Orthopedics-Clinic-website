function getMedicalHistory(array, isFetchDone) {
  if (array == []) {
    return `<h2 class="text-md ml-[10px] font-semibold mb-4"> No Medical History yet</h2>`;
  }
  if (!isFetchDone) {
    return `
    
              <div role="status" class="animate-pulse">
                <div class="h-2.5 bg-gray-400 rounded-full  w-48 mb-4"></div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              <div role="status" class="animate-pulse">
                <div class="h-2.5 bg-gray-400 rounded-full  w-48 mb-4"></div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              <div role="status" class="animate-pulse">
                <div class="h-2.5 bg-gray-400 rounded-full  w-48 mb-4"></div>
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
  return array.map(
    (history) =>
      `
      <div class="space-y-4">
      <div class="bg-white p-6 rounded-lg shadow-md ">
        <h3 class="text-lg font-bold mb-2">Sprained Ankle</h3>
        <p class="mb-2">Date: June 15, 2020</p>
        <p>
          Description: Twisted ankle while playing basketball. Treated with RICE (rest, ice, compression,
          elevation) and physical therapy.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md ">
        <h3 class="text-lg font-bold mb-2">Torn ACL</h3>
        <p class="mb-2">Date: September 1, 2018</p>
        <p>
          Description: Suffered a torn ACL while skiing. Underwent surgery and completed a 6-month
          rehabilitation program.
        </p>
      </div>
    </div>
    `
  );
}
