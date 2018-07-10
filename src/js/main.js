var cards = new Vue({
  el: '#cards',
  data: {
    value: 'DEFAULT VALUE'
  }
})

$('#ocbc_card').bind('click touchstart', function() {
  document.body.requestFullscreen();
}, false);

// window.scrollTo(0,1);
