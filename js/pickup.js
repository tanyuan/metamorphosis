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
				set_event_plane(finite_state,'#water-cup-hand');
				water.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('A cup of water. I don\'t need it right now.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					water.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click', action_text_handler);
			}
		});
	}
});

AFRAME.registerComponent('envelope', {
	init: function(){
		var envelope = this.el;
		envelope.addEventListener('click', function (evt) {
			if (third_stage_state === 1) {
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
						third_stage_state++;
						event_text.setAttribute('text', white_text('Oh right, I signed up for the special forces, and my term starts tomorrow.'));
					} else if (third_stage_state === 2) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('But how come my documents are in this unknown place?'));
					} else if (third_stage_state === 3) {
						third_stage_state++;
						event_text.setAttribute('text', white_text('No matter what, I\'d better go back to my place and prepare for the enlistment ASAP.'));
						action_text.setAttribute('text', black_text('PUT BACK'));
					} else if (third_stage_state === 4) {
						envelope.setAttribute('visible', true);
						finite_state = 'free';
						reset_event_plane();
						help_text.setAttribute('visible', false);
						camera_text.setAttribute('visible', false);
						
						setTimeout(function(){
							camera_text.setAttribute('visible', true);
							camera_text.setAttribute('text', white_text('The phone on the table is ringing. Maybe I should get it.'));	
                            // Start phone ringing animation
                            document.querySelector('#phone').emit('phone-ring');
						}, 5000);
					}
				};

				action_text.addEventListener('click',action_text_handler);
				action_text_primary.addEventListener('click', action_text_primary_handler);
				action_text_secondary.addEventListener('click', action_text_secondary_handler);
			} else {
				set_event_plane(finite_state,'#envelope-hand');
				envelope.setAttribute('visible', false);
				action_text.setAttribute('visible', false);
				action_text_primary.setAttribute('visible', true);
					action_text_secondary.setAttribute('visible',true);
				event_text.setAttribute('text', white_text('My enlistment documents.'));
				action_text.setAttribute('text', black_text('PUT BACK'));
				action_text_primary.setAttribute('text', black_text('READ DOCUMENT'));
				action_text_secondary.setAttribute('text', black_text('PUT BACK'));

				action_text_primary_handler = function(){
					action_text_primary.setAttribute('visible', false);
					action_text_secondary.setAttribute('visible',false);
					action_text.setAttribute('visible',true);
					event_text.setAttribute('text', white_text('"John Doe would be serving the country in the Navy from ' + current_date_string + ' to ' + future_date_string + '..."'));
				};

				action_text_secondary_handler = function(){
					envelope.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text_handler = function(){
					envelope.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
				action_text_primary.addEventListener('click', action_text_primary_handler);
				action_text_secondary.addEventListener('click', action_text_secondary_handler);
			}
		});
	}
});

AFRAME.registerComponent('phone', {
	init: function(){
		var phone = this.el;
		phone.addEventListener('click', function(evt) {
			if (fourth_stage_state > 1) {
				// fourth stage finished
				set_event_plane(finite_state,'#phone-hand');
				phone.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('Someone\'s phone. There\'s nothing I can do with it.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					phone.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
			} else if (third_stage_state > 1) {
				// third stage finished

				finite_state = 'phone';
				set_event_plane(finite_state);
				phone.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);

                // End phone ringing animation
                document.querySelector('#phone').emit('phone-end');

				var phone_hand = document.querySelector('#phone-hand');

				action_text_handler = function(){
					if (fourth_stage_state === 1) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"Hey, John! Where the hell are you?"'));
						action_text.setAttribute('text', black_text('NEXT'));
					} else if (fourth_stage_state === 2) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('Who\'s this?'));
					} else if (fourth_stage_state === 3) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"Jane! Your girlfriend! Are you out of your mind?"'));
					} else if (fourth_stage_state === 4) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('Oh…, I’m sorry. I\'m somewhere strange.'));
					} else if (fourth_stage_state === 5) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"What do you mean by strange? And aren\'t we supposed to meet at the cafe?"'));
					} else if (fourth_stage_state === 6) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('I can\'t meet you at the cafe, Jane. I need to prepare for the enlistment.'));
					} else if (fourth_stage_state === 7) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"What enlistment? You just came back from the military department yesterday, and we are supposed to have a date today."'));
					} else if (fourth_stage_state === 8) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('What do you mean by that? My term starts from ' + current_date_string + ', and that\'s tomorrow.'));
					} else if (fourth_stage_state === 9) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"John, are you out of your mind? It\'s '+ future_date_string + ' today, and you got out of the military one day eariler."'));
					} else if (fourth_stage_state === 10) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('You\'re kidding me! I haven\'t even joined the special forces!'));
					} else if (fourth_stage_state === 11) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"Calm down, John. I\'ll go find you and we will figure things out together."'));
					} else if (fourth_stage_state === 12) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('But how are you going to find me if I don\'t even know where I am?'));
					} else if (fourth_stage_state === 13) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"Are you at a place with an abstract painting on the wall?"'));
					} else if (fourth_stage_state === 14) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('How\'d you know?'));
					} else if (fourth_stage_state === 15) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('"Stay there. I\'ll be there right away."'));
						action_text.setAttribute('text', black_text('END CALL'));
					} else if (fourth_stage_state === 16) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('Everything feels so weird. If that is true, why can\'t I recall anything from the past three years?'));
						action_text.setAttribute('text', black_text('NEXT'));
					} else if (fourth_stage_state === 17) {
						fourth_stage_state++;
						event_text.setAttribute('text', white_text('I don\'t feel well. I think I might throw up.'));
						action_text.setAttribute('text', black_text('NEXT'));
					} else if (fourth_stage_state === 18) {
						phone.setAttribute('visible',true);
						phone_hand.setAttribute('visible', false);
						finite_state = 'free';
						reset_event_plane();
						help_text.setAttribute('visible', true);
						camera_text.setAttribute('visible', false);
						help_text.setAttribute('text', white_text('Find a place to throw up.'));	
						
						setTimeout(function(){
							help_text.setAttribute('visible', false);
						}, 5000);
					}
				};

				action_text.addEventListener('click', action_text_handler);
			} else {
				// none finished
				set_event_plane(finite_state,'#phone-hand');
				phone.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('Someone\'s phone. There\'s nothing I can do with it.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					phone.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
			}
		});
	}
});

