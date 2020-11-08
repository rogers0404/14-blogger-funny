async function createNewPost(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const user_id = document.querySelector('#newPost').getAttribute('attr');
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
          title,
          content,
          user_id

        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        //console.log('success');
        document.location.replace('/dashboard/'+user_id);
      } else {
        alert(response.statusText);
      }
    }

  }
  
  document.querySelector('#newPost').addEventListener('click', createNewPost);