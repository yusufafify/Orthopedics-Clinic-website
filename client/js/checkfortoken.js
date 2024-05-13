async function checkForToken() {
  const token = localStorage.getItem('token');
  
  const res = await fetch('http://127.0.0.1:8008/check_token_validity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if(res.status !==200) {
  localStorage.removeItem('token');
  localStorage.clear();
  }
  const data = await res.json();
  return data;
}

checkForToken()