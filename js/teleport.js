AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      this.setAttribute('material', 'color', '#555555');
    });
    this.el.addEventListener('mouseleave', function (evt) {
      this.setAttribute('material', 'color', '#444444');
    });
  }
});
