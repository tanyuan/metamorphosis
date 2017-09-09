AFRAME.registerComponent('water-cup', {
	init: function () {
		var water = this.el;
		water.addEventListener('mouseenter', function (evt) {
            water.setAttribute('scale', '2.2 2.2 2.2');
        });
		water.addEventListener('mouseleave', function (evt) {
            water.setAttribute('scale', '2.0 2.0 2.0');
        });
		water.addEventListener('click', function (evt) {
			// when water picked up
			// 'wake stage'
			if (finite_state === 'wake') {
				finite_state = 'water';
				set_event_plane(finite_state);
				water.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);

				action_text_handler = function(){
					water.setAttribute('visible', true);
					reset_event_plane();
					second_stage();
				};

				action_text.addEventListener('click', action_text_handler);
			} else {
				// other stage of game
			}
		});
	}
});

AFRAME.registerComponent('envelope', {
	init: function(){
		var envelope = this.el;
		envelope.addEventListener('click', function (evt) {
			if (finite_state === 'free') {
				finite_state = 'paper';
				set_event_plane(finite_state);
				envelope.setAttribute('visible', false);

				action_text_primary_handler = function(){
					action_text_primary.setAttribute('visible', false);
					action_text_secondary.setAttribute('visible',false);
					third_stage();
				};

				action_text_secondary_handler = function(){
					envelope.setAttribute('visible', true);
					finite_state = 'free';
					reset_event_plane();
				};

				action_text_handler = function() {
					if (third_stage_state === 1) {
						console.log('yo');
						third_stage_state++;
						event_text.setAttribute('text', white_text('I can\'t recall anything after reading this document. So I got enlisted?'));
					} else if (third_stage_state === 2) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('There\'s even a photo of me on the paper!'));
					} else if (third_stage_state === 3) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('Wait a sec. This is not me. I don\'t remember taking a photo like this, and this guy in the photo looks nothing like me!'));
					} else if (third_stage_state === 4) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('At least find someone good-looking to forge the photo. I look far better than this.'));
					} else if (third_stage_state === 5) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('I..., I can\'t remember my look! All I could remember are some blurry memories.'));
					} else if (third_stage_state === 6) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('I need to find a way to confirm how do I look!'));
						action_text.setAttribute('text', black_text('PUT BACK'));
					} else if (third_stage_state === 7) {
						envelope.setAttribute('visible', true);
						finite_state = 'free';
						reset_event_plane();
						help_text.setAttribute('text', white_text('Find a way to confirm the photo’s credibility.'));
						help_text.setAttribute('visible', true);
						camera_text.setAttribute('visible', false);
						setTimeout(function(){
							help_text.setAttribute('visible', false);
						},5000);
					}
				};

				action_text.addEventListener('click',action_text_handler);
				action_text_primary.addEventListener('click', action_text_primary_handler);
				action_text_secondary.addEventListener('click', action_text_secondary_handler);
			} else {
				return;
			}
		});
	}
});
