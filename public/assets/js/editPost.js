async function updatePost(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const id = document.querySelector('#update').getAttribute('attr');
    const user_id = document.querySelector('#title').getAttribute('attr');
  
    if (title && content) {
      const response = await fetch('/api/posts/'+id, {
        method: 'put',
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

  async function deletePost(event) {
    event.preventDefault();

    const id = document.querySelector('#delete').getAttribute('attr');
    const user_id = document.querySelector('#title').getAttribute('attr');
  
    if (id) {
      const response = await fetch('/api/posts/'+id, {
        method: 'DELETE',
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
  
  document.querySelector('#update').addEventListener('click', updatePost);
  document.querySelector('#delete').addEventListener('click', deletePost);