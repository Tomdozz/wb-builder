<template>
  <div>
    <div class="padding-box">
      <div class="box">
        <span>Top</span>
        <div class="input-warpper">
          <input
            v-model="data.paddingTop.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.paddingTop.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Right</span>
        <div class="input-warpper">
          <input
            v-model="data.paddingRight.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.paddingRight.unit }}</span>
        </div>
      </div>
    </div>
    <div class="padding-box">
      <div class="box">
        <span>Bottom</span>
        <div class="input-warpper">
          <input
            v-model="data.paddingBottom.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.paddingBottom.unit }}</span>
        </div>
      </div>
      <div class="box">
        <span>Left</span>
        <div class="input-warpper">
          <input
            v-model="data.paddingLeft.val"
            type="text"
            class="text"
            @change="update"
          />
          <span> {{ data.paddingLeft.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      data: {
        paddingTop: {
          val: 1,
          unit: "px",
        },
        paddingBottom: {
          val: 1,
          unit: "px",
        },
        paddingLeft: {
          val: 1,
          unit: "px",
        },
        paddingRight: {
          val: 1,
          unit: "px",
        },
        //unit: "px",
      },
    };
  },
  watch: {
    currentelement() {
      this.data = this.generateJSONFromCSS();
    },
  },
  methods: {
    generateJSONFromCSS() {
      // Get the style tag
      var styleTag = document.getElementById(
        "dynamic-style-padding-" + this.currentelement
      );
      if (styleTag) {
        // Get the CSS text
        var cssText = styleTag.innerHTML;
        // Split the CSS text into separate lines
        var cssLines = cssText.split("\n");
        var cssJSON = {};
        // Loop through each line of CSS(skip first and last)
        for (var i = 1; i < cssLines.length - 1; i++) {
          // Get the current line of CSS
          var cssLine = cssLines[i];
          cssLine = cssLine.replace(/ /g, "");
          // Split the line into separate parts
          var cssParts = cssLine.split(":");
          var propertiesObject = {};
          var valueParts = cssParts[1].replaceAll(";", "").split(/(\d+)/);
          console.log(valueParts);
          propertiesObject.val = valueParts[1];
          propertiesObject.unit = valueParts[2];
          cssJSON[this.camelize(cssParts[0].trim())] = propertiesObject;
        }
        return cssJSON;
      }
      return {
        paddingTop: {
          val: 1,
          unit: "px",
        },
        paddingBottom: {
          val: 1,
          unit: "px",
        },
        paddingLeft: {
          val: 1,
          unit: "px",
        },
        paddingRight: {
          val: 1,
          unit: "px",
        },
      };
    },
    camelize(s) {
      return s.replace(/-./g, (x) => x[1].toUpperCase());
    },
    kebabize(str) {
      console.log(str);
      return str
        .split("")
        .map((letter, idx) => {
          return letter.toUpperCase() === letter
            ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
            : letter;
        })
        .join("");
    },
    update(e) {
      this.$emit("update", e.target.value);
      let styleEl = document.getElementById(
        "dynamic-style-padding-" + this.currentelement
      );
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.type = "text/css";
        styleEl.id = "dynamic-style-padding-" + this.currentelement;
        document.head.appendChild(styleEl);
      }
      let cssString = `{
        padding-top:${this.data.paddingTop.val}${this.data.paddingTop.unit};
        padding-bottom:${this.data.paddingBottom.val}${this.data.paddingBottom.unit};
        padding-left:${this.data.paddingLeft.val}${this.data.paddingLeft.unit};
        padding-right:${this.data.paddingRight.val}${this.data.paddingRight.unit};
      }`;
      //set attribute just to have it for later just to specify further
      //something like .editor > [id]{}
      document
        .getElementById(this.currentelement)
        .setAttribute(this.currentelement, "");
      styleEl.innerHTML = `#${this.currentelement} ${cssString}`;
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