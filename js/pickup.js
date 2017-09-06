AFRAME.registerComponent('water-cup', {
	init: function () {
		var water = this.el;
		water.addEventListener('click', function (evt) {
			in_event = true;
			// when water picked up
			// 'wake stage'
			if (finite_state === 'wake') {
				set_event_plane();
				water.setAttribute('visible', false);

				action_text.addEventListener('click', function(){
					water.setAttribute('visible', true);
					reset_event_plane();
				});
			} else {
				// other stage of game
			}
			
		});
	}
});
