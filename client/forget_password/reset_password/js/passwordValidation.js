function passwordValidation(pass1,pass2){
  if(pass1!==pass2){
    return false;
  }
  return true;
}


export { passwordValidation}