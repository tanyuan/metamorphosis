// Global Variable Declaration
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

function set_event_plane(state) {
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
	camera_text.setAttribute('text', white_text('Where is this place? Did I got too drunk and sleep over at someone’s place yesterday?'));
	setTimeout(function(){
		camera_text.setAttribute('text', white_text('Why? I can\'t memorise anything happened yesterday?'));
	},5000);
	setTimeout(function(){
		camera_text.setAttribute('text', white_text('I need to find out where this place is!'));
		help_text.setAttribute('visible', true);
		help_text.setAttribute('text', white_text('Gaze at the floor tile to move, and explore the room.'));
	},10000);
	setTimeout(function(){
		camera_text.setAttribute('visible', false);
		help_text.setAttribute('visible', false);
		finite_state = 'free';
		show_tile();
	},15000);
}

function third_stage(){
	event_text.setAttribute('text', white_text('"John Doe would be serving the country as a navy from (date) to (date)..."'));
	action_text.setAttribute('visible', true);
}

// init 
hide_tile();


