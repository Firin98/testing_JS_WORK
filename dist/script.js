'use strict';

window.onload = function () {
  var menu = document.querySelector('.gumb');

  menu.onclick = function () {
    menu.classList.toggle('visible');
  };

  var thumb = slider.querySelector('.thumb');

  thumb.onmousedown = function (event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    var shiftX = event.clientX - thumb.getBoundingClientRect().left; // shiftY здесь не нужен, слайдер двигается только по горизонтали

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left; // курсор вышел из слайдера => оставить бегунок в его границах.

      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = slider.offsetWidth - thumb.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumb.style.left = newLeft + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  thumb.ontouchstart = function (event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    var shiftX = event.touches[0].clientX - thumb.getBoundingClientRect().left; // shiftY здесь не нужен, слайдер двигается только по горизонтали

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);

    function onMouseMove(event) {
      var newLeft = event.touches[0].clientX - shiftX - slider.getBoundingClientRect().left; // курсор вышел из слайдера => оставить бегунок в его границах.

      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = slider.offsetWidth - thumb.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumb.style.left = newLeft + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
    }
  };

  thumb.ondragstart = function () {
    return false;
  };
};

(function ($) {
  $('select').selectric();
})(jQuery);