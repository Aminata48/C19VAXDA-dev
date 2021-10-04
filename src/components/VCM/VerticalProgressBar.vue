<template>
  <div>
    <div>
      <progress-bar class="progressBar resize-vertical-bar-mobile" :options="parameters" :value="value"/>
    </div>
    <div id="space_between_div" class="resize-option-label"><p
        v-bind:style="{color: textColor, border: borderText, padding: paddingText, fontWeight: textBold}">
      {{ optionGraphLabel }}</p></div>
  </div>
</template>

<script>

export default {
  name: "VerticalProgressBar",
  data() {
    return {
      textColor: String,
      paddingText: String

    }
  },
  props: {
    value: Number,
    parameters: Object,
    optionGraphLabel: String,
    borderText: String,
    textBold: String
  },
  methods: {},
  created() {
  },
  mounted() {
    this.textColor = this.parameters.progress.color;
    this.paddingText = "3px";
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/mediaQuery";

.progressBar {
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
  -webkit-transform-origin: center;
  -moz-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
}

.progressBar:after {
  content: "";
}

.resize-option-label {
  text-align: center;
  padding-top: 12vh;

}

.resize-vertical-bar-mobile {
  margin-top: 8vh;
}

div#space_between_div {
  margin: auto;
  width: 80%;
}

@media screen and (min-width: $breakpoint-phone) and (max-width: $breakpoint-tablet) {
  .resize-vertical-bar-mobile {
    margin-top: 10vh;
  }

  .resize-option-label {
    text-align: center;
    padding-top: 14vh;
  }
  div#space_between_div {
    text-align: center;
    margin: auto;
    width: 45%;
  }
}

@media screen and (max-width: $breakpoint-tablet) and (orientation: landscape) {
  .resize-vertical-bar-mobile {
    margin-top: 10vh;
  }

  .resize-option-label {
    /*text-align: center;*/
    padding-top: 24vh;
  }
}
</style>
