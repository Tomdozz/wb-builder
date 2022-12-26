<template>
  <teleport to="#main-zone">
    <div class="advanced-setting">
      <div class="head-button-wrapper">
        <button :class="regular ? 'selected' : ''"></button>
        <button :class="!regular ? 'selected' : ''"></button>
      </div>
      <div class="setting-wrapper" :class="selected === -1 ? 'expanded' : ''">
        <div class="menu">
          <div class="tab" @click="setSelected(0)">
            <i class="icon fa-solid fa-border-all"></i>
            <span> Fill color </span>
          </div>
          <div class="tab" @click="setSelected(1)">
            <i class="icon fa-solid fa-border-all"></i>
            <span> Border </span>
          </div>
          <div class="tab" @click="setSelected(2)">
            <i class="icon fa-solid fa-border-all"></i>
            <span> Corners </span>
          </div>
          <div class="tab" @click="setSelected(3)">
            <i class="icon fa-solid fa-border-all"></i>
            <span> shadow </span>
          </div>
        </div>
        <div class="content">test</div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  data() {
    return {
      regular: true,
      obj: this.value,
      selected: -1,
    };
  },
  props: {
    val: {
      type: Object,
      required: true,
    },
    top: {
      type: Number
    },
    left: {
      type: Number
    }
  },
  methods: {
    setSelected(id) {
      this.selected = id;
    },
  },
};
</script>

<style scoped>
.advanced-setting {
  position: absolute;
  top: 0px;
  left: 0px;
  max-width: 300px;
  min-width: 280px;
}
.setting-wrapper {
  display: flex;
  padding: 5px;
  background-color: rgb(226, 226, 226);
}
.setting-wrapper.expanded .content {
  display: none;
}
.setting-wrapper.expanded .menu {
  width: 100%;
}
.setting-wrapper.expanded .menu span {
  display: inline;
}
.setting-wrapper .menu span {
  display: none;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu i {
  padding-left: 8px;
  padding-right: 8px;
}
.setting-wrapper .content {
  flex: 4;
}
.tab {
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 25px;
  min-width: 30px;
  margin: 1px;
  width: 100%;
}

.content {
}
.tab:hover {
  border-left: 1px solid black;
  background-color: grey;
}
</style>
