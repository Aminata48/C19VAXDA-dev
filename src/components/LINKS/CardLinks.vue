<template>
  <div class="container">
      <div class="card is-full-desktop" v-for="(value, index)  in c19vaxdaFaq" :key=index>
        <header class="card-header">
          <p class="card-header-title">{{value.faqheader}}</p>
          <a class="card-header-icon card-toggle">
            <i class="fas fa-chevron-down"></i>
          </a>
        </header>
        <div class="card-content is-hidden">
          <div class="content">
            <h6 class="subtitle is-6 has-text-left">{{value.faqanswer}}</h6>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'card',

  props: {
    c19vaxdaFaq : Object

  },
  data() {
    return {};
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
          cardToggles[i].classList.add('first-card-header-color');
        else
          cardToggles[i].classList.add('second-card-header-color');

        cardToggles[i].addEventListener('click', e => {
          e.currentTarget.lastChild.lastChild.classList.toggle('fa-chevron-up');
          e.currentTarget.parentElement.childNodes[1].classList.toggle("is-hidden");
          if (i % 2 === 0) {
            document.getElementsByClassName('card-header-title')[i].style.color = "rgba(0,0,0,1)";
            document.getElementsByClassName('card-header-title')[i].style.backgroundColor = "rgba(28,93,154,0.55)";
            document.getElementsByClassName('card-header-icon')[i].style.backgroundColor = "rgba(28,93,154,0.55)";
          } else {
            document.getElementsByClassName('card-header-title')[i].style.color = "rgba(0,0,0,1)";
            document.getElementsByClassName('card-header-title')[i].style.backgroundColor = "rgba(239,93,22,0.55)";
            document.getElementsByClassName('card-header-icon')[i].style.backgroundColor = "rgba(239,93,22,0.55)";
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
    },
  },
  mounted() {
    this.activeCardHeader();
    document.addEventListener('DOMContentLoaded', function () {
    });
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

.first-card-header-color {
  background: rgba(28, 129, 154, 0.25);
}

.second-card-header-color {
  background: rgba(239, 117, 22, 0.25);
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
</style>
