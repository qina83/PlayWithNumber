
AFRAME.registerComponent('timer', {
    init: function () {
        this.width = parseInt(this.el.getAttribute('width'));
        this.endTime = parseInt(this.el.getAttribute('endTime'));
        this.duration = this.endTime - new Date().getTime();
    },
    schema: {
        endTime: { type: 'number', default: 0 },
    },
    tick: function (time, timeDelta) {
        this.leftTime = this.endTime - new Date().getTime();
        const durationPerc = this.leftTime / this.duration;
        let innerWidth = this.width * durationPerc;
        const xPosition = -(this.width - innerWidth) / 2;

        let color = "lime";
        if (durationPerc < 0.7) color = "yellow";
        if (durationPerc < 0.3) color = "red";

        innerWidth = innerWidth > 0 ? innerWidth : 0;

        this.el.innerHTML = `
            <a-entity>
                <a-plane position="0 0 -0.01" color="black" height="0.12" width="${this.width + 0.03}"></a-plane>
                <a-plane position="${xPosition} 0 0" color="${color}" height="0.1" width="${innerWidth}"></a-plane>
            </a-entity>`;

    }});

AFRAME.registerPrimitive('a-timer', {
    defaultComponents: {
        timer: {}
    },
    mappings: {
        endTime: 'timer.endTime'
    }
});