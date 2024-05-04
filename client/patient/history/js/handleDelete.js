async function handleDelete(e) {
  const btnId = e.currentTarget.id;
  const history_id = btnId.replace(/^\D+/g, "");
  console.log(history_id);

  if (btnId.includes("deleteBtn")) {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-700 text-white font-md p-2  rounded",
        cancelButton: "bg-red-500 hover:bg-red-700 text-white font-md p-2 mr-2 rounded",
      },
      buttonsStyling: false,
      showConfirmButton: false, // Hide the default "OK" button

    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:8008/delete_history`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ history_id }),
          });

          const data = await response.json();

          if (data.message === "success") {
            swalWithTailwindButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            // Reload only if deletion is successful
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your medical history is safe :)",
            icon: "error",
          });
        }
      });
  }
}

export { handleDelete };
