//

console.log('comment js check');
class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-from`);

        this.createComment(postId);

        let self = this;

        // call for all existing comments

        $('.delete-post-button',this.postContainer).each(() => {
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit((e) => {
            e.preventDefault();
            let self = this;

            $.ajax({
                type:'post',
                url:'/comments/create',
                data: $(self).serialize(),
                success: (data) => {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($('.delete-post-button',newComment));

                    new Noty({
                        them:'relax',
                        text:"Comment published!",
                        type:"success",
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },error: (error) => {
                    console.log(`Error in comment Ajax ${error}`);
                }
            });
        });
    }

    newCommentDom(comment){
        return $(`<li id="comment-${ comment._id}">
            <p>
                <small>
                    <a href="/comments/destroy/${comment._id}">Delete</a>
                </small>

                ${comment.content}
                <br>
                <small>
                    ${comment.user.name}
                </small>
            </p>

        </li>`)
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

}