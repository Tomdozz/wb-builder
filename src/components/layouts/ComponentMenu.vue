<template>
  <div class="menu-wrapper">
    <div class="sub-menu-wrapper">
      <div class="sub-menu-toggle" @click="toggleMenu(1)">
        <span>Sections</span>
        <p><font-awesome-icon icon="list" /></p>
      </div>
      <div class="menu">
        <div
          v-for="el in getList(1)"
          :key="el.id"
          class="menu-item"
          draggable="true"
          @dragstart="startDrag($event, el)"
        >
          <p><font-awesome-icon :icon="el.icon" /></p>
          <span>{{ el.name }}</span>
        </div>
      </div>
    </div>
    <div class="sub-menu-wrapper">
      <div class="sub-menu-toggle" @click="toggleMenu(2)">
        <span>Elemnts</span>
        <p><font-awesome-icon icon="list" /></p>
      </div>
      <div class="menu">
        <div
          v-for="el in getList(2)"
          :key="el.id"
          class="menu-item"
          draggable="true"
          @dragstart="startDrag($event, el)"
        >
          <p><font-awesome-icon :icon="el.icon" /></p>
          <span>{{ el.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import basicElements from "../../assets/components/basicComponents.js";

export default {
  data() {
    return {
      elements: basicElements,
      activeList: [],
    };
  },
  mounted() {
    //fix this
    basicElements.forEach((e) => {
      this.activeList.push({
        listId: e.id,
        isActive: true,
      });
    });
  },
  methods: {
    getList(list) {
      return basicElements.filter((item) => item.list == list);
    },
    startDrag(event, component) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      console.log(component);
      console.log(component.id);
      event.dataTransfer.setData("componentId", component.id);
    },
    toggleMenu(list) {
      const item = this.activeList.find((el) => el.id == list);
      item.isActive = true;
      console.log(item);
    },
  },
};
</script>

<style scoped>
.menu-wrapper {
  margin: 10px auto;
  box-shadow: 0 0 10px #ccc;
  padding: 25px 8px 25px 8px;
  background-color: rgb(255, 255, 255);
}
.menu {
  padding: 0;
  height: 100%;
  display: grid;
  margin: 1px;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: minmax(1px,68px);*/
}
.menu-item {
  width: 80px;
  padding: 5px;
  margin: 1px;
}
.menu-item:hover {
  background-color: rgb(206, 206, 206);
  padding: 4.5px;
  box-shadow: 0 0 10px #ccc;
}
.sub-menu-wrapper {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 25px;
}
.sub-menu-toggle {
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  cursor: pointer;
}
</style>
