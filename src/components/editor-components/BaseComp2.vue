<template>
  <!--Now add controls that are same size as slot-->
  <component
    :is="htmlType"
    :style="computedStyle"
    :id="uid"
    :class="[uid, classes]"
    :builder-type="type"
    :contentEditable="type === 'text' ? true : false"
    class="drop-el"
    ref="container"
    @drop="onDrop($event, this)"
    @mousedown="(e) => $emit('mousdown', id)"
    @click.self="toggleActive($event)"
  >
    <slot></slot>
    <div v-if="activated" class="resizers">
      <div @mousedown="initResize($event, 'top')" class="resizer top"></div>
      <div @mousedown="initResize($event, 'right')" class="resizer right"></div>
      <div
        @mousedown="initResize($event, 'bottom')"
        class="resizer bottom"
      ></div>
      <div @mousedown="initResize($event, 'left')" class="resizer left"></div>
    </div>
    <!-- <div v-if="activated" class="resize-handles">
      <div @mousedown="initResize($event, 'tl')" class="handle"></div>
      <div
        @mousedown="initResize($event, 'rt')"
        class="handle"
      ></div>
      <div
        @mousedown="initResize($event, 'bl')"
        class="handle"
      ></div>
      <div
        @mousedown="initResize($event, 'br')"
        class="handle"
      ></div>
    </div> -->
  </component>
  <Toolbar v-if="activated"></Toolbar>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";
//import { mapState } from 'pinia'

export default {
  setup() {
    const store = useComponentStore();
    const { currentelement } = storeToRefs(store);

    return {
      currentelement,
      store,
    };
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
    uid: {
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
      type: Boolean,
    },
    htmlType: {
      type: String,
    },
    type: {
      type: String,
    },
  },

  computed: {
    // ...mapState(useComponentStore(), ['currentelement']),
    activated() {
      return this.uid == this.currentelement;
    },
    computedStyle() {
      //return null;
      return {
        height: this.height + "px",
        width: this.width + "px",
        top: this.top + "px",
        left: this.left + "px",
        //position: this.fullyResizable ? "absolute" : "relative",
      };
    },
    classData() {
      return this.classes;
    },
  },
  methods: {
    toggleActive(e) {
      console.log(e);
      this.store.setToolBoxPosition({ x: e.x, y: e.y });
      this.store.setNewActive(this.uid);
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
      e.preventDefault();
      if (this.disableWidthResizer) {
        console.log("disable width");
      } else {
        const el = this.$refs.container;
        if (this.currentresiser === "bottom") {
          console.log("bottom");
                    const height = el.offsetHeight + (e.pageY - this.original_mouse_y);
          console.log("bottom : heigh: " + height);
          if (height > this.minimum_size) {
            this.height = height;
          }
        }
      }

      if (this.disableWidthResizer) {
        if (this.currentresiser === "bl" || this.currentresiser === "br") {
          console.log("only hight");
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
        const el = this.$refs.container;

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
          const width = el.offsetWidth - (e.pageX - this.original_mouse_x);
          const height = el.offsetHeight + (e.pageY - this.original_mouse_y);
          console.log("bottom left: width: " + width);
          console.log("bottom left: heigh: " + height);
          if (width > this.minimum_size) {
            this.width = width;
            this.left = this.original_x + (e.pageX - this.original_mouse_x);
          }
          if (height > this.minimum_size) {
            this.height = height;
          }
        } else if (this.currentresiser === "tr") {
          const width = this.original_width + (e.pageX - this.original_mouse_x);
          const height =
            this.original_height - (e.pageY - this.original_mouse_y);
          if (width > this.minimum_size) {
            this.width = width;
          }
          if (height > this.minimum_size) {
            this.height = height;
            this.top = this.original_y + (e.pagey - this.original_mouse_y);
          }
        } else {
          const width = this.original_width - (e.pageX - this.original_mouse_x);
          const height =
            this.original_height - (e.pageY - this.original_mouse_y);
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
    onDrop(event, target) {
      console.log({
        componentId: event.dataTransfer.getData("componentId"),
        parentId: target.uid,
        id: this.uid,
      });
      this.store.setDropElement({
        componentId: event.dataTransfer.getData("componentId"),
        parentId: target.uid,
        id: this.uid,
        y: event.y,
      });
      event.stopPropagation();
    },
  },
  components: { Toolbar },
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables.scss";
/*.columns {
  display: flex;
}*/
.drop-el {
  border: 1px dotted black;
  /*position: relative;*/
  padding: 5px;
  min-height: 80px;
  position: relative;
}
.drop-el:hover {
  border: 1px solid $accent-color-accent-10;
}
.wrapper {
  position: relative;
}

.handles {
  cursor: ns-resize;
  width: 100%;
  height: 15px;
  background-color: $accent-color-accent-10;
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
  border: 3px solid $accent-color-accent-10;
  position: absolute;
}

.resizers .resizer.top {
  top: -5px;
  left: calc(50% - 5px);
  cursor: nwse-resize; /*resizer cursor*/
}
.resizers .resizer.right {
  top: calc(50% - 5px);
  right: -5px;
  cursor: nesw-resize;
}
.resizers .resizer.bottom {
  bottom: -5px;
  left: calc(50% - 5px);
  cursor: nesw-resize;
}
.resizers .resizer.left {
  top: calc(50% - 5px);
  left: -5px;
  cursor: nwse-resize;
}

.resize-handles {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}

.handle {
  width: 10px;
  height: 10px;
  background-color: #333;
  cursor: pointer;
}

.handle:nth-child(1) {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.handle:nth-child(2) {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
}

.handle:nth-child(3) {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.handle:nth-child(4) {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
}
</style>
