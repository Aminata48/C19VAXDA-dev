<template>
  <div id="main_container">
    <v-container id="myContainer" style="display: flex; flex-flow: column nowrap;
        justify-content: center; align-items: center" >

      <div :key="index" v-for="(column, index) in targetList" style="display: flex; flex-flow: row nowrap;
      justify-content: flex-start; align-content: flex-start;" >
        <div :key="index" v-for="(avatar, index) in column" >
          <div>
            <Character style="margin: 10px 5px;" :is-name="true"
                       :size="avatar_size" :edit="false" :customised="true" :colors="avatar.colors"
                        :svgFile="require(`@/assets/characters/${avatar.file}`)"/>
          </div>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import Character from "@/components/Avatars/Character";

export default {
  name: "IconArrayDesktop",
  components: {
    Character
  },

  data() {
    return {
      avatar_scale : 4,
      avatarNbr : 8,
      targetList: [],
    };
  },
  computed:{
    avatar_size(){
      return{
      width: `${this.avatar_scale * 10}px`,
      height: `${this.avatar_scale * 10}px`
    }
    }
  },

  props:
      {chosenCharacterFromAvatarsView: Object,
        avatarsNumber : {
        type : Number
        },
      matrixBase: {
        type: Number,
        defaults: 10
      }},

  methods:{
    /**
     * -->TODO
     * @param avatars_number the number of highlighted avatars in the iconArray
     * @param base
     * @return none
     * */
    buildTargetList(avatars_number, base) {
      let nbrRow = Math.floor(avatars_number/base);
      let nbrOfItemOfLastList = avatars_number % base;
      if(nbrOfItemOfLastList !==0 ){
        for (let i = 0; i <= nbrRow; i++) {
          let column = []
          if ( i === nbrRow){
            for (let i = 1; i <= nbrOfItemOfLastList; i++) {
              column.push(this.chosenCharacterFromAvatarsView)
            }
          }else{
            for (let i = 1; i <= base; i++) {
              column.push(this.chosenCharacterFromAvatarsView)
            }
          }
          this.targetList.push(column);
        }
      }
      else{
        for (let i = 1; i <= nbrRow; i++) {
          let column = []
          for (let i = 1; i <= base; i++) {
            column.push(this.chosenCharacterFromAvatarsView)
          }
          this.targetList.push(column);
        }
      }
    },
  },

  mounted() {
    this.buildTargetList(this.avatarsNumber, this.matrixBase);
  }
}
</script>

<style scoped>

h1{
  font-size: 40px;
}

</style>
