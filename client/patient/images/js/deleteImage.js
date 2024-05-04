const deleteImage = async (imageId) => {
  try {
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
      console.log(data)
      if(data.message === "success"){
        window.location.reload();
      }
  } catch (error) {
    console.log(error)
  }
};

export { deleteImage };