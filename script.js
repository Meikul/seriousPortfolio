var reload = false;

$(document).ready(function() {
  $(document)
  $('.loading-screen .text-out').fadeIn(1000);
  if($('.loading').length) load();
  else question();

  // hideLoad();

  drawing.init();
});

function hideLoad() {
  $('.loading-screen').hide();
}

function dragBar() {
  const $bar = $('.bar');
  $('.loading').on('mousemove', function(e) {
    let pct = e.pageX / $(document).outerWidth();
    pct = pct * 100;
    $bar.css({
      width: pct + 'vw'
    });
  });
}

function load() {
  var loadingWidths = [10, 20, 20, 50, 60, 60, 64, 64, 80, 80, 100];
  var loadAnim = anime.timeline({
    targets: '.loading-screen .bar',
    duration: 300,
    easing: 'easeOutQuad'
  });
  loadingWidths.forEach(function(val, index) {
    var $loadScr = $('.loading-screen');
    const scrWidth = $loadScr.width();
    var pxVal = (val / 100) * scrWidth;
    loadAnim.add({
      width: pxVal,
      delay: (index == 0) ? 2000 : 0
    });
  });
  loadAnim.finished.then(clearLoadscr);
}

function clearLoadscr() {
  var $loadScr = $('.loading-screen');
  $loadScr.removeClass('loading');
  $loadScr.addClass('loaded');

  var clearAnim = anime({
    targets: $loadScr.get(0),
    duration: 600,
    easing: 'easeInOutCubic',
    width: '0px',
    delay: 1000
  }).finished.then(function() {
    $loadScr.addClass('cleared');
    question();
  });
}

function question() {
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


var drawArea = $('.draw-area');

var drawing = (function() {
  var init = () => {
    var $drawArea = $('.draw-area');
    $drawArea.each((i, elem) => {
      elem.drawPoints = [];
      elem.isDrawing = false;
      console.log(elem);
    });
    $drawArea.on('mousedown', _startDrawing);
    $drawArea.on('mousemove', _addPoint);
    $drawArea.on('mouseup', _stopDrawing);
    $drawArea.on('mouseleave', _stopDrawing);
  };

  var clear = () => {

  };

  var _startDrawing = (e) => {
    e.target.isDrawing = true;
    _addPoint(e);
  };

  var _stopDrawing = (e) => {
    e.target.isDrawing = false;
  };

  var _addPoint = (e) => {
    var $area = $(e.target);
    var areaElem = $area.get(0);
    if(areaElem.isDrawing){
      var x = e.pageX - $area.offset().left;
      var y = e.pageY - $area.offset().top;
      x /= $area.width();
      y /= $area.height();
      var traceTo = areaElem.isDrawing;
      areaElem.drawPoints.push({x, y, traceTo});
      _draw($area);
    }
  };

  var _draw = ($area) => {
    var areaElem = $area.get(0);
    var context = areaElem.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = "#3ec7d7";
    context.lineJoin = "round";
    context.lineWidth = 2;
    var path = context.beginPath();
    areaElem.drawPoints.forEach((point, i) => {
      const x = point.x * $area.width();
      const y = point.y * $area.height();
      // const x = point.x;
      // const y = point.y;
      if (!point.traceTo) {
        context.moveTo(x, y);
      } else if (point.traceTo) {
        context.lineTo(x, y);
      }
    });
    context.stroke();
  };

  return {
    init,
    clear
  }
})();
