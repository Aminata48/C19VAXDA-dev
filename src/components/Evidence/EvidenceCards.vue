<template>
  <div class="container">

    <div v-if="!this.noVax">
      <div class="card is-full-desktop" v-for="(value, index) in this.labels.Header" :key=index>
        <header class="card-header">
          <p class="card-header-title">{{value.HeaderText}}</p>
          <a class="card-header-icon card-toggle">
            <i class="fas fa-chevron-down"></i>
          </a>
        </header>
        <div class="card-content is-hidden">
          <div class="content">
            <div style="display: flex; flex-direction: row; justify-content: center;">

              <div style="display: flex; flex-direction: column; justify-content: flex-start; height: auto; width: 49%; align-items: center">
                <div class="subtitle-landing-page"
                     :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
                  {{ c19vaxdaOne.VaxName }}
                </div>
                <IconArrayDesktop
                                  v-if="content1[index].IconArray"
                                  :ref="'desktop'"
                                  :chosenCharacterFromAvatarsView="loadCharacter" :avatarsNumber="content1[index].VaxVsVaxIcons"
                                  :matrixBase="10"
                />
<!--                <div>{{content1[index].VaxVsVaxPara}}</div>-->
                <span v-html="content1[index].VaxVsVaxPara"></span>
                <p v-on:click="showReferences($event)" class="references" id="references-card-4">{{labels.clickToOpen}}</p>
                <div class="references-card-4">
                  <p style="font-size: large; font-weight: bold">{{content1[index].MoreInfoText}}</p>
                </div>



              </div>
              <v-divider class="mx-6" vertical color="primary" style="display: inline;"></v-divider>
              <div style="display: flex; flex-direction: column; justify-content: flex-start; height: auto; width: 49%; align-items: center">
                <div
                    class="subtitle-landing-page"
                     :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
                  {{ c19vaxdaTwo.VaxName }}
                </div>
                <IconArrayDesktop
                                  v-if="content2[index].IconArray"
                                  :ref="'desktop'"
                                  :chosenCharacterFromAvatarsView="loadCharacter" :avatarsNumber="content2[index].VaxVsVaxIcons"
                                  :matrixBase="10"
                />
                <span v-html="content2[index].VaxVsVaxPara"></span>
                <p v-on:click="showReferences($event)" class="references" id="references-card">{{labels.clickToOpen}}</p>
                <div class="references-card">
                  <p style="font-size: large; font-weight: bold">{{content2[index].MoreInfoText}}</p>
                </div>

                <!--                <v-diviser class="mx-6" style="display: inline;" ></v-diviser>-->
