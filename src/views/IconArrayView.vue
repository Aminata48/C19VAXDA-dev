<template>
  <!--  Mobile version of the icon array vue-->
  <div v-if="isMobile">
    <IconArrayMobile :ref="'mobile'" :avatar_array="iconArrayProps.targetList"
    />
  </div>

<!--  <div v-else>-->
<!--    <avatar-array>-->

<!--    </avatar-array>-->
<!--  </div>-->

<!--    Desktop version of the icon array vue-->
  <div v-else>
<!--    <IconArrayDesktop :ref="'desktop'"-->
<!--                      :chosenCharacterFromAvatarsView="chosenCharacterFromAvatarsView"-->
<!--    />-->
    <IconArrayDesktop :ref="'desktop'"
                     :chosenCharacterFromAvatarsView="loadCharacter" :avatarsNumber="avatarsNumber"
                      :matrixBase="10"
    />
  </div>
</template>

<script>
 import IconArrayDesktop from "@/components/IconArray/IconArrayDesktop";
import IconArrayMobile from "@/components/IconArray/IconArrayMobile";
// import AvatarArray from "../components/IconArray/avatarArray";


export default {
  name: "IconArray",
  components: {IconArrayMobile, IconArrayDesktop},
  data() {
    return {
      isMobile: false,
      charactersHighlighted: false, //avoids highlighting twice; see  highlightCharacters(targetList)
      highlightingSpeed: 400,//Speed of the character highlighting (in ms) default :400
      characterLocalStorage: {},
      useLocalStorageValue: false,
    };
  },

  props: {
    iconArrayProps: Object, //contains { targetList}
    chosenCharacterFromAvatarsView : Object,
    avatarsNumber: Number
  },
  computed:{
    loadCharacter(){
      return this.useLocalStorageValue?this.characterLocalStorage:this.chosenCharacterFromAvatarsView;
    }
  },
  methods: {
    /**
     * ---> Check if the user's device is a mobile; based on the screen width
     * @return {boolean} this.isMobile
     */
    isScreenMobile() {
      this.isMobile = window.innerWidth < 768;
      return this.isMobile;
    },

    /**
     * ---> Highlights the given character (target)
     * @param target {String} the character to be highlighted
     * @param initial {boolean} true when characters are highlighted at the beginning of the animation
     * @return none
     * */
    highlightCharacter(target, initial = false) {
      this.zoomInOut(target);
      if (initial) { //first time that characters get highlighted
        (this.isMobile) ? target = this.$refs.mobile.$refs[target][0] : target = this.$refs.desktop.$refs[target][0]; // [0] is due to the v-for statement
        let darkerColor = target.getDarkerShade("#B0102C", 0.8);
        target.changeAccessoriesColor(darkerColor, 0.8);
        target.changeShirtColor(darkerColor, 0.8);
      }
    },

    /**
     * ---> Unhighlights the given character (target)
     * @param target {String} the character to be highlighted
     * @return none
     * */
    unHighlightCharacter(target) {
      this.zoomInOut(target, true);
      (this.isMobile) ? target = this.$refs.mobile.$refs[target][0] : target = this.$refs.desktop.$refs[target][0]; // [0] is due to the v-for statement
      target.changeAccessoriesColor("#727272", 0.8);
      target.changeShirtColor("#BFBABE", 0.8);
    },

    /**
     * ---> Highlights the given characters in the iconArray
     * @param targetList {Array} the list of all characters to be highlighted
     * @return none
     */
    highlightCharacters(targetList) {
      if (!this.charactersHighlighted) {
        this.charactersHighlighted = true;

        const delayLoop = () => {
          return (target, i) => {
            setTimeout(() => {
              this.highlightCharacter(target, true);
            }, i * 1000);
          }
        };

        targetList.forEach(delayLoop());
      }
    },

    /**
     * ---> Zoom the shape (target) in and get it back to its original size
     * @param target {String} the target to be zoomed
     * @param reverse {Boolean} if true, the target gets smaller before getting its original size
     * @return none
     */
    zoomInOut(target, reverse = false) {
      let shape = document.getElementById(target);

      // Scaling up
      shape.style.transform = (reverse) ? "scale(0.8)" : "scale(1.5)";
      shape.style.transitionDuration = this.highlightingSpeed + "ms";
      shape.style.transitionTimingFunction = "ease-in";
      shape.style.transitionProperty = "transform";

      // Scaling back after scaling up is done using scaling up duration as delay
      setTimeout(() => {
        shape.style.transform = "scale(1)";
        shape.style.transitionDuration = this.highlightingSpeed + "ms";
        shape.style.transitionTimingFunction = "ease-in";
        shape.style.transitionProperty = "transform";
      }, this.highlightingSpeed);
    },
  },

  created() {

  },

  mounted() {
    this.isScreenMobile();
    window.addEventListener('resize', this.isScreenMobile);
    //Redirects to the homepage when the iconArray route is accessed without making an avatar
    if (!this.iconArrayProps.targetList) {
      this.$router.push({name: 'Home'});
      console.clear();
    }

    // if(localStorage.getItem("chosenCharacterFromAvatarsView") != "" ||
    //     localStorage.getItem("chosenCharacterFromAvatarsView") != ""){
    //   this.chosenCharacterFromAvatarsView = JSON.parse(localStorage.getItem("chosenCharacterFromAvatarsView"));
    // }


    if(typeof this.chosenCharacterFromAvatarsView !== 'object' ||
    this.chosenCharacterFromAvatarsView === null){
      this.characterLocalStorage = JSON.parse(localStorage.getItem("chosenCharacterFromAvatarsView"));
      this.useLocalStorageValue = true;
      // this.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>
