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
    $('.selected').removeClass('selected');
    $('#random').addClass('selected');
    $(divSelector).on('mouseenter touchmove', function() {
      let r = Math.floor(Math.random()*256);
      let g = Math.floor(Math.random()*256);
      let b = Math.floor(Math.random()*256);
      let random = 'rgb('+r+', '+g+', '+b+')';
      $(this).css('background-color', random);
    });
  };
  buildBoard(16);

  $('#window').on('click', function() {
    $(divSelector).off();
    $('.selected').removeClass('selected');
  });

  function normalColor() {
    let color = this.id;
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $(divSelector).on('mouseenter touchmove', function(){
      $(this).css('background-color', color);
    });
  }

  function randomColor() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $(divSelector).on('mouseenter touchmove', function() {
      let r = Math.floor(Math.random()*256);
      let g = Math.floor(Math.random()*256);
      let b = Math.floor(Math.random()*256);
      let random = 'rgb('+r+', '+g+', '+b+')';
      $(this).css('background-color', random);
    });
  }


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

  $('#red').on('click', normalColor);
  $('#orange').on('click', normalColor);
  $('#yellow').on('click', normalColor);
  $('#green').on('click', normalColor);
  $('#blue').on('click', normalColor);
  $('#white').on('click', normalColor);

  $('#random').on('click', randomColor);

});


// right click (or space or even left click) to toggle drawing on and off
// make 100 the max dimension input
// allow for touch input