<!--                <h1>testte</h1>-->
<!--                <h1>testte</h1>-->
<!--                <a href="https://covid-vaccine.canada.ca/info/summary-basis-decision-detailTwo.html?linkID=SBD00510" target="_blank">Health Canada's page showing all the scientific information about the vaccine</a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    <div class="card is-full-desktop">-->
<!--      <header class="card-header">-->
<!--        <p class="card-header-title">{{labels.Header.Header1}}</p>-->
<!--        <a class="card-header-icon card-toggle">-->
<!--          <i class="fas fa-chevron-down"></i>-->
<!--        </a>-->
<!--      </header>-->
<!--      <div class="card-content is-hidden">-->
<!--        <div class="content">-->
<!--          <h6 class="subtitle is-6 has-text-left">test</h6>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div v-else>
      <div class="card is-full-desktop" v-for="(value, index) in this.labels.Header" :key=index>
        <header class="card-header">
          <p class="card-header-title">{{value.HeaderText}}</p>
          <a class="card-header-icon card-toggle">
            <i class="fas fa-chevron-down"></i>
          </a>
        </header>
        <div class="card-content is-hidden">
          <div class="content">
            <div style="display: flex; flex-direction: row; justify-content: center;">

              <div style="display: flex; flex-direction: column; justify-content: flex-start; height: auto; width: 49%; align-items: center">
                <div class="subtitle-landing-page"
                     :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
                  {{ c19vaxdaOne.VaxName }}
                </div>
                <IconArrayDesktop
                    v-if="content1[index].IconArray"
                    :ref="'desktop'"
                    :chosenCharacterFromAvatarsView="loadCharacter" :avatarsNumber="content1[index].VaxVsVaxIcons"
                    :matrixBase="10"
                />
                <!--                <div>{{content1[index].VaxVsVaxPara}}</div>-->
                <span v-html="content1[index].TxPara"></span>

              </div>
              <v-divider class="mx-6" vertical color="primary" style="display: inline;"></v-divider>
              <div style="display: flex; flex-direction: column; justify-content: flex-start; height: auto; width: 49%; align-items: center">
                <div
                    class="subtitle-landing-page"
                    :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
                  {{ c19vaxdaTwo.ControlName }}
                </div>
                <IconArrayDesktop
                    v-if="content2[index].IconArray"
                    :ref="'desktop'"
                    :chosenCharacterFromAvatarsView="loadCharacter" :avatarsNumber="content2[index].VaxVsVaxIcons"
                    :matrixBase="10"
                />
                <span v-html="content2[index].ControlPara"></span>

                <!--                <v-diviser class="mx-6" style="display: inline;" ></v-diviser>-->
                <!--                <h1>testte</h1>-->
                <!--                <h1>testte</h1>-->
                <!--                <a href="https://covid-vaccine.canada.ca/info/summary-basis-decision-detailTwo.html?linkID=SBD00510" target="_blank">Health Canada's page showing all the scientific information about the vaccine</a>-->
              </div>
            </div>
            <p v-on:click="showReferences($event)" class="references" id="references-card-other">{{labels.clickToOpen}}</p>
            <div class="references-card-other">
              <p style="font-size: large; font-weight: bold">{{content2[index].MoreInfoText}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import defaultSettings from '../../assets/json/defaultSettings.json';

import IconArrayDesktop from "../../components/IconArray/IconArrayDesktop";
// import iconArraView from '../'
export default {
  name: "EvidenceCards",
  components: {
    IconArrayDesktop,
  },
  data() {
    return {
      defaultSettings : defaultSettings,
      noVax : true,
      useLocalStorageValue: false,
      characterLocalStorage: {},
      content1: this.labels.c19vaxda.Pfizer.content,
      content2: this.labels.c19vaxda.PfizerAdo.content,
      c19vaxdaOne: this.labels.c19vaxda.Pfizer,
      c19vaxdaTwo: this.labels.c19vaxda.PfizerAdo,
    }
  },
  computed:{
    loadCharacter(){
      return this.useLocalStorageValue?this.characterLocalStorage:this.chosenCharacterFromAvatarsView;
    }
  },
  props: {
    labels: Object,
    iconArrayProps: Object, //contains { targetList}
    chosenCharacterFromAvatarsView : Object,
  },
  methods: {
    /**
     * ---> This method active card toggle and header
     * @function {showReferences}
     * @param ref
     * @return none
     */
    showReferences(ref) {
      const references = document.getElementsByClassName(ref.target.id);
      for (let i = 0; i < references.length; i++) {
        if (references[i].style.display === "block")
          references[i].style.display = "none";
        else {
          references[i].style.display = "block";
        }
      }
    },
    /**
     * ---> This method active card toggle and header
     * @function {activeCardHeader}
     * @param none
     * @return none
     */
    activeCardHeader() {
      let cardToggles = document.getElementsByClassName('card-header');
      for (let i = 0; i < cardToggles.length; i++) {
        if (i % 2 === 0)
        {
          cardToggles[i].style.backgroundColor = this.defaultSettings.style.color.PrimaryTileColor;
        }
        else {
          cardToggles[i].style.backgroundColor = this.defaultSettings.style.color.PrimaryTileColor;
        }

        cardToggles[i].addEventListener('click', e => {
          e.currentTarget.lastChild.lastChild.classList.toggle('fa-chevron-up');
          e.currentTarget.parentElement.childNodes[1].classList.toggle("is-hidden");
          if (i % 2 === 0) {
            document.getElementsByClassName('card-header-title')[i].style.color = "rgba(0, 0, 0, 1)";
            document.getElementsByClassName('card-header-title')[i].style.backgroundColor = this.defaultSettings.style.color.secondaryTileColor;
            document.getElementsByClassName('card-header-icon')[i].style.backgroundColor = this.defaultSettings.style.color.secondaryTileColor;
          } else {
            document.getElementsByClassName('card-header-title')[i].style.color = "rgba(0, 0, 0, 1)";
            document.getElementsByClassName('card-header-title')[i].style.backgroundColor = this.defaultSettings.style.color.secondaryTileColor;
            document.getElementsByClassName('card-header-icon')[i].style.backgroundColor = this.defaultSettings.style.color.secondaryTileColor;
          }
        });
      }
    },

    /**
     * --->This method call another methods
     * @function {callMethod}
     * @param none
     * @return none
     */
    callMethod() {
      this.$refs["slider"].callChangeLanguageMethod();
    }
  },
  mounted() {
    this.activeCardHeader();
    document.addEventListener('DOMContentLoaded', function () {
    });

    if(typeof this.chosenCharacterFromAvatarsView !== 'object' ||
        this.chosenCharacterFromAvatarsView === null){
      this.characterLocalStorage = JSON.parse(localStorage.getItem("chosenCharacterFromAvatarsView"));
      this.useLocalStorageValue = true;
      // this.$forceUpdate();
    }

  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.references {
  cursor: pointer;
  color: #1C819A;
  font-weight: bold;
}

.references-card-1, .references-card-2, .references-card-3, .references-card-4, .references-card-5, .references-card-6, .references-card-7 {
  display: none;
}

.card {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.9);
}

.card-header-title {
  cursor: pointer;
}

div.container {
  padding: 0;
}

@media screen and (max-width: 812px) and (orientation: landscape) {
  .card-content {
    padding: 0 0 24px 0;
  }
}

sup {
  vertical-align: super;
  font-size: smaller;
  font-weight: bolder;
  /*font-family: Arial, Helvetica, sans-serif;*/
  font-family: Times New Roman, Times, serif;
}

li a {
  color: #3273dc;
  text-decoration: underline;
}

.notification a:not(.button):not(.dropdown-item) {
  color: #3273dc;
  word-wrap: break-word;
}

.card-header-icon {
  color: #321804;
  /*color: #422006;*/
}


.subtitle-landing-page {
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;
  line-height: 50px;
}

</style>
