<template >
  <v-app style="display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;">

    <v-container
        style="display: flex;
        flex-direction: column;
        justify-content: center;">

      <div id="container-landing-page-text"
           style="display: flex;
           flex-direction: column;
           justify-content: space-between;
           align-items: flex-start;
           margin-bottom: 15%">

        <div id="title-landing-page"
             :style="{fontFamily : defaultSettings.style.fontFamily.fontFamilyHeader, fontSize: defaultSettings.style.fontSize.fontSizeHeader, fontWeight: defaultSettings.style.fontWeight.fontWeightHeader}">
          {{this.labels.instructionTitle}}
        </div>

        <div id="subtitle-landing-page"
             :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
          {{this.labels.instructionParagraph}}
        </div>

        <div class="interactions-landing-page"
             style=" display: flex;
             align-self: flex-end;
             margin-top: 60px">

          <v-btn text
                 color="black"
              x-large
              @click="goToSocioDemoView">
            {{ this.labels.instructionBtn }}
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import defaultSettings from '../assets/json/defaultSettings.json';
export default {
  name: "Instructions",
  data() {
    return {
      defaultSettings : defaultSettings
    }
  },
  props: {
    labels: Object
  },
  methods: {
    goToSocioDemoView(){
      this.$router.push('/Sociodemo');
      this.$emit('changeRouteName', "Sociodemo");
    }
  },
  computed: {},
  mounted() {
    let elHtml = document.getElementsByTagName('html')[0];
    elHtml.style.overflowY = 'hidden';
    this.$emit('changeRouteName', "Instructions");

  },
  destroyed() {
    let elHtml = document.getElementsByTagName('html')[0];
    elHtml.style.overflowY = null;
  }
}
</script>

<style scoped>

.title-landing-page {
  width: 1000px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  color: #000000;
  text-align: justify;
}

span{
  color: #FFFFFF;
}
#title-landing-page{
  line-height: 60px;
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 50px;

}
#subtitle-landing-page{
  line-height: 60px;
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 50px;
}
.subtitle-landing-page {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 60px;
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 50px;
}

button.continue {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  text-align: center;
  color: #FFFFFF;
  width: 289px;
  height: 61px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 17px;
}

/*button.continue:hover{*/
/*  background-color:  #008363;*/
/*  transform: scale(1.04);*/
/*}*/

button.continue:active {
  top: 4px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
}

button.continue:focus {outline:0;}



</style>
