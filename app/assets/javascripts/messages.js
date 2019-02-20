$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var MessageImage = message.image ? `<img src="${message.image}" class="lower-message__image" >` : ''

    var html = `<div class="message" data-message-id="${ message.id }">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-message__date">
              ${ message.time }
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${ content }
            </p>
            ${ MessageImage }
          </div>
        </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
      $('.form__submit').attr("disabled",false);
    })
    .fail(function(){
      alert('error');
    })
  })
});
