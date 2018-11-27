<template>
  <v-layout justify-center align-center>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">Welcome!</v-card-title>
        <v-card-text>
          <div v-if="!isStarted" class="text-xs-center">
            <p>시작하기 버튼을 클릭해서 타이핑 연습을 시작하세요.</p>
            <p>하지만.. 그 전에 로그인 먼저 하시면 그 이름으로 랭킹이 책정됩니다.</p>
          </div>
          <div v-else class="text-xs-center">
            <p>타이핑 연습 진행중!</p>
            <p>&nbsp;</p>
            <practice
              :wordData="wordData"
              :setAllForks="setAllForks"
            />
            <div class="timer-area">
              <p>시작 시간: {{ startTime | toTimeString }}</p>
              <p>종료 시간: {{ endTime | toTimeString }}</p>
              <p>소요 시간: {{ elapsedTime | toTimeDiffString }}</p>
              <p>당신의 현재 랭킹: <strong>{{ rankingIndex }}</strong>등</p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions v-if="!isStarted">
          <v-spacer/>
          <v-btn nuxt to="/signin">로그인하기</v-btn>
          <v-btn color="primary" nuxt @click="onClickStart">시작하기</v-btn>
        </v-card-actions>
      </v-card>

      <br/>

      <v-card>
        <v-card-title class="headline">Ranking Status</v-card-title>
        <v-card-text>
          <ranking :ranking="RANKING"/>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import wordData from '~/static/word-data.json'
import Practice from '~/components/Home/Practice'
import Ranking from '~/components/Home/Ranking'

export default {
  name: 'Home',
  components: {
    Practice,
    Ranking,
  },
  data () {
    return {
      rankId: null,
      wordData,
      timerId: -1,
      startTime: null,
      endTime: null,
      elapsedTime: 0,
      isStarted: false,
      isAllForks: false,
    }
  },
  computed: {
    rankingIndex () {
      const rank = this.RANKING.findIndex(item => item.id === this.rankId)
      return rank === -1 ? 1 : (rank + 1)
    },
    ...mapState({
      USERNAME: state => state.username,
      RANKING: state => state.ranking,
    }),
  },
  methods: {
    setAllForks () {
      if (this.timerId !== -1) {
        clearInterval(this.timerId)
      }

      this.isAllForks = true
      this.isStarted = false
      this.endTime = new Date()
      this.elapsedTime = Number(this.endTime) - Number(this.startTime)
    },
    onClickStart () {
      this.$events.$emit('SHOW_ALERT', {
        title: '알림',
        content: `<strong>${this.USERNAME || '아무개'}</strong>님! 이제 시작합니다.<br/>심호흡을 하고, 시작하세요!`,
        buttons: [
          { id: 'btn-cancel', label: '기권' },
          { id: 'btn-ok', label: '쒸작!', isPrimary: true },
        ],
        onClick: (selectedId) => {
          if (selectedId === 'btn-ok') {
            // 진행 시작
            this.rankId = new Date().getTime()

            this.isStarted = true
            this.startTime = new Date()

            this.timerId = setInterval(() => {
              this.endTime = new Date()
              this.elapsedTime = Number(this.endTime) - Number(this.startTime)
              this.SET_RANKING({
                id: this.rankId,
                username: this.USERNAME,
                timestamp: this.endTime,
                elapsed: this.elapsedTime,
              })
            }, 1000)
          }
        },
      })
    },
    ...mapActions({
      SET_USERNAME: 'setUsername',
      SET_RANKING: 'setRanking',
    }),
  },
  beforeDestroy () {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isStarted) {
      this.$events.$emit('SHOW_ALERT', {
        title: '알림',
        content: `지금 페이지를 나가도 랭킹은 책정됩니다.<br/>레알 나가실겁니까?`,
        buttons: [
          { id: 'btn-cancel', label: '아앗 쏘리' },
          { id: 'btn-ok', label: '벗어나고파!', isPrimary: true },
        ],
        onClick: (selectedId) => {
          if (selectedId === 'btn-ok') {
            next()
          }
        },
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss">
  .headline {
    font-weight: bold;
    color: deeppink;
  }
  .timer-area {
    margin-top: 20px;
    p {
      margin: 4px;
      line-height: 1.2em;
      > strong {
        color: deeppink;
      }
    }
  }
</style>
