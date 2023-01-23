<template>
  <div>
    <div id="color-picker">
      <input type="color" v-model="color" @input="updateCSS"/>
      <input type="range" min="10" max="50" v-model="fontSize" @input="updateCSS"/>
    </div>
    <div id="preview">
      <p :class="cssClass" >Preview Text</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#000000',
      fontSize: 10,
    }
  },
  computed: {
    cssClass() {
      return `custom-style-${this._uid}`
    }
  },
  methods: {
    updateCSS() {
      let styleEl = document.getElementById('dynamic-style')
      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = 'dynamic-style'
        document.head.appendChild(styleEl)
      }
      styleEl.innerHTML = `.${this.cssClass} { color: ${this.color}; font-size: ${this.fontSize}px; }`
    }
  },
  mounted() {
    this.updateCSS()
  }
}
</script>