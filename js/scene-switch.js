function switchToMainScene() {
  document.getElementById('scene-start').setAttribute('visible', 'false')
  document.getElementById('scene-main').setAttribute('visible', 'true')
  document.querySelector('#light-point').emit('light-on');
  }
