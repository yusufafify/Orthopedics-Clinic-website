//function that takes array of appointments and the imgPath of the images and displays them in the table
function getAppointments(appointments) {
  return appointments
    .map(
      (appointment, i) =>
        `
    <tr>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex items-center gap-3">

        <div class="flex flex-col">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            ${appointment.reason}
          </p>

        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex flex-col">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          ${appointment.payment}
        </p>

      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="w-max">
        <div
          class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap ${
            appointment.status.toLowerCase() === "paid"
              ? "bg-green-500/20"
              : "bg-red-500/20"
          } ">
          <span class="">${appointment.status}</span>
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        ${appointment.date}
      </p>
    </td>
    <td class="p-4 border-b border-blue-gray-50">


    


      <button
      id="detailsbtn${i}"
      
        class="select-none rounded-lg bg-[#276973] from-gray-900  p-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
        <img src="/public/assets/imgs/eye.png" alt="" class="h-6 w-6 object-cover">
        <span class="hidden">Details</span>
      </button>
      <div data-dialog-backdrop="animated-dialog" data-dialog-backdrop-close="true"
      id="mainDialog${i}"
        class="hidden transition-opacity duration-300 opacity-0 z-[999] pointer-events-none">
        <div data-dialog="animated-dialog" data-dialog-mount=""
          data-dialog-unmount=""
          data-dialog-transition=""
          id="detailsDialog${i}"
          class="relative m-4 w-screen md:w-2/5 min-w-[100%] md:min-w-[40%] md:max-w-[40%]  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl opacity-0 -translate-y-28 scale-90 pointer-events-none transition-all duration-300">
          <div
            class="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
            <div class="flex justify-between items-center w-full">
                            <h2>Appointment Details</h2>
                            <div class="flex items-center justify-between mr-6 md:mr-0">
                              <button id="exitBtn${i}">
                                <img src="/public/assets/imgs/xIcon.png" alt="exit icon" class="h-4 w-4">
                              </button>
                            </div>
                          </div>
          </div>
          <div
            class="relative grid gap-2 grid-cols-2 p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
            <div>
              <p class="text-md font-semibold">Appintment id: <span
                  class="text-sm font-light">${appointment.id}</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Date: <span class="text-sm font-light">${
                appointment.date
              }</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Doctor's name: <span
                  class="text-sm font-light">${
                    appointment.doctor_name
                  }</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Doctor's email: <span
                  class="text-sm font-light">${
                    appointment.doctor_email
                  }</span></p>
            </div>
          </div>
          <div
            class="flex items-center p-4 grid grid-cols-1 font-sans  antialiased leading-snug shrink-0 text-blue-gray-900">
            <h2 class="font-semibold text-md">Doctor's Note:</h2>
            ${
              appointment.doctor_notes
                ? `<p>${appointment.doctor_notes}</p>`
                : "No Notes yet"
            }
          </div>

            

          <div class="${
            appointment.flag&&appointment.status.toLowerCase() === "pending"
              ? "flex flex-wrap items-center mx-6 justify-end p-4 shrink-0 text-blue-gray-500"
              : "hidden"
          }">
            <button id="cancel${appointment.id}" data-ripple-dark="true" data-dialog-close="true"
              class="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Cancel
            </button>
            <button
            id="editbtn${i}"
              class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" data-dialog-target="edit-date-dialog">
              Edit
            </button>

          </div>
        </div>
        <div data-dialog-backdrop="edit-date-dialog" data-dialog-backdrop-close="true"
        id="editDialogContainer${i}"
          class="pointer-events-none hidden h-screen w-screen opacity-0 transition-opacity duration-300">
          <div data-dialog="edit-date-dialog"
          id="editDialog${i}"
            class="relative -translate-y-28
            scale-90
            pointer-events-none mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="flex flex-col gap-4 p-6">
            <div class="flex w-full justify-between items-center">
            <h4
                class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Appointment Date
              </h4>
              <div class="flex items-center justify-between ">
                              <button id="exitEditBtn${i}">
                                <img src="/public/assets/imgs/xIcon.png" alt="exit icon" class="h-4 w-4">
                              </button>
                            </div>
            </div>
              
              <p
                class="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Enter the date you want to reschedule the appointment to.
              </p>
              <h6
                class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Original Date
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" " value='${appointment.date}' disabled/>
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Date
                </label>
              </div>
              <h6
                class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                New Date
              </h6>


              <div class="relative h-10 w-full min-w-[100%]">
                <input id="datePicker${i}"
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" " type="date" />
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select a Date
                </label>
              </div>

            </div>
            <div class="p-6 pt-0">
              <button
              id="submitEdit${appointment.id}"
                class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                submit
              </button>

            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
    `
    )
    .join("");
}

export { getAppointments };
