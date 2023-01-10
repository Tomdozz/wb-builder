<template>
  <button :class="styleClass" class="btn">
    <slot />
  </button>
</template>

<script>
export const TYPE = {
  FILL: "fill",
  STROKE: "stroke",
  GHOST: "ghost",
};
export default {
  props: {
    type: {
      type: String,
      default: TYPE.FILL,
    },
  },
  computed: {
    styleClass() {
      return ["btn-" + this.type];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables.scss";
.btn {
  padding: 5px;
  border-radius: 10px;
  color: white;
}

.btn- {
  &fill {
    background-color: $accent-color-accent-10;
    border: 1px solid $accent-color-accent-10;
  }
  &fill:hover {
    background-color: $accent-color-accent-secondary;
    border: 1px solid $accent-color-accent-secondary;
  }
  &stroke {
    background-color: transparent;
    border: 1px solid $accent-color-accent-10;
    color: $accent-color-accent-10;
  }
   &stroke:hover {
    border: 1px solid $accent-color-accent-secondary;
        color: $accent-color-accent-secondary;
  }
  &ghost {
    background-color: transparent;
    color: black;
  }
  &ghost:hover{
    color: $accent-color-accent-10;
  }
}
</style>