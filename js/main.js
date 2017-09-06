// Global Variable Declaration
var finite_state = 'wake';
var camera_plane = document.querySelector('a-camera');
var event_plane = document.querySelector('#event-plane');
var event_text = document.querySelector('#event-text');
var action_text = document.querySelector('#action-text');
var camera_text = document.querySelector('#camera-text');
var help_text = document.querySelector('#help-text');
var tile_array = document.getElementsByClassName('tile');


function set_event_plane() {
	var current_position = camera_plane.getAttribute('position');
	var current_rotation = camera_plane.getAttribute('rotation');
	event_plane.setAttribute('position',current_position);
	event_plane.setAttribute('rotation',current_rotation);
}

function reset_event_plane() {
	event_plane.setAttribute('position',"0 0 -20");
	event_plane.setAttribute('rotation',"0 0 0");
}

// init first stage
for (var i = tile_array.length - 1; i >= 0; i--) {
	tile_array[i].setAttribute('visible',false);
}

setTimeout(function(){
	camera_text.setAttribute('visible', true);
	help_text.setAttribute('visible', true);
},3000);

function second_stage(){
	camera_text.setAttribute('visible', true);
	camera_text.setAttribute('text', {
		width: 1, 
		color: 'white', 
		align: 'center', 
		value: 'Where is this place? Did I got too drunk and sleep over at someone’s place yesterday?'
	});
	setTimeout(function(){
		camera_text.setAttribute('text', {
			width: 1, 
			color: 'white', 
			align: 'center', 
			value: "Why? I can't memorise anything happened yesterday?"
		});
	},5000);
	setTimeout(function(){
		camera_text.setAttribute('text', {
			width: 1, 
			color: 'white', 
			align: 'center', 
			value: 'I need to find out where this place is!'
		});
		help_text.setAttribute('visible', true);
		help_text.setAttribute('text', {
			width: 1, 
			color: 'black', 
			align: 'center', 
			value: 'Gaze at the floor tile to move, and explore the room.'
		});
	},10000);
	setTimeout(function(){
		camera_text.setAttribute('visible', false);
		help_text.setAttribute('visible', false);
		finite_state = 'free';
		for (var i = tile_array.length - 1; i >= 0; i--) {
			tile_array[i].setAttribute('visible',true);
		}
	},15000);
}


