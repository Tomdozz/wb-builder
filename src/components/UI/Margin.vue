<template>
  <div>
    <div class="padding-box">
      <div class="box">
        <span>Top</span>
        <div class="input-warpper">
          <input
            v-model="data.marginTop.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.marginTop.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Right</span>
        <div class="input-warpper">
          <input
            v-model="data.marginRight.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.marginRight.unit }}</span>
        </div>
      </div>
    </div>
    <div class="padding-box">
      <div class="box">
        <span>Bottom</span>
        <div class="input-warpper">
          <input
            v-model="data.marginBottom.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.marginBottom.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Left</span>
        <div class="input-warpper">
          <input
            v-model="data.marginLeft.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.marginLeft.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";
import {
  generateJSONFromCSS,
  updateDomStyle,
} from "../../assets/components/cssUtils";

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
  data() {
    return {
      data: {
        marginTop: {
          val: 1,
          unit: "px",
        },
        marginBottom: {
          val: 1,
          unit: "px",
        },
        marginLeft: {
          val: 1,
          unit: "px",
        },
        marginRight: {
          val: 1,
          unit: "px",
        },
      },
    };
  },
  watch: {
    currentelement() {
      this.data = generateJSONFromCSS(
        "dynamic-style-margin-" + this.currentelement,
        {
          marginTop: { val: 1, unit: "px" },
          marginBottom: { val: 1, unit: "px" },
          marginLeft: { val: 1, unit: "px" },
          marginRight: { val: 1, unit: "px" },
        }
      );
    },
  },
  methods: {
    update() {
      let cssString = `{
        margin-top:${this.data.marginTop.val}${this.data.marginTop.unit};
        margin-bottom:${this.data.marginBottom.val}${this.data.marginBottom.unit};
        margin-left:${this.data.marginLeft.val}${this.data.marginLeft.unit};
        margin-right:${this.data.marginRight.val}${this.data.marginRight.unit};
      }`;

      updateDomStyle(
        "dynamic-style-margin-" + this.currentelement,
        cssString,
        this.currentelement
      );
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