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
      ></editor-component>
      <h1>{{ currentelement }}</h1>
      <base-advanced-setting
        v-if="toolboxOpen"
        :top="toolBoxPosition.y"
        :left="toolBoxPosition.x"
        :val="null"
        @close="this.toolboxOpen = false"
      />
    </div>
  </div>
</template>

<script>
import EditorComponent from "./EditorComponent2.vue";
import BaseAdvancedSetting from "../UI/BaseAdvancedSetting.vue";
import basicElements from "../../assets/components/componentList.js";
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useComponentStore();
    const { currentelement, dropElement, toolBoxPosition } = storeToRefs(store);
    return {
      currentelement,
      store,
      dropElement,
      toolBoxPosition,
    };
  },
  components: {
    EditorComponent,
    BaseAdvancedSetting,
  },
  watch: {
    dropElement(val) {
      if (!this.store.isDropEmpty) {
        this.onDropNested(val);
      }
    },
    currentelement() {
      if (!this.store.isCurrerntElementEmpty) {
        this.toolboxOpen = true;
      }
    },
  },
  data() {
    return {
      components: [],
      componetIds: [],
      activeComponent: "",
      toolboxOpen: false,
    };
  },
  provide() {
    return {
      getActive: () => this.activeComponent,
    };
  },
  methods: {
    deepSearch(object, key, predicate) {
      // eslint-disable-next-line no-prototype-builtins
      if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
        return object;

      for (let i = 0; i < Object.keys(object).length; i++) {
        let value = object[Object.keys(object)[i]];
        if (typeof value === "object" && value != null) {
          let o = this.deepSearch(
            object[Object.keys(object)[i]],
            key,
            predicate
          );
          if (o != null) return o;
        }
      }
      return null;
    },
    getNestedElement(comp) {
      let nested = this.createElement(comp);
      if (comp.components) {
        comp.components.forEach((c) => {
          nested.components.push(this.getNestedElement(c));
        });
      }
      return nested;
    },
    addElem(comp, to) {
      let ele = this.getNestedElement(comp);

      if (to.id === "-1") {
        if (to.location) {
          this.components.splice(to.location, 0, ele);
        } else {
          this.components.push(ele);
        }
      } else {
        var addTo = this.deepSearch(
          this.components,
          "uid",
          (k, v) => v === to.id
        );
        if (addTo != null) {
          addTo.components.push(ele);
        } else {
          console.log("could not find the element");
        }
      }
    },
    createElement(data) {
      return {
        name: data.name,
        classes: data.classes,
        uid: Math.random().toString(16).slice(2),
        active: false,
        type: data.type,
        components: [],
      };
    },
    onDropNested(data) {
      const componentDescription = basicElements.find(
        (item) => item.id == data.componentId
      );
      const componentListDescription = componentDescription;
      if (componentListDescription.components) {
        componentListDescription.components.forEach((c) => {
          this.addElem(c, {
            id: data.parentId,
            location: this.getLocation(data.y, "." + this.uid),
          });
        });
      }
    },
    getLocation(eventY, selector) {
      const dropElementY = eventY;
      const compTables = this.$refs.container.querySelectorAll(selector); //might need to take this list from state
      let location = null;
      if (compTables.length >= 1) {
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          //insert above
          if (dropElementY <= compTablesY1) {
            location = i;
            break;
          }

          //insert below
          if (dropElementY <= compTablesY2) {
            location = i + 1;
            break;
          }
        }
      }
      return location;
    },
    onDrop(event) {
      if (!this.store.isDropEmpty) {
        this.store.clearDropElemet();
        console.log("dropped in nested");
      } else {
        const componentId = event.dataTransfer.getData("componentId");
        const componentDescription = basicElements.find(
          (item) => item.id == componentId
        );

        if (componentDescription.components) {
          componentDescription.components.forEach((c) => {
            this.addElem(c, {
              id: "-1",
              location: this.getLocation(event, ".drop-el"),
            });
          });
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.main-editor {
  width: 80%;
  height: 900px;
  
  .drop-zone {
    height: 98%;
    width: 98%;
    margin: 10px auto;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
