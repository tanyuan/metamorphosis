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
		button.addEventListener('mouseenter', function (evt) {
            button.setAttribute('scale', '1.2 1.2 1.2');
        });
		button.addEventListener('mouseleave', function (evt) {
            button.setAttribute('scale', '1.0 1.0 1.0');
        });
		button.addEventListener('click', function (evt) {
            var combat_text = document.getElementById('combat-text');
            if (game_state == 1) {
                jane_action = getJaneAction();
                if (jane_action == 0) {
                    // Jane Listen
                    game_status_str = 'Jane tries to listen to you but you defense...';
                    jane_lives--;
                    refreshJaneHeart();
                    if (jane_lives == 0) {
                        game_state = 0;
                        game_status_str = 'You killed Jane!';
                        endGame();
                    }
                } else {
                    // Jane Attack
                    game_status_str = 'Jane attacks you! Thankfully you defense!';
                }
                combat_text.setAttribute('text', white_text_big(game_status_str));
            }
            printGameStatus();
		});
	}
});

AFRAME.registerComponent('talk', {
	init: function () {
		var button = this.el;
		button.addEventListener('mouseenter', function (evt) {
            button.setAttribute('scale', '1.2 1.2 1.2');
        });
		button.addEventListener('mouseleave', function (evt) {
            button.setAttribute('scale', '1.0 1.0 1.0');
        });
		button.addEventListener('click', function (evt) {
            var combat_text = document.getElementById('combat-text');
            if (game_state == 1) {
                jane_action = getJaneAction();
                if (jane_action == 0) {
                    // Jane Listen
                    switch(heal_times) {
                        case 0:
                            game_status_str = '"You monster! Tell me where is John!"';
                            break;
                        case 1:
                            game_status_str = '"No way you are John! Tell me who you are!"';
                            break;
                        case 2:
                            game_status_str = '"You sounds like John! It can\'t be!"';
                            break;
                    }
                    heal_times++;
                    if (heal_times == 3) {
                        game_state = 0;
                        game_status_str = 'Oh my dear, let\'t go home and figure all this out!';
                        endGame();
                    }
                } else {
                    // Jane Attack
                    game_status_str = 'You try to explain but Jane attacks you!';
                    john_lives--;
                    refreshJohnHeart();
                    if (john_lives == 0) {
                        game_state = 0;
                        game_status_str = 'You are killed by Jane.';
                        endGame();
                    }
                }
                combat_text.setAttribute('text', white_text_big(game_status_str));
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

function endGame() {
    var button_defense = document.getElementById('button-defense');
    var button_talk = document.getElementById('button-talk');
    button_defense.setAttribute('visible', 'false');
    button_talk.setAttribute('visible', 'false');
}

function refreshJohnHeart() {
    var heart_1 = document.getElementById('john_heart_1');
    var heart_2 = document.getElementById('john_heart_2');
    var heart_3 = document.getElementById('john_heart_3');

    switch(john_lives) {
        case 3:
            break;
        case 2:
            heart_3.setAttribute('visible', 'false');
            break;
        case 1:
            heart_3.setAttribute('visible', 'false');
            heart_2.setAttribute('visible', 'false');
            break;
        default:
            heart_3.setAttribute('visible', 'false');
            heart_2.setAttribute('visible', 'false');
            heart_1.setAttribute('visible', 'false');
    }
}

function refreshJaneHeart() {
    var heart_1 = document.getElementById('jane_heart_1');
    var heart_2 = document.getElementById('jane_heart_2');
    var heart_3 = document.getElementById('jane_heart_3');

    switch(jane_lives) {
        case 3:
            break;
        case 2:
            heart_3.setAttribute('visible', 'false');
            break;
        case 1:
            heart_3.setAttribute('visible', 'false');
            heart_2.setAttribute('visible', 'false');
            break;
        default:
            heart_3.setAttribute('visible', 'false');
            heart_2.setAttribute('visible', 'false');
            heart_1.setAttribute('visible', 'false');
    }
}

function black_text_big(message) {
	return {
		width: 4, 
		color: 'black', 
		align: 'center', 
		value: message
	};
}

function white_text_big(message) {
	return {
		width: 4, 
		color: 'white', 
		align: 'center', 
		value: message
	};
}
