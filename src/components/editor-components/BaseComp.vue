<template>
  <div class="wrapper">
    <!--This wrapper  needs to go-->
    <!--Controlls needs to be mpved to some othe component-->

    <div
      :style="computedStyle"
      :class="classes"
      class="drop-el"
      ref="container"
      @mousedown="(e) => $emit('mousdown', id)"
      @click.self="toggleActive"
    >
      <slot></slot>
      <div v-if="activated" class="resizers">
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
    </div>
    <Toolbar v-if="activated"></Toolbar>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import {useComponentStore} from "../../store/useComponent"
import { storeToRefs } from 'pinia'
//import { mapState } from 'pinia'


export default {
    setup() {
    const store = useComponentStore();
    const {currentelement} = storeToRefs(store)

    return {
      currentelement,
      store
    }
  },
  inject: ["getActive"],
  data() {
    return {
      active: this.isActive,
      mouseY: 0,
      height: this.initialHeigt,
      width: this.initWidth,
      left: 0,
      top: 0,
      isMoving: false,

      minimum_size: 20,
      original_width: 0,
      original_height: 0,
      original_x: 0,
      original_y: 0,
      original_mouse_x: 0,
      original_mouse_y: 0,
      currentresiser: "",
      disableWidthResizer: !this.fullyResizable,
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
    initWidth: {
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
    isActive: {
      type: Boolean,
    },
    fullyResizable: {
      type: Boolean
    }
  },

  computed: {
    // ...mapState(useComponentStore(), ['currentelement']),
    activated() {
     
      return this.id == this.currentelement;
    },
    computedStyle() {
      return {
        height: this.height + "px",
        width: this.width + "px",
        top: this.top + "px",
        left: this.left + "px",
        position: this.fullyResizable ? 'absolute' : 'relative'
      };
    },
    classData() {
      return this.classes;
    },
  },
  methods: {
    toggleActive() {
      this.store.setNewActive(this.id);
      //console.log('clicked' + this.id)
      //this.$parent.$emit("activated", this.id);
    },
    initResize(e, currentresiser) {
      this.original_height = this.height;
      this.currentresiser = currentresiser;

      this.original_x = this.$refs.container.getBoundingClientRect().left;
      this.original_y = this.$refs.container.getBoundingClientRect().top;
      this.original_mouse_x = e.pageX;
      this.original_mouse_y = e.pageY;

      window.addEventListener("mousemove", this.resizer);
      window.addEventListener("mouseup", this.stopResize);
    },
    resizer(e) {
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
        if (this.currentresiser === "br") {
          const width = this.original_width + (e.pageX - this.original_mouse_x);
          const height =
            this.original_height + (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            this.width = width;
          }
          if (height > this.minimum_size) {
            this.height = height;
          }
        } else if (this.currentresiser === "bl") {
          const width = this.original_width - (e.pageX - this.original_mouse_x);
          const height = this.original_height + (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            this.width = width;
            this.left = this.original_x + (e.pageX - this.original_mouse_x);
          }
          if (height > this.minimum_size) {
            this.height = height;
          }
        } else if (this.currentresiser === "tr") {
          const width = this.original_width + (e.pageX - this.original_mouse_x);
          const height = this.original_height - (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            this.width = width;
          }
          if (height > this.minimum_size) {
            this.height = height;
            this.top = this.original_y + (e.pagey - this.original_mouse_y);
          }
        } else {
          const width = this.original_width - (e.pageX - this.original_mouse_x);
          const height = this.original_height - (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            this.width = width;
            this.left = this.original_x + (e.pageX - this.original_mouse_x);
          }
          if (height > this.minimum_size) {
            this.height = height;
            this.top = this.original_y + (e.pagey - this.original_mouse_y);
          }
        }
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
  padding: 5px;
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
  border-radius: 50%;
  background: white;
  border: 3px solid #00ff3c;
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
