$(document).ready(function(){
  setTimeout(incBar.bind(0), 1000);
});

function incBar(){
  var $loadScr = $('.loading-screen');
  var $bar = $loadScr.find('.bar');
  const scrWidth = $loadScr.width();
  const segments = 5;
  const segmentWidth = scrWidth / segments;
  let width = Math.random() * segmentWidth;
  let duration = Math.random() * 400 + 200;
  if(duration < 500) duration %= 200;
  console.log(this);
  if(this <= segments+2) $bar.animate({width: `+=${width}px`}, 300, 'linear', incBar.bind(this+1));
  else {
    setTimeout(function(){
      $bar.animate({width: '100vw'}, 300, 'linear');
    }, 500);
  }
}
