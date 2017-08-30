AFRAME.registerComponent('water-pickup', {
  init: function () {
    var water = this.el;
    water.addEventListener('click', function (evt) {
      console.log("water");
      var water_in_hand = document.getElementById('water_in_hand');
      water_in_hand.setAttribute('visible', true);
      water.setAttribute('visible', false);
    });
  }
});
