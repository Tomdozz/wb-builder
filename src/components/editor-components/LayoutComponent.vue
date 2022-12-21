<template>
  <!--<div class="fixed" @click.self="toggleActive">pooop</div>-->
  <div
    class="container"
    @drop="onDrop($event, this)"
    @dragenter.prevent
    @dragover.prevent
    :class="foundation"
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
    },
    foundationClass: {
      type: String
    }
  },
  computed: {
    foundation(){
      return this.foundationClass;
    }
  },
  methods: {
    toggleActive() {
      this.store.setNewActive(this.id);
      console.log("clicked: " + this.id);
    },
    onDrop(event,target) {
      //const componentID = event.dataTransfer.getData("componentId");
      console.log({
        componentId: event.dataTransfer.getData("componentId"),
        id: this.id,
        parentId: target.id
      });
      console.log('traget id is ' + target.id);
      this.store.setDropElement({
        componentId: event.dataTransfer.getData("componentId"),
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

</style>