


AFRAME.registerComponent('card', {
    init: function () {
      const value = this.el.getAttribute('value');
      const restColor = this.el.getAttribute('restcolor');
      const hoverColor = this.el.getAttribute('hovercolor');
      this.el.innerHTML = `
      <a-plane color="${restColor}" height="1" width="0.7"
        event-set__enter="_event: mouseenter; color: ${hoverColor}"
        event-set__leave="_event: mouseleave; color: ${restColor}">
        <a-text position="0 0 0" align="center" width="0.7" color="white" value="${value}" wrap-count="${value.toString().length}"> </a-text>
      </a-plane>`;
    },
    schema: {
      value: {type: 'number', default: 0},
      restcolor: {type: 'string', default: '#f00'},
      hovercolor: {type: 'string', default: '#00f'},
      value: {type: 'number', default: 0},
    },
  });
  
  AFRAME.registerPrimitive('a-card', {
    defaultComponents: {
      card: {}
    },
    mappings: {
      restcolor: 'card.restcolor',
      hovercolor: 'card.hovercolor',
      value: 'card.value'
    }
  });