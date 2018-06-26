

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var options = { responsiveThreshold: 0 }
    var instances = M.Parallax.init(elems, options);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var options = { height: 400 }
    var instances = M.Slider.init(elems, options);
  });
