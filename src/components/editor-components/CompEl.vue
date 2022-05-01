<template>
  <div>
    <div
      :style="computedStyle"
      :class="classes"
      class="drop-el"
      ref="container"
      @mousedown="(e) => $emit('mousdown', id)"
      @click="toggleActive"
    ></div>
    <Toolbar v-if="active"></Toolbar>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
export default {
  data() {
    return {
      active: false,
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
      type: String,
    },
    height: {
      type: String,
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
        height: this.height,
        width: this.width,
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
      console.log("activated: " + this.id);
      this.active = !this.active;
      this.$emit("activated", this.id);
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
  /*padding: 3px;*/
  /*position: relative;*/
}
</style>
