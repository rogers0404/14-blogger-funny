async function saveApiComment(event) {
    event.preventDefault();
  
    const user_id = document.querySelector('#saveComment').getAttribute("userId");
    const comment_text = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('#saveComment').getAttribute("postId");
  
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({
          comment_text,
          post_id,
          user_id
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        document.location.replace('/single-post/'+post_id);
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', saveApiComment);