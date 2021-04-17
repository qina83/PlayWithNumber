AFRAME.registerComponent('rotation-emitter', {
  init: function () {
    this.lastPosition = JSON.stringify({
      rotation: this.el.object3D.rotation
    })
  },
  tick: function () {
    const nowPosition = JSON.stringify({
      rotation: this.el.object3D.rotation
    })

    if (nowPosition === this.lastPosition) {
      return
    }

    this.lastPosition = nowPosition

    const event = new window.CustomEvent('change', {
      detail: {
        rotation: this.el.object3D.rotation
      }
    })

    this.el.dispatchEvent(event)
  }
})

const radToDeg = (radians) => radians * (180 / Math.PI)
