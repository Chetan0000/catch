

{
    // method to submit the form data for new Post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('.posts-container>ul').prepend(newPost);
                    deletePost($(`.delete-post-button`,newPost));

                    //  call the create comment class
                    new PostComments(data.data.post._id);
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //  method to create a post in DOM

    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
        
    
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
            </small>
       
        <p>
           ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
    
        <div class="post-comments">
            
                    <form id="post-${post._id}-comments-from" action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Add a comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add comment">
                    </form>
            
            <div class="post-comments-list">
                <ul id="post-comments- ${post._id}">
                     
            </div>
    
        </div>
        
    </li>`)
    }

    // method to delete the post from DOM
    // let deletePost = (deleteLink) => {
    //     $(deleteLink).click((e) => {
    //         e.preventDefault();

    //         $.ajax({
    //             type:'get',
    //             url: $(deleteLink).prop('href'),
    //             success: (data) => {
    //                 $(`#post-${data.post_id}`).remove();
    //             },
    //             error : (error) => {
    //                 console.log(`Error ${error.responseText}`);
    //             }
    //         })
    //     })
    // }

    let deletePost = function(deleteLink){
        $(deleteLink).click ((e) => {
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: (data) => {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: (error) => {
                    console.log(`Error in deleting AJAX ${error.responseText}`);
                }
            })
        });
    }



    //  function to loop over over all the post's already exist and convert them to Ajax 


    let convertAjax = () => {
        $('.posts-container>ul>li').each( () => {
            let self = $(this);
            let deleteButton = $('.delete-post-button', self);

            deletePost(deleteButton);

            //  getting the id of posts exist

            let postId = self.prop('id' .split("-"));
            console.log(postId);
            new PostComments(postId);
        });
    }



    createPost();
    convertAjax();
}