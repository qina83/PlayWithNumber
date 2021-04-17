AFRAME.registerComponent('lives', {
  schema: {
    src: { type:"string" },
    value:  { type: 'number', default: 1 }
  },
  update: function () {
    const value = parseInt(this.data.value);

    let hearts = "";
    for(let i = 0; i< value; i++){
      const xPos = -(i*5)/10.0;
      hearts +=`<a-image src="${this.data.src}" scale="0.5 0.5 0.5" position="${xPos} 0 0"></a-image>`;
    }


    this.el.innerHTML = `
          <a-entity>
            ${hearts}
          </a-entity>`;
  }
});

AFRAME.registerPrimitive('a-lives', {
  defaultComponents: {
    lives: {}
  },
  mappings: {
    src: 'lives.src',
    value: 'lives.value'
  }
});
