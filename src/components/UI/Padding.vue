<template>
  <div>
    <div class="padding-box">
      <div class="box">
        <span>Top</span>
        <div class="input-warpper">
          <input v-model="data.top" type="text" class="text" @change="update" />
          <span> {{ data.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Right</span>
        <div class="input-warpper">
          <input
            v-model="data.right"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.unit }}</span>
        </div>
      </div>
    </div>
    <div class="padding-box">
      <div class="box">
        <span>Bottom</span>
        <div class="input-warpper">
          <input
            v-model="data.bottom"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Left</span>
        <div class="input-warpper">
          <input
            v-model="data.left"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        unit: "px",
      },
    };
  },
  methods: {
    update() {
      console.log("update");
    },
  },
};
</script>

<style scoped lang="scss">
.padding-box {
  display: flex;
  flex-wrap: wrap;
  min-height: 100%;
  justify-content: center;

  .box {
    flex-basis: calc(50% - 40px);
    display: flex;
    flex-direction: column;

    .input-warpper {
      margin: 5px;
      max-width: 55px;
      width: 55px;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        background-color: chartreuse;
        border: 1px solid chartreuse;
      }

      &:hover .text {
        background-color: chartreuse;
      }

      &:focus-within {
        background-color: chartreuse;
        border: 1px solid chartreuse;
      }
      &:focus-within .text {
        background-color: chartreuse;
      }
      span {
        font-size: 12px;
      }

      .text {
        margin-bottom: 0;
        height: 24px;
        font-size: 12px;
        border: 0;
        box-shadow: inset 0 0 0;

        &.focus ~ .unit {
          display: none;
        }
      }
    }
  }
}
</style>