AFRAME.registerComponent('toilet-door', {
	init: function() {
		var toilet_door = this.el;
		toilet_door.addEventListener('click', function() {
			if (fourth_stage_state > 1) {
				// finish fourth stage
				if (finite_state === 'free') {
					// entering the toilet
					set_event_plane('toilet_door_enter');
					finite_state = 'toliet';

					action_text_primary_handler = function() {
						reset_event_plane();
						// Enter toilet
                        var camera = document.querySelector('a-camera');
                        camera.setAttribute('position', '-4.2 2.5 10.980');
                        camera.setAttribute('rotation', '0 270 0');
					};

					action_text_secondary_handler = function() {
						reset_event_plane();
					};
					action_text_primary.addEventListener('click', action_text_primary_handler);
					action_text_secondary.addEventListener('click', action_text_secondary_handler);
				} else if (finite_state === 'toilet') {
					// leaving toilet
					set_event_plane('toilet_door_enter');

					action_text_primary_handler = function() {
						finite_state = 'free';
						reset_event_plane();
						// Leave toilet
                        var camera = document.querySelector('a-camera');
                        camera.setAttribute('position', '-5.04 2.5 5.025');
                        camera.setAttribute('rotation', '0 0 0');
					};

					action_text_secondary_handler = function() {
						reset_event_plane();
					};
					action_text_primary.addEventListener('click', action_text_primary_handler);
					action_text_secondary.addEventListener('click', action_text_secondary_handler);
				}
			} else {

			}
		});
	}
});  

AFRAME.registerComponent('night-stand', {
	init: function() {
		var night_stand = this.el;
		night_stand.addEventListener('click', function(){
			if (finite_state === 'free') {
				set_event_plane(finite_state,'#night-stand-hand');
				night_stand.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('A nightstand. There\'s nothing special with it.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					night_stand.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
			} else {
				return;
			}
		});
	}
});  

AFRAME.registerComponent('paper', {
	init: function() {
		var paper = this.el;
		paper.addEventListener('click', function(){
			if (finite_state === 'free') {
				set_event_plane(finite_state,'#paper-hand');
				paper.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('A stack of paper. There\'s nothing special with it.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					paper.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
			} else {
				return;
			}
		});
	}
}); 

AFRAME.registerComponent('plant', {
	init: function() {
		var plant = this.el;
		plant.addEventListener('click',function(){
			if (finite_state === 'free') {
				set_event_plane(finite_state,'#plant-hand');
				plant.setAttribute('visible', false);
				camera_text.setAttribute('visible', false);
				help_text.setAttribute('visible', false);
				event_text.setAttribute('text', white_text('A plant. Seems that the owner of this room has a green thumb.'));
				action_text.setAttribute('text', black_text('PUT BACK'));

				action_text_handler = function(){
					plant.setAttribute('visible', true);
					reset_event_plane();
				};

				action_text.addEventListener('click',action_text_handler);
			} else {
				return;
			}
		});
	}
});  

