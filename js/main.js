// Global Variable Declaration
var current_date = new Date();
var current_date_string = (current_date.getDate() + 1).toString() + '/' + (current_date.getMonth() + 1).toString() + '/' + current_date.getFullYear().toString();
var future_date_string = current_date.getDate().toString() + '/' + (current_date.getMonth() + 1).toString() + '/' + (current_date.getFullYear() + 3).toString();
var finite_state = 'start';
var camera_plane = document.querySelector('a-camera');
var event_plane = document.querySelector('#event-plane');
var event_text = document.querySelector('#event-text');
var action_text = document.querySelector('#action-text');
var action_text_primary = document.querySelector('#action-text-primary');
var action_text_secondary = document.querySelector('#action-text-secondary');
var camera_text = document.querySelector('#camera-text');
var help_text = document.querySelector('#help-text');
var tile_array = document.getElementsByClassName('tile');
var action_text_handler;
var action_text_primary_handler;
var action_text_secondary_handler;
var third_stage_state = 1;
var fourth_stage_state = 1;
var fifth_stage_state = 1;
var mail_show = false;
var extra_stage_state = 1;

function black_text(message) {
	return {
		width: 1, 
		color: 'black', 
		align: 'center', 
		value: message
	};
}

function white_text(message) {
	return {
		width: 1, 
		color: 'white', 
		align: 'center', 
		value: message
	};
}

function hide_tile() {
	for (var i = tile_array.length - 1; i >= 0; i--) {
		tile_array[i].setAttribute('visible',false);
	}
}

function show_tile() {
	for (var i = tile_array.length - 1; i >= 0; i--) {
		tile_array[i].setAttribute('visible',true);
	}
}

function set_event_plane(state, element_id) {
	hide_tile();

	action_text.removeEventListener('click',action_text_handler);
	action_text_primary.removeEventListener('click',action_text_primary_handler);
	action_text_secondary.removeEventListener('click',action_text_secondary_handler);

	var current_position = camera_plane.getAttribute('position');
	var current_rotation = camera_plane.getAttribute('rotation');
	event_plane.setAttribute('position',current_position);
	event_plane.setAttribute('rotation',current_rotation);

	if (state === 'water') {
		var water = document.querySelector('#water-cup-hand');
		water.setAttribute('visible', true);
		event_text.setAttribute('visible', true);
		action_text.setAttribute('visible', true);
	} else if (state === 'paper') {
		var envelope = document.querySelector('#envelope-hand');
		event_text.setAttribute('text', white_text('Enlistment paper? With my name on it?'));
		action_text.setAttribute('text', black_text('NEXT'));
		action_text_primary.setAttribute('text', black_text('READ DOCUMENT'));
		action_text_secondary.setAttribute('text', black_text('PUT BACK'));

		event_text.setAttribute('visible', true);
		action_text_primary.setAttribute('visible', true);
		action_text_secondary.setAttribute('visible',true);
		envelope.setAttribute('visible', true);
	} else if (state === 'phone') {
		var phone = document.querySelector('#phone-hand');
		event_text.setAttribute('text', white_text('Someone unknown is calling. Maybe I should pick up the phone?'));
		action_text.setAttribute('text', black_text('PICK UP'));

		event_text.setAttribute('visible', true);
		action_text.setAttribute('visible', true);
		phone.setAttribute('visible', true);
	} else if (state === 'toilet_door_enter') {
		event_text.setAttribute('text', white_text('The door that leads to the toilet.'));
		action_text_primary.setAttribute('text', black_text('USE TOILET'));
		action_text_secondary.setAttribute('text', black_text('LEAVE'));

		event_text.setAttribute('visible', true);
		action_text_primary.setAttribute('visible', true);
		action_text_secondary.setAttribute('visible',true);
	} else if (state === 'toilet_door_leave') {
		event_text.setAttribute('text', white_text('The door that leads to the room.'));
		action_text_primary.setAttribute('text', black_text('LEAVE TOILET'));
		action_text_secondary.setAttribute('text', black_text('CANCEL'));

		action_text.setAttribute('visible', false);
		event_text.setAttribute('visible', true);
		action_text_primary.setAttribute('visible', true);
		action_text_secondary.setAttribute('visible',true);
	} else if (state === 'front_door_enter') {
		event_text.setAttribute('text', white_text('Someone is knocking the door. It must be Jane.'));
		action_text.setAttribute('text', black_text('OPEN DOOR'));

		event_text.setAttribute('visible', true);
		action_text.setAttribute('visible', true);
	} else if (state === 'mail') { 
		var mail = document.querySelector('#mail-hand');
		mail.setAttribute('visible', true);

		event_text.setAttribute('text', white_text('There is an mail on the floor. Should I read it?'));
		action_text_primary.setAttribute('text', black_text('READ MAIL'));
		action_text_secondary.setAttribute('text', black_text('PUT BACK'));
		action_text.setAttribute('text', black_text('NEXT'));

		event_text.setAttribute('visible', true);
		action_text_primary.setAttribute('visible', true);
		action_text_secondary.setAttribute('visible',true);
	} else if (state === 'free') {
		// free explore
		console.log(state,element_id);
		if (element_id !== null) {
			var element = document.querySelector(element_id);
			element.setAttribute('visible', true);
		}
		event_text.setAttribute('visible', true);
		action_text.setAttribute('visible', true);
	}
}

function reset_event_plane() {
	var child_elements = event_plane.children;
	for (var i = child_elements.length - 1; i >= 0; i--) {
		child_elements[i].setAttribute('visible', false);
	}

	event_plane.setAttribute('position',"0 0 -20");
	event_plane.setAttribute('rotation',"0 0 0");

	if (finite_state === 'free') {
		show_tile();
	}
}

function first_stage(){
    setTimeout(function(){
        camera_text.setAttribute('visible', true);
        help_text.setAttribute('visible', true);
    },3000);
}

function second_stage(){
	// console.log('second');
	camera_text.setAttribute('visible', true);
	camera_text.setAttribute('text', white_text('What is this place? Did I get too drunk and sleep over at someone’s place last night?'));
	show_tile();
	help_text.setAttribute('visible', true);
	help_text.setAttribute('text', white_text('Gaze at the floor tile to move, and explore the room.'));
	setTimeout(function(){
		camera_text.setAttribute('text', white_text('Why? I can\'t remember anything happened yesterday?'));
	},5000);
	setTimeout(function(){
		camera_text.setAttribute('text', white_text('I need to find out what this place is!'));
		help_text.setAttribute('text', white_text('Gaze at items to pick up, and explore the room.'));
	},10000);
	setTimeout(function(){
		camera_text.setAttribute('visible', false);
		help_text.setAttribute('visible', false);
		finite_state = 'free';
	},15000);
}

function third_stage(){
	event_text.setAttribute('text', white_text('"John Doe would be serving the country in the Navy from ' + current_date_string + ' to ' + future_date_string + '..."'));
	action_text.setAttribute('visible', true);
}

// init 
hide_tile();


