async function locate(event) {
    event.preventDefault();
    
    const userId = document.querySelector("#newPost").getAttribute("attr");
    //alert(userId)

    const response = await fetch('/newPost/'+userId, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/user-post');
      console.log('success')
    } else {
      alert(response.statusText);
    }

  }
  
  document.querySelector('#newPost').addEventListener('click', locate);