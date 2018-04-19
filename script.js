var reload = false;

$(document).ready(function(){
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=studio+ghibli+mountains&api_key=iE0MQAXbGcRzA6cXS04Okl5e8NzuMZUe&limit=1");
  xhr.done(function(data) {
    // const url = data.data[0].images.original.url;
    const url =  `https://media.giphy.com/media/${data.data[0].id}/giphy.gif`;
    console.log(url, data.data[0].id);
    $('.gif-bg').css({backgroundImage: 'url('+url+')'});
  });
  $('.loading-screen .text-out').fadeIn(1000);
  $(document).on('blur', ()=>{reload = true});
  $(document).on('focus', ()=>{if(reload){
    reload = false;
    location.reload();
  }});
  if($('.loading').length) load();
  else question();
});

function load(){
  var loadingWidths = [10, 20, 20, 50, 60, 60, 64, 64, 80, 80, 100];
  var loadAnim = anime.timeline({
    targets: '.loading-screen .bar',
    duration: 300,
    easing: 'easeOutQuad'
  });
  loadingWidths.forEach(function(val, index){
    var $loadScr = $('.loading-screen');
    const scrWidth = $loadScr.width();
    var pxVal = (val/100)*scrWidth;
    loadAnim.add({
      width: pxVal,
      delay: (index == 0) ? 2000 : 0
    });
  });
  loadAnim.finished.then(clearLoadscr);
}

function clearLoadscr(){
  var $loadScr = $('.loading-screen');
  $loadScr.removeClass('loading');
  $loadScr.addClass('loaded');

  var clearAnim = anime({
    targets: $loadScr.get(0),
    duration: 600,
    easing: 'easeInOutCubic',
    width: '0px',
    delay: 1000
  }).finished.then(function (){
    $loadScr.addClass('cleared');
    question();
  });
}

function question(){
  anime({
    targets: '.question .word',
    opacity: 1,
    translateY: -10,
    easing: 'easeOutQuad',
    duration: 1000,
    delay: 0
  });
  anime({
    targets: '.question .end',
    opacity: 1,
    translateY: -10,
    easing: 'easeOutQuad',
    duration: 1000,
    delay: 1000
  });
  anime({
    targets: '#question svg path',
    // strokeDashoffset: [anime.setDashoffset, 0],
    opacity: 0,
    easing: 'easeInOutSine',
    duration: 1500,
    direction: 'alternate',
    loop: true
  });
}
