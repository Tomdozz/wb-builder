<template>
  <div class="wrapper">
    <div
      :style="computedStyle"
      :class="classes"
      class="drop-el"
      ref="container"
      @mousedown="(e) => $emit('mousdown', id)"
      @click="toggleActive"
    >
      <slot></slot>
      <div class="resizers">
        <div
          @mousedown="initResize($event, 'tl')"
          class="resizer top-left"
        ></div>
        <div
          @mousedown="initResize($event, 'rt')"
          class="resizer top-right"
        ></div>
        <div
          @mousedown="initResize($event, 'bl')"
          class="resizer bottom-left"
        ></div>
        <div
          @mousedown="initResize($event, 'br')"
          class="resizer bottom-right"
        ></div>
      </div>
      <!--<div
        v-if="active"
        class="handles"
        id="handle"
        @mousedown="captureMouse"
        @mouseup="mouseUp"
      ></div>-->
    </div>
    <Toolbar v-if="active"></Toolbar>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
export default {
  data() {
    return {
      active: false,
      mouseY: 0,
      height: this.initialHeigt,
      isMoving: false,

      minimum_size: 20,
      original_width: 0,
      original_height: 0,
      original_x: 0,
      original_y: 0,
      original_mouse_x: 0,
      original_mouse_y: 0,
      currentresiser: "",
      disableWidthResizer: true,
    };
  },
  props: {
    id: {
      type: String,
    },
    styles: {
      type: void 0,
    },
    classes: {
      type: String,
    },
    width: {
      type: Number,
    },
    initialHeigt: {
      type: Number,
    },
    minHeight: {
      type: String,
    },
    posX: {
      type: String,
    },
    posY: {
      type: String,
    },
  },
  computed: {
    computedStyle() {
      return {
        height: this.height + "px",
        width: this.width + "px",
        top: this.posY + "px",
        left: this.posX + "px",
      };
    },
    classData() {
      return this.classes;
    },
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
    initResize(e, currentresiser) {
      console.log(e);
      console.log(this.$refs.container.getBoundingClientRect());

      this.original_height = this.height;
      this.currentresiser = currentresiser;

      this.original_x = this.$refs.container.getBoundingClientRect().left;
      this.original_y = this.$refs.container.getBoundingClientRect().top;
      this.original_mouse_x = e.pageX;
      this.original_mouse_y = e.pageY;

      console.log(this.original_mouse_y);

      window.addEventListener("mousemove", this.resizer);
      window.addEventListener("mouseup", this.stopResize);
    },
    resizer(e) {
      console.log(e);
      if (this.disableWidthResizer) {
        if (this.currentresiser === "bl" || this.currentresiser === "br") {
          const width = this.original_width + (e.pageX - this.original_mouse_x);
          const height =
            this.original_height + (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            //element.style.width = width + 'px'
          }
          if (height > this.minimum_size) {
            this.height = height;
          }
        }
      } else {
        //logic for all sizers
      }
    },
    stopResize() {
      window.removeEventListener("mousemove", this.resizer);
    },
  },
  components: { Toolbar },
};
</script>

<style scoped>
.columns {
  display: flex;
}
.drop-el {
  border: 1px dotted black;
  position: relative;
}
.wrapper {
  position: relative;
}

.handles {
  cursor: ns-resize;
  width: 100%;
  height: 15px;
  background-color: aquamarine;
  position: absolute;
  bottom: 0;
}

.resizers {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%; /*magic to turn square into circle*/
  background: white;
  border: 3px solid #4286f4;
  position: absolute;
}

.resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
