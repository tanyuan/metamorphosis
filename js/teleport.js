AFRAME.registerComponent('teleport-listener', {
  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      this.setAttribute('material', 'color', '#DDDDDD');
    });
    this.el.addEventListener('mouseleave', function (evt) {
      this.setAttribute('material', 'color', '#444444');
    });
  }
});
