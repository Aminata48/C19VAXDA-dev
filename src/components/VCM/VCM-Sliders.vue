<template>
  <div class="container">
    <!--Instructions -->
    <div id="descriptionTitle" class="column is-half-desktop is-full-mobile is-centered">
      <h1 id="title" class="subtitle is-size-10-mobile is-size-3-desktop">{{ this.labels.title }}</h1>
      <div style="float: left; display: flex;">
      </div>
      <button id="collapsible" class="button is-primary collapsible" v-on:click="activeInstruction">
        {{ this.labels.instruction[instructionToggle] }}
      </button>

      <p id="description" class="notification has-text-left">
        {{ this.labels.description }}
      </p>
    </div>
    <!--Sliders scales-->
    <div id="SliderGraphics" class="columns is-three-quarters-desktop is-multiline is-centered">
      <div class="column  is-fullwidth sliders is-center descriptionAlign">
        <div style="display: flex;justify-content: space-between;">
          <span id="scaleLeft" class="has-text-left">{{ this.labels.leftScaleLabel }}</span>
          <span id="scaleRight" class="has-text-right">{{ this.labels.rightScaleLabel }}</span>
        </div>

        <!--Sliders-->
        <div v-for="(slider, index) in numberOfSlider" ref="its" :key="slider">
          <SliderRange :reason-graph-label="getReasonGraphLabel(index)" class="space_between_slider" v-bind:ref="slider"
                       :option="options[index]"></SliderRange>
        </div>
      </div>
      <!--Graphics-->
      <div class="column  is-fullwidth slider is-centered has-text-centered">
        <div style="display: flex;justify-content: space-evenly">
          <div v-for="(progress, index) in numberOfSlider" :ref="'graph-' + index" :id="'graph-' + index"
               class="space_between_progress" :key="progress + 'progress'">
            <VerticalProgressBar id="optionLabel" :text-bold="getTextBold(index)" :border-text="getBorderText(index)"
                                 :option-graph-label="labels.optionGraphLabel[index]" v-bind:ref="progress"
                                 :value="getProgressValue(index)"
                                 :parameters="getParameters(index)"></VerticalProgressBar>
          </div>
        </div>
        <div class="results" id="result">
          <p id="options " class="options has-text-centered"><b>{{ this.message }}</b>{{ this.labels.result }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import SliderRange from './SliderRange.vue';
import config from "../../assets/json/vcmConfig.json";
import VerticalProgressBar from "./VerticalProgressBar";


export default {
  name: 'VCM-Sliders',
  components: {VerticalProgressBar, SliderRange},
  data() {
    return {
      isLanguageChanged: false,
      currentLanguage: "",
      progressValues: [],
      numberOfSlider: 0,
      instructionToggle: 0,
      message: "yes",
      message2: "yes",
      options: [],
      parameter: [],
      borderText: [],
      textBold: [],
    };
  },
  props: {
    labels: Object
  },
  methods: {
    /**
     * ---> This method call another method
     * @function {callChangeLanguageMethod}
     * @param none
     * @return none
     */
    callChangeLanguageMethod() {
      this.changeLanguage();
    },

    /**
     * This method to set the background color of slider accordingly to their slider color
     *@function {setBackgroundColor}
     * @param none
     * @return none
     */
    setBackgroundColor() {
      for (let i = 0; i < this.numberOfSlider; i++) {
        this.$refs["its"][i].style.backgroundColor = config.backgroundDivColor[i];
      }
    },

    /**
     * ---> This method set-on slider' range depending on parameters on json file
     * @function {setOptions}
     * @param none
     * @return none
     */
    setOptions() {
      for (let i = 0; i < this.numberOfSlider; i++) {
        let option = {
          inDragging: false,
          height: config.lineHeight,
          processStyle: {
            backgroundColor: config.processSliderColor[i],
          },
          dotSize: config.dotSize,
          min: config.min,
          max: config.max,
          interval: config.interval,
          tooltip: 'none',
          defaultValue: config.value,
          position: i,
        };
        this.options.push(option);
        this.progressValues.push(option.defaultValue);
      }
    },

    /**
     * ---> This method change the description to a button instruction on small screen
     * @function {activeInstruction}
     * @param el
     *@return none
     */
    activeInstruction(el) {
      let coll = document.getElementById("collapsible");
      let content = el.target.nextElementSibling;

      if (content.style.display === "block") {
        this.instructionToggle = 0;
        content.style.display = "none";
      } else {
        this.instructionToggle = 1;
        content.style.display = "block";
        coll.style.animation = "";
      }
    },

    /**
     * ---> This method set on progress (graphics)  depending on parameters on json file
     * @function {setOptions}
     * @param none
     * @return none
     */
    setProgressParams() {
      for (let i = 0; i < this.numberOfSlider; i++) {
        let option = {
          text: {
            hideText: true
          },
          progress: {
            color: config.processSliderColor[i],
            backgroundColor: config.progressColor,
          },
          layout: {
            height: 70,
            width: 220,
            verticalTextAlign: 61,
            horizontalTextAlign: 43,
            zeroOffset: 0,
            strokeWidth: 100,
            progressPadding: 0,
            type: 'line',
          }
        };
        this.parameter.push(option);
        this.progressValues.push(option.defaultValue);
      }
    },

    /**
     * ---> This method is for setting results according to the slider actual value
     * ---> Also, set some css style of the output result option
     * @function {setResult}
     * @param none
     * @return none
     */
    setResult() {
      let divElement = document.getElementById("result");
      for (let i = 0; i < this.numberOfSlider; i++) {
        let value = this.$refs[i + 1][0].getSliderValue();
        if (value > 50) {
          if (divElement.style.visibility !== "hide")
            divElement.style.visibility = "visible";
          divElement.style.color = config.processSliderColor[i];
          divElement.style.border = "2px solid" + config.processSliderColor[i];
          divElement.style.marginTop = "1vh";

          this.message = this.labels.optionGraphLabel[i];

        } else if (value === 50) {
          divElement.style.visibility = 'hidden';
        }
      }
    },

    /**
     * ---> This method  set the text to bold when the slider default value change
     * @function {setBorderOption}
     * @param none
     * @return none
     */
    setBorderOption() {
      for (let i = 0; i < this.numberOfSlider; i++) {
        let value = this.$refs[i + 1][0].getSliderValue();
        if (value > 50) {
          this.textBold[i] = "bolder";
          // this.borderText[i] = '2px solid ' + this.getParameters(i).progress.color;

        } else {
          this.textBold[i] = "";
          // this.borderText[i] = "";
        }
      }
    },

    /**
     * ---> This method set the current progress value of slider accordingly to it's actual value
     * @param value
     * @param position
     * @param inverseValue
     * @function {setCurrentProgressValue}
     * @return none
     */
    setCurrentProgressValue(value, position, inverseValue) {
      for (let i = 0; i < this.numberOfSlider; i++) {
        if (i === position) {
          this.progressValues[i] = value;
        } else {
          this.$refs[i + 1][0].setSlider(inverseValue);
          this.progressValues[i] = inverseValue;
        }
      }
      this.$forceUpdate();
    },

    /**
     * ---> This methods get the progress current value
     * @function {getProgressValue}
     * @param index
     * @returns {*}
     */
    getProgressValue(index) {
      return this.progressValues[index];
    },

    /**
     * ---> This methods get the border text data
     * @function {getBorderText}
     * @param index
     * @returns {*}
     */
    getBorderText(index) {
      return this.borderText[index];
    },

    /**
     * This methods get the text index
     * @function {getTextBold}
     * @param index
     * @returns {*}
     */
    getTextBold(index) {
      return this.textBold[index];
    },

    /**
     * ---> This methods get reason graph label index
     * @function {getReasonGraphLabel}
     * @param index
     * @returns {*}
     */
    getReasonGraphLabel(index) {
      return this.labels.reasonGraphLabel[index];
    },

    /**
     * ---> This methods get parameter of progress
     * @function {getParameters}
     * @param index
     * @returns {*}
     */
    getParameters(index) {
      return this.parameter[index];
    },

  },
  mounted() {
    this.numberOfSlider = config.numberOfSlider;

    this.setOptions();
    this.setProgressParams();
    let coll = document.getElementById("collapsible");
    coll.style.animation = "collapsible 2s linear infinite";
    document.addEventListener('DOMContentLoaded', () => {
      this.setBackgroundColor();
    });

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/mediaQuery";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  padding: 10px;

}

@keyframes collapsible {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}

.space_between_slider {
  margin-bottom: 10px;
}

.space_between_progress {
  display: flex;
  justify-content: center;
  width: 30%;
}

#result {
  visibility: hidden;
}

h1#title {
  font-size: 1.4em;
  margin: 0 0 12px;
  color: #1C819A;
}

