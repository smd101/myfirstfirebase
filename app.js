
function start(myDataRef) {
  firebase = myDataRef;

  keypress();
  notifier();
}

function keypress() {
  $('#message').keypress(function(e) {
    if( e.keyCode == 13) {
      var name = $('#name').val();
      var text = $('#message').val();
      firebase.push({name: name, text: text});
      $('#message').val('');
    }
  });
}

function notifier() {
  firebase.on('child_added', function(snapshot) {
    var message = snapshot.val();
    display(message.name, message.text);
  });
}

function display(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messages'));
  $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
}
