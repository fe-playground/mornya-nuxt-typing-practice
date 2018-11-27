import Vue from 'vue'
import * as UI from '~/utils/UI'
import * as TimeFormat from '~/utils/TimeFormat'

Vue.config.productionTip = false

Vue.use({
  install (v) {
    v.prototype['$utils'] = { UI, TimeFormat }

    v.filter('toTimeString', value => TimeFormat.getTimeString(value))
    v.filter('toTimeDiffString', value => TimeFormat.diffTimeString(value))
  },
})
