<template>
  <div id="main_container">
    <v-container id="myContainer"
                 style="width: 100%; height: 100%; display: flex; flex-direction: row; justify-content: start; align-items: start;">
      <div class="container" style="width: 100%; height: 100%;">
        <!-- MODAL WINDOW -->
        <Modal ref="modal"
               :saveCharacterInfo="saveCharacter"
               :total-created="totalCreated"
               :is-group-complete="isGroupComplete"
               :max-characters-in-group="maxCharactersInGroup"
               :defaultCharacterColors="defaultCharacterColors"
               :skin-colors="skinColors" :hair-colors="hairColors" :total-characters-count="maxCharactersInGroup"
               :facial-hair-list-json="facialHairList" :max-color-tile="maxColorTile" :labels="labels"/>

        <div class="is-centered is-half-desktop is-half-mobile">
          <div class="instructions-block">
            <h1 v-if="!replaceCharacterMode" class="page-instruction">
              {{ this.labels.stepsMakingAvatar[step].title }}</h1>
            <h1 v-if="replaceCharacterMode" class="page-instruction">{{ this.labels.selectAvatar }}</h1>
            <p v-if="!isGroupComplete & !replaceCharacterMode" id="contextualInfo" style="font-size: medium">
              {{ this.labels.stepsMakingAvatar[step].description }}</p>

            <!--          Mobile version of the continue button-->
            <v-btn :disabled="replaceCharacterMode" color="#05CDC1" class="continue" v-if="isGroupComplete && !isMobile"
                   v-on:click="loadIconArray()">
              <span>{{ this.labels.continueBtn.toUpperCase() }}</span>
              <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
            </v-btn>
          </div>

          <!-- List of all the characters -->
          <div class="tool">
            <div style="width: 100%; margin: 5px;">
              <div style="width: 100%">
                <CharacterList :defaultCharacterColors="defaultCharacterColors" ref="listAvailable"
                               :characters="this.characterList" :launch="launch"></CharacterList>
              </div>
            </div>
          </div>

          <div v-if="debugMode">
            <v-btn v-on:click="regenerateCharacters('all')">{{ this.labels.differentCharacters }}</v-btn>
            <v-btn v-on:click="regenerateCharacters()">{{ this.labels.sameCharacters }}</v-btn>
          </div>

          <!--          Mobile version of the continue button-->
          <v-btn :disabled="replaceCharacterMode" color="#05CDC1" class="continue" v-if="isGroupComplete && isMobile"
                 v-on:click="loadIconArray()">

            <span>{{ this.labels.continueBtn.toUpperCase() }}</span>
            <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
          </v-btn>

        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import CharacterList from "../components/Avatars/CharacterList";
import Modal from "../components/Avatars/Modal";

import charactersJson from "../assets/json/characters.json";
import facialHairJson from "../assets/json/facialHair.json";

