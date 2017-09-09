AFRAME.registerComponent('teleport-listener', {
  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      if (finite_state === 'free') {
      	this.setAttribute('material', 'color', '#DDDDDD');
      } else {
      	return;
      }
    });
    this.el.addEventListener('mouseleave', function (evt) {
    	if (finite_state === 'free') {
	      	this.setAttribute('material', 'color', '#444444');
	      } else {
	      	return;
	      }
    });
  }
});
