$(document).ready(function() {

  const SQUARE = '<div></div>';
  var squares = 100;
  var sqrtSquares = Math.sqrt(squares);

  function buildBoard(squares, sqrtSquares){
    $('div').remove();

    for (i = 0; i < squares; i++){
      $('#window').append(SQUARE);
    }

    var dimensions = 100 / sqrtSquares;

    $('div').css({
      'width': dimensions + 'vw',
      'height': dimensions + 'vh'
    });

    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'green');
    });
  };

  buildBoard(squares, sqrtSquares);

  $('#reset').on('click', function(){
    squares = prompt('please give a square number greater than zero', '400');
    sqrtSquares = Math.sqrt(squares);
    var sqrtFloor = Math.floor(sqrtSquares);
    var test = sqrtFloor * sqrtFloor;
    if (squares != null && squares == test && squares != 0 ) {
      buildBoard(squares, sqrtSquares);
    }
    else {
      alert('invalid input');
    }
  });

  $('#color').on('click', function(){
    $('.colors').toggle();
  });

  $('#red').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'red');
    });
    $('.colors').hide();
  });

  $('#orange').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'orange');
    });
    $('.colors').hide();
  });

  $('#yellow').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'yellow');
    });
    $('.colors').hide();
  });

  $('#green').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'green');
    });
    $('.colors').hide();
  });

  $('#blue').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'blue');
    });
    $('.colors').hide();
  });

  $('#eraser').on('click', function(){
    $('div').on('mouseenter', function(){
      $(this).css('background-color', 'white');
    });
  });

  $('#random').on('click', function(){
    $('div').on('mouseenter', function(){
      let r = Math.floor(Math.random()*256);
      let g = Math.floor(Math.random()*256);
      let b = Math.floor(Math.random()*256);
      let random = 'rgb('+r+', '+g+', '+b+')';
      $(this).css('background-color', random);
    });
    $('.colors').hide();
  });

});

// maybe instead of asking for square number, ask for dimensions