#scaleLeft {
  float: left;
  margin-left: 5px;
  text-align: left;
}

#scaleRight {
  float: right;
  margin-right: 5px;
  text-align: right;
}

.collapsible {
  width: auto;
  margin: 0 0 10px 10px;
  font-weight: bold;
  /*font-size: medium;*/
}

#description {
  display: none;
  overflow: hidden;
  line-height: 1.5;
  padding: 0;
  width: 100%;
  background-color: #FFFFFF00;
}

p#options {
  padding: 2px;
}

/*for larger and medium devices (desktop)*/
@media screen and (min-width: $breakpoint-desktop) {
  button#collapsible {
    display: none;

  }
  #description {
    display: block !important;
  }

}

/*ajuste css media queries for phone and tablets*/
@media screen and (min-width: $breakpoint-phone) and (max-width: $breakpoint-tablet) {

  button#selectLanguageVcm {
    margin: 0;
    padding: 2px;

  }
  button#collapsible {
    padding: 2px;
  }
  div#descriptionTitle {
    padding: 0;
  }
  #description {
    border: 2px solid #DDDDDD;
    background-color: #FFFFFF;
    position: absolute;
    z-index: 999;
    padding: 12px;
  }
  .column {
    width: 100%;
    line-height: 1;
    padding: 8px 0 12px 0;
  }
  h1#title {
    white-space: pre;
  }

}

/* orientation: landscape*/
@media screen and (max-width: $breakpoint-tablet) and (orientation: landscape) {
  #description {
    border: 2px solid #DDDDDD;
    position: absolute;
    z-index: 999;
    padding: 12px;
  }

  .slider {
    width: 10%;
  }

  .columns {
    display: flex;

  }

  #result {
    position: relative;
    top: 1vw;
  }

  h1#title {
    font-size: 1.4em;
    margin: 0 0 8px;
  }

  #descriptionTitle {
    padding: 0;
  }

  #SliderGraphics .slider {
    padding: 0 0 0 12px;
  }

  .space_between_slider {
    margin-bottom: 3px;
  }
}
</style>
