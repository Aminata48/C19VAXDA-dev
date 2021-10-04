import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import vuetify from "./plugins/vuetify";
import ProgressBar from 'vuejs-progress-bar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown,faPlayCircle, faRedo, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRecognizer from 'vue-recognizer';
import VueTippy, { TippyComponent } from "vue-tippy";
require('./scss/main.scss');



Vue.use(VueTippy, {
    directive: "tippy", // => v-tippy
    flipDuration: 0,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: false
            }
        }
    }
});

Vue.component("tippy", TippyComponent);
Vue.config.productionTip = false

 new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')

Vue.use(ProgressBar)

Vue.use(VueRecognizer);
library.add(faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown,faPlayCircle, faRedo, faExternalLinkAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
