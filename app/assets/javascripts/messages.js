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
      $('form')[0].reset();
      $('.form__submit').attr("disabled",false);
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
      var message_id = $('.message').last().data('message-id');

      $.ajax({
        url: location.href,
        type: "GET",
        data: {id: message_id},
        dataType: "json"
      })
      .done(function(messages) {
        data.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 3000 );
});
