const deleteImage = async (imageId) => {
  try {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-700 text-white font-md p-2 rounded",
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
          const response = await fetch("http://localhost:8008/delete_medical_image", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              image_id: imageId,
            }),
          });

          const data = await response.json();

          if (data.message === "success") {
            swalWithTailwindButtons.fire({
              title: "Deleted!",
              text: "Your image has been deleted.",
              icon: "success",
            });

            // Reload only if deletion is successful
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Your image deletion has been cancelled.",
            icon: "error",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export { deleteImage };
