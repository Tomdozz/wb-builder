<template>
  <teleport to="#main-zone">
    <div class="advanced-setting" :style="settingStyle">
      <div class="head-button-wrapper">
        <button :class="regular ? 'selected' : ''"></button>
        <button :class="!regular ? 'selected' : ''"></button>
      </div>
      <base-content-card :collapsed="true">
        <template #title>
          <span> Base </span>
        </template>
        <template #actions>
          <div
            class="setting-wrapper"
            :class="selected === -1 ? 'expanded' : ''"
          >
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
                <span> Shadow </span>
              </div>
            </div>
            <div class="content">test</div>
          </div>
        </template>
      </base-content-card>
      <base-content-card :collapsed="true">
        <template #title>
          <span> spacing </span>
        </template>
        <template #actions>
          <div>layout setting</div>
        </template>
      </base-content-card>
      <base-content-card :collapsed="true">
        <template #title>
          <span> Layout </span>
        </template>
        <template #actions>
          <div>layout setting</div>
        </template>
      </base-content-card>
    </div>
  </teleport>
</template>
<script>
import BaseContentCard from "../UI/BaseContentCard.vue";
export default {
  components: {
    BaseContentCard,
  },
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
      type: Number,
    },
    left: {
      type: Number,
    },
  },
  methods: {
    setSelected(id) {
      this.selected = id;
    },
  },
  computed: {
    settingStyle() {
      if (this.top || this.left) {
        return {
          top: this.top + "px",
          left: this.left + "px",
        };
      }
      return null;
    },
  },
};
</script>

<style scoped>
.advanced-setting {
  position: absolute;
  top: 0px;
  left: 0px;
  max-width: 390px;
  min-width: 350px;
  border-radius: 10px;
  background-color: rgb(213, 213, 213);
  padding: 10px;
}
.setting-wrapper {
  display: flex;
  padding: 5px;
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
