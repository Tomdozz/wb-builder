<template>
  <div class="fixed" @click.self="toggleActive">pooop</div>
  <div
    class="container"
    @drop="onDrop($event, this)"
    @dragenter.prevent
    @dragover.prevent
  >
    <slot></slot>
  </div>
</template>

<script>
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useComponentStore();
    const { currentelement } = storeToRefs(store);

    return {
      currentelement,
      store,
    };
  },
  props: {
    id: {
      type: String,
    },
    parentId: {
      type: String
    }
  },
  methods: {
    toggleActive() {
      this.store.setNewActive(this.id);
      console.log("clicked: " + this.id);
    },
    onDrop(event,target) {
      console.log(this.id);
      console.log(target.id);
      this.store.setDropElement({
        componentId: event.dataTransfer.getData("componentId"),
        id: this.id,
        parentId: target.id
      });
    },
  },
};
</script>

<style scoped>
.fixed {
  position: absolute;
}
.container {
  width: 100%;
}
</style>