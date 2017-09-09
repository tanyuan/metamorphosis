var john_lives = 3;
var jane_lives = 3;
var heal_times = 0;
var heal_thres = 3;

var game_status_str = 'Choose an action!';

var jane_action = 0;

// debug states
var game_state = 1;

AFRAME.registerComponent('combat', {
	init: function () {
		var door = this.el;
		door.addEventListener('click', function (evt) {
            document.getElementById('hit-hand').setAttribute('visible', 'true')
            document.querySelector('#hit-hand').emit('hit');
            console.log('hit');
		});
	}
});

AFRAME.registerComponent('defense', {
	init: function () {
		var button = this.el;
		button.addEventListener('click', function (evt) {
            var combat_text = document.getElementById('combat-text');
            console.log('You defense!');
            if (game_state == 1) {
                jane_action = getJaneAction();
                if (jane_action == 0) {
                    // Jane Listen
                    game_status_str = 'Jane tries to listen to you but you defense...';
                    console.log('Jane tries to listen to you.');
                    jane_lives--;
                    console.log('Jane--');
                    if (jane_lives == 0) {
                        game_state = 0;
                        game_status_str = 'You killed Jane!';
                        console.log('Jane dies.');
                    }
                } else {
                    // Jane Attack
                    game_status_str = 'Jane attacks you! Thankfully you defense!';
                    console.log('Jane attack you!');
                    console.log('Draw');
                }
                combat_text.setAttribute('text', black_text(game_status_str));
            }
            printGameStatus();
		});
	}
});

AFRAME.registerComponent('talk', {
	init: function () {
		var button = this.el;
		button.addEventListener('click', function (evt) {
            var combat_text = document.getElementById('combat-text');
            console.log('You try to talk to Jane!');
            if (game_state == 1) {
                jane_action = getJaneAction();
                if (jane_action == 0) {
                    // Jane Listen
                    game_status_str = 'You try to explain and Janes listens to you!';
                    console.log('Jane tries to listen to you.');
                    heal_times++;
                    console.log('Heal++');
                    if (heal_times == 3) {
                        game_state = 0;
                        game_status_str = 'Jane finally discovers it is you and take you home.';
                        console.log('Peaceful ending.');
                    }
                } else {
                    // Jane Attack
                    game_status_str = 'You try to explain but Jane attacks you!';
                    console.log('Jane attack you!');
                    john_lives--;
                    console.log('John--');
                    if (john_lives == 0) {
                        game_state = 0;
                        game_status_str = 'You are killed by Jane.';
                        console.log('John dies.');
                    }
                }
                combat_text.setAttribute('text', black_text(game_status_str));
            }
            printGameStatus();
		});
	}
});

function printGameStatus() {
    console.log('John: '+john_lives+', Jane: '+jane_lives+', Heal times: '+heal_times);
}

function getJaneAction() {
    if (Math.random() > 0.5)
        return 1;
    else 
        return 0;
}
