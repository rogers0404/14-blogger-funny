async function loadPostHandler() {
    const userId = document.querySelector("#dashboard").getAttribute("attr");
    alert(userId)

    const response = await fetch('/dashboard/'+userId, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      //document.location.replace('/dashboard');
      console.log('success')
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#dashboard').addEventListener('click', loadPostHandler);