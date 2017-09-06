AFRAME.registerComponent('mirror-listener', {
  init: function () {
    var camera = this.el;
    camera.addEventListener('componentchanged', function (evt) {
      if (evt.detail.name !== 'rotation') { return; }
      // console.log(evt.detail.newData);
      var camera_rotation = camera.getAttribute('rotation');
      var mirror_object = document.querySelector('#mirror-object'); 
      var camera_rotation_mirrorred = {x: camera_rotation.x, y: -camera_rotation.y, z: camera_rotation.z};
      mirror_object.setAttribute('rotation', camera_rotation_mirrorred);
    });
  }
});
