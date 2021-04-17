  AFRAME.registerComponent('rotation-info-plane-receiver', {
    init: function () {
      const component = this
      document
        .querySelector('[rotation-emitter]')
        .addEventListener('change', ({ detail }) => {
          const {
            rotation
          } = detail
  
          window.requestAnimationFrame(() => {
  
            const alpha = rotation.x;
            const beta = rotation.y;
  
            const r = 3;
            const originY = 2;
  
            const yPos = r * Math.sin(alpha);
            const r1 = r * Math.cos(alpha);
  
            const zPos = r1 * Math.cos(beta);
            const xPos = r1 * Math.sin(beta);
  
            const positionTo = {
              x: -xPos,
              y: yPos + originY,
              z: -zPos
            }
  
            const rotationTo = {
              x: radToDeg(rotation.x),
              y: radToDeg(rotation.y),
              z: radToDeg(rotation.z)
            };
  
            component.el.setAttribute('animation', {
              property: 'position',
              to: positionTo.x + " " + positionTo.y + " " + positionTo.z,
              easing: 'easeOutQuad',
              dur:200
            });
  
            component.el.setAttribute('animation__rotation', {
              property: 'rotation',
              to: rotationTo.x + " " + rotationTo.y + " " + rotationTo.z,
              easing: 'easeOutQuad',
              dur:200
            });
  
            component.el.setAttribute('rotation', {
              x: -90 + radToDeg(rotation.x),
              y: radToDeg(rotation.y),
              z: 180 + radToDeg(rotation.z)
            })
          })
        })
    }
  });