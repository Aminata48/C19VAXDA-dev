<template>
  <v-container style="display: flex;
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
        {{ this.labels.socioDemoTitle }}
      </div>
      <div id="subtitle-landing-page"
           :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
        {{ this.labels.socioDemoParagraph1 }}
      </div>

      <ul>
        <li id="paragraph-list" style="text-align: justify; font-size: large"
            v-for="item in labels.socioDemoParagraphList" :key="item.text"
            :style="{fontFamily: defaultSettings.style.fontFamily.fonFamilyText, fontSize:defaultSettings.style.fontSize.fontSizeText}">
          {{ item.text }}
        </li>
      </ul>


      <v-col
          style="margin-top: 2.5vh"
          class="d-flex"
      >
        <v-select
            class="provinces-style"
            :color=this.defaultSettings.style.color.primaryColors
            item-color="teal"
            :items="this.labels.c19vaxdaProvinces"
            :label="this.labels.socioDemoParagraph2"
            dense
            outlined
            :success="this.successSelect"
            rounded
            @click="changeBorderColorOfSelectProvince"
        ></v-select>
      </v-col>


      <p id="paragraph-text"
         :style="{fontFamily: defaultSettings.style.fontFamily.fonFamilyText, fontSize:defaultSettings.style.fontSize.fontSizeText}">
        {{ this.labels.socioDemoParagraph3 }}

        <v-text-field
            id="number-case"
            :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox}"
            style="margin-left: 10px; width: 140px"
            height="auto"
            type="number"
            :color=this.defaultSettings.style.color.primaryColors
            :label="this.labels.textFieldLabel"
            :placeholder="this.labels.textFieldPlaceholder"
            solo
            outlined
            flat
            rounded
            min="0"
            max="150"
            oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
            :success="this.successTextField"
            @change="changeBorderColorOfTextFieldAge"
        ></v-text-field>
      </p>

      <p
         :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize:defaultSettings.style.fontSize.fontSizeSubtitle}">
        {{ this.labels.socioDemoParagraph4 }}
        <b id="semi-bold"
           :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
          {{ this.labels.socioDemoParagraph4Bold }}</b>
      </p>


      <ul>
        <div
            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap; align-content: space-between;">
          <v-checkbox
              :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox}"
              color="#008363"
              style="width: 200px"
              v-for="(item, index) in labels.socioDemoEligibility"
              :key="index"
              :id="`${index}`"
              :label=item.eligibility
              @click="myFunction(index)"
              hide-details
          ></v-checkbox>
        </div>
      </ul>

      <ul
          :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox}">
        <li id="0_text" style="text-align: justify; font-size: large; display: none">
          {{ this.labels.socioDemoEligibility[0].eligibilitytext }}
        </li>
        <li id="1_text" style="text-align: justify; font-size: large; display: none">
          {{ this.labels.socioDemoEligibility[1].eligibilitytext }}
        </li>
        <li id="2_text" style="text-align: justify; font-size: large; display: none">
          {{ this.labels.socioDemoEligibility[2].eligibilitytext }}
        </li>
        <li id="3_text" style="text-align: justify; font-size: large; display: none">
          {{ this.labels.socioDemoEligibility[3].eligibilitytext }}
        </li>
        <li id="4_text" style="text-align: justify; font-size: large; display: none">
          {{ this.labels.socioDemoEligibility[4].eligibilitytext }}
        </li>
      </ul>


      <p id="socioDemoHeader"
         :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize:defaultSettings.style.fontSize.fontSizeSubtitle, fontWeight:defaultSettings.style.fontWeight.fontWeightHeader}"
      >
        {{ this.labels.socioDemoHeader }}
      </p>

      <UL>
        <p id="header-paragraph"
            :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize:defaultSettings.style.fontSize.fontSizeSubtitle}">
          {{ this.labels.socioDemoParagraph5 }}
        </p>

        <p id="below-header"
           :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize:defaultSettings.style.fontSize.fontSizeSubtitle}">
          {{ this.labels.socioDemoParagraph6 }}
          <b
              :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox, fontWeight:defaultSettings.style.fontWeight.fontWeightSubtitle}">
            {{ this.labels.socioDemoParagraph6_1 }}</b>
        </p>
      </UL>

      <ul>
        <div
            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap; align-content: space-between">
          <v-checkbox
              :style="{fontFamily:defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox}"
              style="width: 450px"
              v-for="(item, index) in labels.socioDemoOptions"
              :key="index"
              :id="`checkboxOption${index}`"
              :label=item.optionname
              color="#008363"
              hide-details
              @change="chekboxStateChange(index, item.optionid)"
              v-model="checkboxList[index].checkboxState"
          ></v-checkbox>
        </div>
      </ul>


      <ul>
        <p id="subtitle-landing"
           :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultSettings.style.fontSize.fontSizeSubtitle}">

          {{ this.labels.socioDemoParagraph7 }}
        </p>
      </ul>
      <div v-html="comboText"
           :style="{fontFamily: defaultSettings.style.fontFamily.fontFamilyBox, fontSize:defaultSettings.style.fontSize.fontSizeBox}">
        ></div>

      <div class="interactions-landing-page" style=" display: flex; align-self: flex-end; margin-top: 20px">
        <v-btn x-large
               rounded
               class="continue"
               color="#008363"
               @click="goToAvatarsView"
        >{{ this.labels.btn.next }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import defaultSettings from '../assets/json/defaultSettings.json';

export default {


  name: "SocioDemoView",
  data() {
    return {
      optionId: ["Pfizer", "PfizerAdo"],
      defaultSettings: defaultSettings,
      comboText: "",
      dialog: false,
      successSelect: false,
      successTextField: false,
      maxBoxesToBeChecked: 2,
      numberOfBoxesChecked: 0,
      province: "",
      checkboxList: [
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        },
        {
          checkboxState: false
        }]
    }
  },
  props: {
    labels: Object
  },
  computed: {},
  methods: {

    myFunction(id) {

      console.log("la fonction est appelée avec le id :", id)
      var checkBox = document.getElementById(id);
      console.log("la valeur du checkBox  :", checkBox)

      console.log("la valeur entrée dans le texte est :", id + "_text")

      var text = document.getElementById(id + "_text");
      console.log("la valeur du texte :", text)

      console.log("la valeur du checkBox chequé :", checkBox.checked)
      if (checkBox.checked === false) {
        console.log("je suis rentré dans la condition")
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    },


    comboTextChange() {
      let vaccine = []

      for (let i = 0; i < this.checkboxList.length; i++) {
        if (this.checkboxList[i].checkboxState === true) {
          vaccine.push(i);
        }
      }
      if (vaccine[0] === 0 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[0].combotext
      } else if (vaccine[0] === 0 && vaccine[1] === 5) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[1].combotext
      } else if (vaccine[0] === 0 && vaccine[1] === 2) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[2].combotext
      } else if (vaccine[0] === 0 && vaccine[1] === 3) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[3].combotext
      }

      /*
      else if(vaccine[0] === 0 && vaccine[1] === 5)
      {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[4].combotext
      }*/

      else if (vaccine[0] === 2 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[5].combotext
      } else if (vaccine[0] === 2 && vaccine[1] === 3) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[6].combotext
      } else if (vaccine[0] === 2 && vaccine[1] === 5) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[7].combotext
      } else if (vaccine[0] === 3 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[8].combotext
      } else if (vaccine[0] === 3 && vaccine[1] === 5) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[9].combotext
      } else if (vaccine[0] === 4 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[10].combotext
      } else if (vaccine[0] === 4 && vaccine[1] === 6) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[11].combotext
      } else if (vaccine[0] === 5 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[12].combotext
      } else if (vaccine[0] === 6 && vaccine[1] === 7) {
        this.comboText = this.labels.c19vaxdaComboSliderLabelsEn[13].combotext
      } else {
        this.comboText = ""
      }


      //console.log("la liste est", this.optionId);
      //console.log("la lioste", vaccine);

    },
    chekboxStateChange(number, item) {

      console.log("item", item);
      this.numberOfBoxesChecked = 0;
      this.checkboxList.forEach(state => {
        if (state.checkboxState === true) {
          this.numberOfBoxesChecked++;
        }
      });

      if (this.numberOfBoxesChecked > this.maxBoxesToBeChecked) {
        this.numberOfBoxesChecked = 0;
        this.checkboxList.forEach(state => state.checkboxState = false);
        this.checkboxList[number].checkboxState = true
      }
      this.comboTextChange();
    },
    changeBorderColorOfTextFieldAge() {
      this.successTextField = true;
    },
    changeBorderColorOfSelectProvince() {
      this.successSelect = true;
    },
    goToAvatarsView() {
      this.$router.push('/Avatars');
      this.$emit('changeRouteName', "Avatars");
    },
    displayProvince(province) {
      this.province = province;
    }
  },
  created() {
    this.province = this.labels.btn.clickHere;
  },
  mounted() {
    this.$emit('changeRouteName', "Sociodemo");
  }
}
</script>

