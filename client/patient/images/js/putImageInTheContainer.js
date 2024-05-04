
function putImageInTheContainer(array,isFetchDone) {
  if (!isFetchDone) {
    return `
  
      <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>

    `;
  }
  if(array.length === 0){

    return `
    <div class="bg-white p-6  w-full">
      <h2 class="text-md ml-[10px] font-semibold mb-4"> No Medical Images yet</h2>
    </div>
    `;
  }
  return array
    .map(
      (image,i) =>
        `
    <div
            class="dialog relative flex flex-col h-96 w-full overflow-hidden text-gray-700 transition-opacity bg-white shadow-md cursor-pointer rounded-xl bg-clip-border hover:opacity-90"
            data-dialog-target="image-dialog${i}">
            <img alt="nature" class="object-cover object-center w-full h-full"
              src="${image.src}" />

              </div>
          <div data-dialog-backdrop="image-dialog${i}" data-dialog-backdrop-close="true"
            class="pointer-events-none fixed inset-0 z-[999] grid overflow-auto h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
            <div
              class="relative m-4 w-3/4 min-w-[75%] max-w-[75%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
              role="dialog" data-dialog="image-dialog${i}">
              <div
                class="flex items-center justify-between p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                <div class="flex items-center gap-3">

                  <div class="flex flex-col -mt-px">
                    <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      Image Type: ${image.category.split("_")[0]}
                    </p>

                  </div>
                  </div>
                  <button type="button" id="delete${image.image_id}" class="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">delete</button>


              </div>
              <div
                class="relative p-0 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                <img alt="nature" class="h-[48rem] w-full object-cover object-center"
                  src="${image.src}" />
              </div>
              <div class="flex flex-wrap items-center justify-between p-4 shrink-0 text-blue-gray-500">
                <div class="flex items-center gap-16">
                  <div >
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                      Discription
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${image.category.split("_")[1]}
                    </p>
                  </div>
                  <div >
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                      Date 
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${image.date}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
    `
    )
    .join("");
}

export { putImageInTheContainer};