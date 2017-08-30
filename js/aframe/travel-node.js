AFRAME.registerComponent("travel-node", {
    schema: {
        axis: {
            type: 'string',
            default: null
        },
        offsetX: {
            type: 'number',
            default: null
        },
        offsetY: {
            type: 'number',
            default: null
        },
        offsetZ: {
            type: 'number',
            default: null
        },
        transition: {
            type: 'string',
            default: null
        },
        animationDur: {
            type: 'number',
            default: null
        },
        animationEasing: {
            type: 'number',
            default: null
        },
        travelTarget: {
            type: "selector"
        }
    },

    axises: null,
    clickEventRegistered: false,
    travelTarget: null,

    update: function () {
        var scene = document.querySelector('a-scene');
        if (scene.hasLoaded) {
            this.setupVariables();
        } else {
            scene.addEventListener('loaded', function () {
                this.setupVariables();
            }.bind(this));
        }
    },

    setupVariables: function () {
        var scene = document.querySelector('a-scene');
        var defaults = scene.components["travel-node-defaults"];

        if(defaults === undefined) {
            scene.setAttribute("travel-node-defaults", "");
            setTimeout(this.setupVariables.bind(this), 10);
            return;
        }

        for (var i in this.data) {
            if (
                this.schema[i].type === 'number' && isNaN(this.data[i]) ||
                this.data[i] === null
            ) {
                this.data[i] = defaults.data[i];
            }
        }

        this.axises = {};
        var axisData = this.data.axis.toLowerCase().split(",");
        var possibleAxises = ["x", "y", "z"];

        for (var i in possibleAxises) {
            var axis = possibleAxises[i];
            if (axisData.indexOf(axis) >= 0) {
                this.axises[axis] = true;
            }
        }

        this.travelTarget = this.data.travelTarget;
        if(this.travelTarget === null) {
            console.warn("Can't determine travel target.");
        }

        if (!this.clickEventRegistered) {
            this.el.addEventListener("click", this.onClick.bind(this))
            this.clickEventRegistered = true;
        }

    },

    onClick: function () {
        var newPosition = new THREE.Vector3();;
        var targetPosition = new THREE.Vector3();
        newPosition.setFromMatrixPosition(this.el.object3D.matrixWorld);
        targetPosition.setFromMatrixPosition(this.travelTarget.object3D.matrixWorld);

        for (var axis in this.axises) {
            targetPosition[axis] = newPosition[axis];
        }

        targetPosition.x += this.data.offsetX;
        targetPosition.y += this.data.offsetY;
        targetPosition.z += this.data.offsetZ;

        this.targetPosition = targetPosition;

        switch (this.data.transition) {
            case "fade":
                this.fadeToTarget();
                break;

            case "move":
                if(AFRAME.components["animation"]) {
                    this.moveToTarget();
                } else {
                    console.warn("To use the 'move' transition, you will need to add the aframe-animation-component component, available at https://github.com/ngokevin/aframe-animation-component");
                    this.jumpToTarget();
                }
                break;

            default:
                console.warn("Unknown travel mode: " + this.data.mode);

            case "jump":
                this.jumpToTarget();
                break;
        }
    },

    fadeToTarget: function () {
        var scene = document.querySelector("a-scene");
        var camera = scene.camera.el;

        var plane = document.createElement("a-plane");
        plane.setAttribute("position", "0 0 -0.1");
        plane.setAttribute("material", "color: black; transparent: true; opacity: 0");

        var fadeOut = document.createElement("a-animation");
        fadeOut.setAttribute("attribute", "material.opacity");
        fadeOut.setAttribute("from", "0");
        fadeOut.setAttribute("to", "1");
        fadeOut.setAttribute("dur", this.data.animationDur);
        fadeOut.setAttribute("easing", this.data.animationEasing);

        var fadeIn = fadeOut.cloneNode(true);
        fadeIn.setAttribute("from", "1");
        fadeIn.setAttribute("to", "0");
        fadeIn.setAttribute("delay", this.data.animationDur + 100);

        fadeOut.addEventListener("animationend", function() {
            this.jumpToTarget();
        }.bind(this));

        fadeIn.addEventListener("animationend", function() {
            plane.removeChild(fadeIn);
            plane.removeChild(fadeOut);
            camera.removeChild(plane);
        });

        plane.appendChild(fadeIn);
        plane.appendChild(fadeOut);
        camera.appendChild(plane);
    },

    moveToTarget: function () {
        var attribute = "property: position; to: " + this.targetPosition.x + " " + this.targetPosition.y + " " + this.targetPosition.z + "; dur: " + this.data.animationDur + "; easing: " + this.data.animationEasing;
        this.travelTarget.setAttribute("animation__travel-node_movetotarget", attribute);

        this.travelTarget.addEventListener("animation__travel-node_movetotarget-complete", function() {
            this.travelTarget.removeAttribute("animation__travel-node_movetotarget");
        }.bind(this));
    },

    jumpToTarget: function () {
        this.travelTarget.setAttribute("position", this.targetPosition);
    }
});
