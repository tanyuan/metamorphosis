AFRAME.registerComponent("travel-node-defaults", {
    schema: {
        axis: {
            type: 'string',
            default: 'x,z'
        },
        offsetX: {
            type: 'number',
            default: 0
        },
        offsetY: {
            type: 'number',
            default: 0
        },
        offsetZ: {
            type: 'number',
            default: 0
        },
        transition: {
            type: 'string',
            default: 'fade'
        },
        animationDur: {
            type: 'number',
            default: 100
        },
        animationEasing: {
            type: 'string',
            default: 'linear'
        },
        travelTarget: {
            type: "selector",
            default: "[camera]"
        }
    },

    init: function() {
        var scene = document.querySelector('a-scene');
        if (scene.hasLoaded) {
            this.checkElement();
        } else {
            scene.addEventListener('loaded', function () {
                this.checkElement();
            }.bind(this));
        }
    },

    checkElement: function() {
        if(this.el.tagName !== "A-SCENE") {
            console.warn("travel-node-defaults should be placed on the a-scene element.");
        }
    }
});