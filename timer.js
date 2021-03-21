
AFRAME.registerComponent('timer', {
    init: function () {
        this.passTime = 0;
        this.maxWidth = 3;
        this.duration = this.el.getAttribute('duration');

    },
    schema: {
        duration: { type: 'number', default: 0 },
    },
    tick: function (time, timeDelta) {
        this.passTime = this.passTime + timeDelta;
        this.leftTime = this.duration - this.passTime / 1000;
        let durationPerc = this.leftTime / this.duration;
        let width = this.maxWidth * durationPerc;
        let xPosition = -(this.maxWidth - width) / 2;

        let color = "lime";
        if (durationPerc < 0.7) color = "yellow";
        if (durationPerc < 0.3) color = "red";

        if (width > 0)
            this.el.innerHTML = `
            <a-entity position="0 1 -2">
            <a-plane position="0 0 -0.01" color="black" height="0.12" width="${this.maxWidth+0.03}"></a-plane>
            <a-plane position="${xPosition} 0 0" color="${color}" height="0.1" width="${width}"></a-plane>
            </a-entity>`;
    }
});

AFRAME.registerPrimitive('a-timer', {
    defaultComponents: {
        timer: {}
    },
    mappings: {
        duration: 'timer.duration',
    }
});