<style scoped>

#subtitle-landing{
  font-style: normal;
  line-height: 54px;
  color: #000000;
  text-align: justify;
}
#below-header {
  font-style: normal;
  line-height: 54px;
  color: #000000;
  text-align: justify;
}

span {
  color: #FFFFFF;
}

#number-case {
  font-size: 16pt;
  font-family: light;
  margin-left: 10px;
  width: 140px
}

.subtitle-landing-page {
  font-family: medium;
  font-style: normal;
  font-weight: normal;
  font-size: 24pt;
  line-height: 60px;
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;

}

button.continue {
  background-color: #05CDC1;
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

button.continue:hover {
  background-color: #05CDC1;
  transform: scale(1.04);
}

button.continue:active {
  top: 4px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
}

#paragraph-text {
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;
  line-height: 50px;

}

#subtitle-landing-page {
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;
  line-height: 50px;
}

li {
  font-size: 14px;
  margin-left: 10px;
  list-style-type: circle;
}

#socioDemoHeader {

  line-height: 60px;
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;
}

.paragraph-list {
  font-family: Regular;
  font-size: 17pt;
}

#header-paragraph {
  color: #000000;
  display: flex;
  text-align: justify;
  margin-top: 20px;
  line-height: 50px;

}

button.continue:focus {
  outline: 0;
}

</style>
