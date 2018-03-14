$(document).ready(function() {

  // all paintable divs
  const divSelector = '#window > div';
  let resolution = 16;
  // paint holds the current color, default is random
  let paint = 'random';
  let paintBool = true;
  let opacity = 1;
  let bRadius = 0;

  function displayPaintBool() {
    let text = paintBool ? 'on' : 'off';
    let color = paintBool ? 'yellow' : 'white';
    $('#paintBool').text(text);
    $('#paintBool').css('color', color);
  }

  // turning off auto-complete, a problem on Firefox
  $('input').attr('autocomplete', 'off');

  function fancyHeadline() {
    let txt = 'Pixelated';
    let colors = ['#E1FB23','#FA75A1','#79FD36','#76B2F7','#11F1F3','#C8FF00','#FAB017','#00EBB3','#FF0049'];
    let afterSpan = $('<span></span>').text(' Doodler');
    for (let i = 0; i < txt.length; i++) {
      let span = $('<span></span>');
      span.text(txt[i]);
      span.css('color', colors[i]);
      $('h1').append(span);
    }
    $('h1').append(afterSpan);
  }
  fancyHeadline();
  // test for mobile courtesy of open tech guides
  function isMobileDevice() {
    testExp = new RegExp('Android|webOS|iPhone|iPad|' +
      		       'BlackBerry|Windows Phone|'  +
      		       'Opera Mini|IEMobile|Mobile' ,
      		      'i');
    if (testExp.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  if (isMobileDevice()) {
    $('#modalBG').removeClass('hidden');
    $('#modalError').removeClass('hidden');
  }

  function buildBoard() {
    let colors = [];
    let oldSize = $(divSelector).length;
    let oldRes = Math.sqrt(oldSize);
    let newSize = resolution ** 2;

    if (oldSize === 0) {
      let square = '<div></div>';
      for (let i = 0; i < newSize; i++) {
        $('#window').append(square);
      }
    } else if (newSize < oldSize) {
      // remember old colors
      for (let i = 0; i < newSize; i++) {
        let color = $(divSelector).eq(i).css('backgroundColor');
        colors.push(color);
      }
      // clear board
      $(divSelector).remove();
      // build new board with old colors
      for (let i = 0; i < newSize; i++) {
        let square = $('<div></div>');
        square.css('backgroundColor', colors[i]);
        $('#window').append(square);
      }
    }
    else {
      // constructing grid of old colors
      for (let i = 0; i < oldRes; i++) {
        let colorRow = [];
        let row = i * oldRes;
        for (let j = row; j < (oldRes + row); j++) {
          let color = $(divSelector).eq(j).css('backgroundColor');
          colorRow.push(color);
        }
        colors.push(colorRow);
      }
      // clear the board
      $(divSelector).remove();
      function symmetry() {
        let count = 0;
        for (let i = 0; i < oldRes; i++) {
          let reverseColor = colors[i].slice().reverse();
          for (let j = 0; j < oldRes; j++) {
            let square = $('<div></div>');
            square.css('backgroundColor', colors[i][j]);
            $('#window').append(square);
            count++;
          }
          for (let j = 0; j < oldRes; j++) {
            let square = $('<div></div>');
            square.css('backgroundColor', reverseColor[j]);
            $('#window').append(square);
            count++;
          }
        }
        let bottomColors = [];
        $(divSelector).each(function() {
          let color = $(this).css('backgroundColor');
          bottomColors.push(color);
        });
        bottomColors.reverse();
        for (let i = 0; i < bottomColors.length; i++) {
          let square = $('<div></div>');
          square.css('backgroundColor', bottomColors[i]);
          $('#window').append(square);
        }
      }
      if (oldRes * 2 === resolution) {
        symmetry();
      } else {
        symmetry();
        buildBoard();
      }
    }
    // resizing
    let dimensions = 100 / resolution;
    let radius = $('#radius').val();
    radius += '%';
    $(divSelector).css({
      'width': dimensions + '%',
      'height': dimensions + '%',
    });
    // removing loading screen
    $('#modalBG').addClass('hidden');
    $('#modalLoad').addClass('hidden');
    // restoring paint if it was on
    if (paintBool) {
      if (paint === 'random') {
        randomColor();
      } else if (paint) {
        let color = paint;
        normalColor(color);
      }
    } else {
      $(divSelector).css('cursor', 'default');
    }
  }

  function normalColor(color) {
    paint = color;
    let selector = "#" + color;
    $('.selected').removeClass('selected');
    let rgb = $(selector).css("backgroundColor");
    $(selector).addClass('selected');
    if (paintBool) {
      $(divSelector).on('mouseenter', function() {
        let a = `, ${opacity})`;
        let rgba = rgb.replace('rgb', 'rgba').replace(')', a);
        $(this).css('background-color', rgba);
      });
    }
  }

  function randomColor() {
    paint = 'random';
    $('.selected').removeClass('selected');
    $('#random').addClass('selected');
    if (paintBool) {
      $(divSelector).on('mouseenter', function() {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let a = opacity;
        let random = `rgba(${r}, ${g}, ${b}, ${a})`;
        $(this).css('background-color', random);
      });
    }
  }

  function eraseBoard() {
    $(divSelector).remove();
    buildBoard();
  }

  function changeRes() {
    let newRes = Number(this.value);
    if (resolution !== newRes) {
      resolution = newRes;
      if (resolution === 64 || resolution === 32) {
        $('#modalBG').removeClass('hidden');
        $('#modalLoad').removeClass('hidden');
        setTimeout(buildBoard, 10);
      } else {
        buildBoard();
      }
    }
  }

  function togglePaint(e) {
    if (e.which === 88) {
      if (paintBool) {
        paintBool = false;
        displayPaintBool();
        $(divSelector).off('mouseenter');
        $(divSelector).css('cursor', 'default');
      } else {
        $(divSelector).css('cursor', 'pointer');
        paintBool = true;
        displayPaintBool();
        if (paint === 'random') {
          randomColor();
        } else {
          let color = paint;
          normalColor(color);
        }
      }
    }
  }
  // Event Listeners

  $(document).keyup(togglePaint);

  // normal colors (not eraser)
  $('.colors').each(function()  {
    let color = this.id;
    $(this).css({
      'background-color': color,
      'border-color': color
    });
    $(this).on('click', () => normalColor(color));
  });
  // eraser and random
  $('#white').on('click', () => normalColor('white'));
  $('#random').on('click', randomColor);

  // opacity slider
  $('#opacity').on('change', function() {
    value = $(this).val();
    opacity = value / 100;
    // value += '%';
    // $(divSelector).css('border-radius', value);
  });

  $('#reset').on('click', eraseBoard);

  $('#resolution').on("click", function() {
    $(this).toggleClass('resSelect');
    $(this).next().toggleClass('hidden');
  });

  $('[name="res"]').on('click', changeRes);
  // build the board
  buildBoard();
  displayPaintBool();
});
