<template>
  <div class="main-editor" id="main-zone">
    <div
      class="drop-zone"
      ref="container"
      @drop="onDrop($event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <editor-component
        v-for="component in components"
        :key="component.uid"
        :component="component"
        @add-sub="fromSub"
      ></editor-component>
      <h1>{{ currentelement }}</h1>
    </div>
  </div>
</template>

<script>
import EditorComponent from "./EditorComponent.vue";
import basicElements from "../../assets/components/basicComponents_1.js";
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useComponentStore();
    const { currentelement, dropElement } = storeToRefs(store);
    //let currentDrop = null;

    /*store.$subscribe((mutation, state) =>{
      //currentDrop = state.dropElement;
      console.log(mutation, state);
    } )*/

    return {
      currentelement,
      store,
      dropElement,
      //currentDrop
    };
  },
  components: {
    EditorComponent,
  },
  watch: {
    dropElement(newval, oldval) {
      console.log(
        "newval id is: " +
          newval.componentId +
          " and parent is " +
          newval.parentId
      );
      console.log(
        "oldval id is: " +
          oldval.componentId +
          " and parent is " +
          oldval.parentId
      );
    },
  },
  data() {
    return {
      components: [],
      componetIds: [],
      activeComponent: "",
      
    };
  },
  provide() {
    return {
      getActive: () => this.activeComponent,
    };
  },
  methods: {
    fromSub(data) {
      console.log("data from sub is: " + data);
    },
    setActive(id) {
      this.activeComponent = id;
    },
    addElement(data) {
      let compId;
      const componentId = data.componentId;
      const component = basicElements.find((item) => item.id == componentId);

      component.active = false;

      compId = Math.random().toString(16).slice(2);
      component.uid = compId;
      this.componetIds.push(compId);

      if (data.parentId) {
        const parent = this.store.getComponentList().find((item) => {
          item.uid == data.parentId
        });
        console.log(parent.uid);
      }

      if (component.isLayout) {
        component.grid.forEach((cell) => {
          cell.active = false;
          compId = Math.random().toString(16).slice(2);

          cell.uid = compId;
          this.componetIds.push(compId);
        });
      }

      if (component.childs) {
        component.childs.forEach((child) => {
          child.active = false;
          compId = Math.random().toString(16).slice(2);

          child.uid = compId;
          this.componetIds.push(compId);
        });
      }

      const dropElementY = event.y;
      const compTables = this.$refs.container.querySelectorAll(".drop-el"); //might need to take this list from state

      if (compTables.length >= 1) {
        let added = false;
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          //insert above
          if (dropElementY <= compTablesY1) {
            this.components.splice(i, 0, component);
            added = true;
            break;
          }

          //insert below
          if (dropElementY <= compTablesY2) {
            this.components.splice(i + 1, 0, component);
            added = true;
            break;
          }
        }
        if (!added) {
          this.components.push(component);
        }
      } else {
        this.components.push(component);
      }

      this.store.resetComponentList();
      this.store.setComponentList(this.components);
    },

    onDrop(event) {
      let compId;
      const componentId = event.dataTransfer.getData("componentId");
      const component = basicElements.find((item) => item.id == componentId);

      component.active = false;

      compId = Math.random().toString(16).slice(2);
      component.uid = compId;
      this.componetIds.push(compId);

      if (component.isLayout) {
        component.grid.forEach((cell) => {
          cell.active = false;
          compId = Math.random().toString(16).slice(2);

          cell.uid = compId;
          this.componetIds.push(compId);
        });
      }

      if (component.childs) {
        component.childs.forEach((child) => {
          child.active = false;
          compId = Math.random().toString(16).slice(2);

          child.uid = compId;
          this.componetIds.push(compId);
        });
      }

      const dropElementY = event.y;
      const compTables = this.$refs.container.querySelectorAll(".drop-el"); //might need to take this list from state

      if (compTables.length >= 1) {
        let added = false;
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          //insert above
          if (dropElementY <= compTablesY1) {
            this.components.splice(i, 0, component);
            added = true;
            break;
          }

          //insert below
          if (dropElementY <= compTablesY2) {
            this.components.splice(i + 1, 0, component);
            added = true;
            break;
          }
        }
        if (!added) {
          this.components.push(component);
        }
      } else {
        this.components.push(component);
      }

      this.store.resetComponentList();
      this.store.setComponentList(this.components);
    },
  },
};
</script>
<style scoped>
.main-editor {
  width: 80%;
  height: 900px;
}
.drop-zone {
  height: 98%;
  width: 98%;
  margin: 10px auto;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 10px #ccc;
}
</style>