export default {
  name: "AvatarsView",
  components: {
    Modal,
    CharacterList,
  },
  data() {
    return {
      isLanguageChanged: true,
      isGroupComplete: false,
      characterList: [],
      isCharactersListLoaded: false,
      contextualInfo: "",
      finalInfo: "",
      totalCreated: 0,
      maxCharactersInGroup: 0,
      maxColorTile: 0,
      facialHairList: [],
      texts: '',
      skinColors: [],
      hairColors: [],
      defaultCharacterColors: {},
      languageButtonIndex: 20,
      nbAvatar: 0,
      nbrVulnerable: 0,
      nbrCommunity: 0,
      characterTypeToGenerate: false,
      debugMode: false,
      step: 0,
      replaceCharacterMode: false,
      isMobile: false,
      chosenCharacter : {},
      iconArrayProps: {},
      targetList: [],
      maxTargetNumber: 12,
    };
  },
  props: {
    labels: Object,
    characterTime: Number,
  },

  methods: {
    /**
     * ---> ---------  completed soon -------
     * @return none
     * @param characterType
     */
    generateAllCharacters(characterType) {
      let character;

      if (characterType !== "all") {
        character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
      }
      for (let i = this.totalCreated; i < this.maxCharactersInGroup; i++) {
        setTimeout(() => {
          if (characterType === "all") {
            character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
          }
          let shirt = "#BFBABE";
          let shirtShadow = "#999598";
          let accessoriesColor = this.defaultCharacterColors.AccessoriesColor;
          if (i === 0) {
            shirt = "#F67844";
            shirtShadow = "#c56036";
            accessoriesColor = shirt;
          }
          let svgColor = {
            beards: "",
            face: "#E7B38D",
            faceShadow: "#b98f71",
            glasses: "",
            hairBack: "#553e35",
            hairFront: "#6A4E42",
            idCharacter: "",
            options: ['', '', ''],
            shirt,
            shirtShadow,
            name,
            accessoriesColor
          };
          this.saveCharacter(character, svgColor);
        }, 100);
      }
    },

    regenerateCharacters(characterType) {
      if (this.isGroupComplete) {
        this.totalCreated = 0;
        this.step = 0;
      }
      this.generateAllCharacters(characterType);
    },

    /**
     * ---> ---------  completed soon -------
     * @param {string} action
     * @return none
     */
    changeLanguageButtonIndex(action) {
      if (action === "open")
        this.languageButtonIndex = 40;
      else if (action === "close")
        this.languageButtonIndex = 20;
    },

    /**
     * ---> Launch modal with the given character object
     * @param {Object} character
     * @return none
     */
    launch(character) {
      this.$refs.modal.openModal(this.totalCreated, character, this.totalCreated, false, this.labels.createAvatar);
    },

    /**
     * ---> Launch edit modal with the given character object (might need refactoring)
     * @param {Object} character
     * @param {Number} index
     * @return none
     */
    launchEditModal(character, index) {
      this.$refs.modal.openModal(index, character, this.totalCreated, true, this.labels.editAvatar);
    },

    /**
     * ---> Update Home information and add the character to the groupList
     * @param {Object} character
     * @param {Object} colors
     * @return none
     */
    saveCharacter(character, colors) {
      this.totalCreated++;
      this.manageCharacterCount();
      let id = character.id + Date.now() + "_customised";
      this.chosenCharacter = {
        id,
        file: character.file,
        colors: colors,
        characterType: this.getCurrentCharacterType(this.totalCreated)
      }
      this.isMobile = this.isScreenMobile();

      if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
          window.scrollTo({top: 0, behavior: 'smooth', x: 0})
        }, parseInt(charactersJson.scrollingTimeControl));
      } else if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
        setTimeout(() => {
          window.scrollTo({top: -100, behavior: 'smooth', x: 0})
        }, 100);
      }
      this.loadIconArray();
    },

    /**
     * ---> Return current Character type based on the position in the groupList
     * @param {Number} position
     * @return {String} character Type
     */
    getCurrentCharacterType(position) {
      if (position <= charactersJson.nbAvatar) {
        return "avatar";
      } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable) {
        return "vulnerable"
      } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
        return "comm";
      }
    },

    /**
     * ---> Go to the IconArray Page with the chosen avatar
     * @return none
     */
    loadIconArray() {
      this.chosenCharacter.colors.accessoriesColor = charactersJson.defaultColors.AccessoriesColor;
      this.chosenCharacter.colors.shirt = charactersJson.defaultColors.ShirtColorCharacters;
      this.highlightedAvatar = this.chosenCharacter;
      this.highlightedAvatar.colors.accessoriesColor = "#8d0d23"
      this.highlightedAvatar.colors.shirt = "#8d0d23"
      this.highlightedAvatar.colors.shirtShadow = "#710a1c"
      // //TODO: fetch avatars_number from JSON file
      // this.buildTargetList(1000);

      // this.iconArrayProps.targetList = this.targetList;
      // this.$emit('setIconArrayProps', {iconArrayProps: this.iconArrayProps})

      this.$emit('setCharacterProps', this.chosenCharacter);
      localStorage.setItem('chosenCharacterFromAvatarsView', JSON.stringify(this.chosenCharacter));
      this.$router.push({
        name: 'Evidence',
      });
      this.$emit('changeRouteName', "Evidence");
    },

    /**
     * ---> Manage messages on the Home page based on the character group number created
     * @return none
     */
    manageCharacterCount() {
      if (this.totalCreated <= charactersJson.nbAvatar) {
        this.step++;
      }
    },

    /**
     * ---> ---------  completed soon -------
     * @return none
     */
    setDebugMode() {
      if (this.$route.query.debug === "true") {
        this.debugMode = true;
      }
    },

    isScreenMobile() {
      this.isMobile = window.innerWidth <= 768;
      return this.isMobile;
    },

  },

  created() {
    this.characterList = charactersJson.characters;
    this.maxCharactersInGroup = charactersJson.nbAvatar;
    this.contextualInfo = this.labels.contextualInfoAvatar;
    this.facialHairList = facialHairJson.beards;
    this.skinColors = charactersJson.skinColors;
    this.hairColors = charactersJson.hairColors;
    this.defaultCharacterColors = charactersJson.defaultColors;
    this.nbAvatar = charactersJson.nbAvatar;
    this.nbrVulnerable = charactersJson.nbVulnerable;
    this.nbrCommunity = charactersJson.nbCommunity;
    this.maxColorTile = charactersJson.maxColorTile;
    this.setDebugMode();
  },
  mounted() {
    this.$emit('changeRouteName', "Avatars");
  }
}
</script>
<style>
/* To change the visual for the color picker */
div.vc-compact {
  width: 100%;
}

li.vc-compact-color-item {
  width: 45px;
  height: 45px;
}

div.vc-compact-dot {
  width: 50%;
  height: 50%;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
}

</style>
<style scoped>
html {
  overflow-y: hidden !important;
}

.container {
  margin-top: 50px;
}

.instructions-block {
  margin: 15px 0;
}

@media screen and (min-width: 300px) {
  .instructions-block {
    margin: auto;

  }
}

@media screen and (min-width: 697px) {
  .instructions-block {
    margin: auto 200px;
  }
}

@media screen and (min-width: 420px) {
  .page-instruction {
    margin-top: 0.5%;
    font-family: Roboto, serif;
    font-weight: bold;
    font-size: 20px;
  }
}

h1 {
  font-weight: bold;
}

h2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
}

p {
  margin: 1px 0;
}

.tool {
  margin: 1px;
  display: flex;
  justify-content: center;
}

p#contextualInfo {
  margin: 0.2rem;
  font-size: 1rem;

}

.continue {
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  text-align: center;
  color: #043213;
  width: 289px;
  height: 61px !important;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 15px;
  position: relative;
  margin: 16px auto;
}

.continue:active {
  top: 4px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
}

.continue:focus {
  outline: 0;
}
</style>
