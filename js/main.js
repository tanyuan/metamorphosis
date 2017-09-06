// Global Variable Declaration
var finite_state = 'wake';
var in_event = false;
var camera_plane = document.querySelector('a-camera');
var event_plane = document.querySelector('#event-plane');
var event_text = document.querySelector('#event-text');
var action_text = document.querySelector('#action-text');

console.log(camera_plane,event_plane,event_text);

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


