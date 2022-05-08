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
      <div
        v-if="active"
        class="handles"
        id="handle"
        @mousedown="captureMouse"
        @mouseup="mouseUp"
      ></div>
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
    captureMouse() {
      document.addEventListener("mousemove", this.resize, false);
      //document.addEventListener("mouseup", this.mouseUp, false);
    },
    resize(e) {
      this.isMoving = true;
      //console.log(e);
      e.preventDefault();
      var rect = e.target.getBoundingClientRect();
      //let x = e.clientX - rect.left; //x position within the element.
      let y = e.clientY - rect.top; //y position within the element.
      var dy = y;
      console.log(dy);
      this.height = dy;
    },
    mouseUp() {
      this.isMoving = false;

      document.removeEventListener("mousemove", this.resize, false);
      //document.removeEventListener("mouseup", this.mouseUp, false);
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
</style>
