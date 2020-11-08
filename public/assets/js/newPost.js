async function createNewPost(event) {
    event.preventDefault();
    //const userId = document.querySelector("#dashboard").getAttribute("attr");
        document.location.replace('/newPost');
  }
  
  document.querySelector('#newPost').addEventListener('click', createNewPost);