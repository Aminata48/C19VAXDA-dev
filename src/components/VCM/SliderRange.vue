<template>
  <div class="has-text-centered" v-on:click="drag()">
    <vue-slider class="vueSlider" ref="slider"
                v-model="value"
                v-bind="option"
                :contained="true"
                :duration="inDragging ? 0 : 0"
                @drag-start="() => inDragging = true"
                @drag-end="() => inDragging = false"
                @dragging="drag()"
    ></vue-slider>
    <span style="text-align: center">{{ reasonGraphLabel }}</span>

  </div>
</template>

<script>
import config from "../../assets/json/vcmConfig.json";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {VueSlider},
  name: "SliderRange",
  props: {
    option: Object,
    defaultValue: Number,
    reasonGraphLabel: String
  },
  data() {
    return {
      inDragging: false,
      value: 0,
    }
  },
  methods: {
    /**
     *  ---> This method is to set the slider's value
     * @function { setSlider}
     * @param value
     * @return none
     */
    setSlider(value) {
      this.$refs.slider.setValue(value);
    },

    /**
     *  ---> This method is to click and drags the slider's to the corresponding value
     *  ---> Changing the other slider' value when clicking or draging the actual slider
     * @function {drag}
     * @param none
     * @return none
     */
    drag() {
      let curIndex = this.$refs.slider.getIndex();
      let inverseValue = config.max - curIndex;
      let value = this.$refs.slider.getValue();
      this.$parent.setCurrentProgressValue(value, this.option.position, inverseValue);
      this.$parent.setResult();
      this.$parent.setBorderOption();
    },

    /**
     *  ---> This method gets the corresponding value of slider
     * @function {getSliderValue}
     * @param none
     * @return values
     */
    getSliderValue() {
      return this.$refs.slider.getValue();
    }

  },
  mounted() {
    this.value = this.option.defaultValue;
  }
}
</script>

<style scoped>
.vueSlider {
  padding: 0;
}

</style>
