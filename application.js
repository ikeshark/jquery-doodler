$(document).ready(function() {

  const SQUARE = '<div></div>';
  const divSelector = '#window > div';

  function buildBoard(dimension){
    $(divSelector).remove();
    let squares = dimension ** 2;
    for (i = 0; i < squares; i++){
      $('#window').append(SQUARE);
    }
    let dimensions = 100 / dimension;
    $(divSelector).css({
      'width': dimensions + '%',
      'height': dimensions + '%'
    });
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'green');
    });
  };
  buildBoard(16);

  $('#reset').on('click', function(){
    var dimension = prompt('please enter a dimension, 2 to 100', '16');
    if (dimension != null && dimension > 1 && dimension < 101 ) {
      $('#eraser').removeClass('selected');
      buildBoard(dimension);
    }
    else {
      alert('invalid input');
    }
  });

  $('#red').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'red');
    });
    $('#eraser').removeClass('selected');
  });

  $('#orange').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'orange');
    });
    $('#eraser').removeClass('selected');
  });

  $('#yellow').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'yellow');
    });
    $('#eraser').removeClass('selected');
  });

  $('#green').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'green');
    });
    $('#eraser').removeClass('selected');
  });

  $('#blue').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'blue');
    });
    $('#eraser').removeClass('selected');
  });

  $('#eraser').on('click', function(){
    $(this).addClass('selected');
    $(divSelector).on('mouseenter', function(){
      $(this).css('background-color', 'white');
    });
  });

  $('#random').on('click', function(){
    $(divSelector).on('mouseenter', function(){
      let r = Math.floor(Math.random()*256);
      let g = Math.floor(Math.random()*256);
      let b = Math.floor(Math.random()*256);
      let random = 'rgb('+r+', '+g+', '+b+')';
      $(this).css('background-color', random);
    });
    $('#eraser').removeClass('selected');
  });

});


// right click (or space or even left click) to toggle drawing on and off
// make 100 the max dimension input
// allow for touch input
