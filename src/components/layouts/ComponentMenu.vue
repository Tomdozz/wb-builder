<template>
  <div class="menu-wrapper">
    <div class="sub-menu-wrapper">
      <div class="sub-menu-toggle" @click="toggleMenu(1)">
        <i
          class="fa-solid fa-square-plus fa-2xl"
          :class="activatedList === 1 ? 'active' : ''"
        ></i>
      </div>
      <div class="sub-menu-toggle" @click="toggleMenu(2)">
        <i
          class="fa-solid fa-photo-film fa-2xl"
          :class="activatedList === 2 ? 'active' : ''"
        ></i>
      </div>
    </div>
    <div class="current-menu">
      <div class="menu">
        <div
          v-for="el in getActiveList()"
          :key="el.id"
          class="menu-item"
          draggable="true"
          @dragstart="startDrag($event, el)"
        >
          <span>{{ el.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import basicElements from "../../assets/components/componentList.js";
export default {
  data() {
    return {
      elements: basicElements,
      activeList: [],
      activatedList: -1,
    };
  },
  mounted() {
    console.log(basicElements);
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
    getActiveList() {
      console.log(basicElements);
      return basicElements.filter((item) => item.list == this.activatedList);
    },
    startDrag(event, component) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("componentId", component.id);
    },
    toggleMenu(list) {
      //const item = this.activeList.find((el) => el.id == list);
      //item.isActive = true;
      console.log("activated" + list);
      this.activatedList = list;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables.scss";

.menu-wrapper {
  //margin: 10px auto;
  //width: 20%;
  //box-shadow: -15px 0px 10px -15px #ccc;
  //box-shadow: 15px 0 5px -9px #ccc;

  //padding: 25px 8px 25px 8px;
  background-color: $secondary-color-30;
  position: fixed;
  top: 5rem;
  height: 100%;
  max-width: 5rem;
}
.menu {
  //padding: 10px;
  display: grid;
  margin: 1px;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: minmax(1px,68px);*/
}
.menu-item {
  width: 180px;
  margin: 10px;
  padding: 5px;
  margin: 1px;
  border-radius: 10px;
}
.menu-item:hover {
  background-color: $accent-color-accent-10;
  padding: 4.5px;
  box-shadow: 0 0 10px #ccc;
}
.sub-menu-wrapper {
  padding-top: 15px;
  //border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  //padding-bottom: 25px;
  //box-shadow: 15px 0px 10px -15px #ccc;
}
.sub-menu-toggle {
  margin-bottom: 15px;
  padding: 15px;
  color: #ccc;
 // display: flex;
 // justify-content: space-between;
 // align-items: center;
  //width: 90%;
  cursor: pointer;
  &:hover {
      color: $accent-color-accent-10;
  }
}
.current-menu {
  position: absolute;
  top: 0;
  left: 60px;
  background-color: $secondary-color-30;
  height: 100%;
}
.active {
  color: rgb(72, 72, 72);
}
</style>
