<template>
  <v-layout>
    <v-flex text-xs-center>
      <div v-if="IS_SIGNEDIN">
        <h2><strong>{{ USERNAME }}</strong>님의 도전을 환영합니다!</h2>
        <v-btn color="primary" nuxt @click="onClickSignOut">하지만 로그아웃하기</v-btn>
      </div>
      <div v-else>
        <h2><strong>로그인 하세요</strong></h2>
        <label for="username" class="user-name">
          <v-text-field
            id="username"
            label="Name to rank"
            prepend-icon="create"
            placeholder="이름을 입력해 주세요"
            autofocus
            clearable
            minlength="2"
            maxlength="10"
            v-model="username"
            v-validate="'required|min:2|max:10'"
            data-vv-name="username"
          />
        </label>
        <v-btn color="primary" nuxt @click="onClickSignIn">로그인하기</v-btn>
        <div class="err" v-show="errors.has('username')">📣 이름을 2글자 이상, 10글자 이내로 정확히 입력해 주세요!</div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Alert from '~/components/Alert'

export default {
  name: 'Signin',
  components: {
    Alert,
  },
  data () {
    return {
      username: '',
    }
  },
  computed: {
    ...mapState({
      USERNAME: state => state.username,
      IS_SIGNEDIN: state => state.isSignedIn,
    }),
  },
  methods: {
    onClickSignIn () {
      this.$validator.validate()
        .then(result => {
          if (result) {
            this.$events.$emit('SHOW_ALERT', {
              title: '알림',
              content: `<strong>${this.username}</strong>님! 격하게 환영합니다 ㅎㅎ`,
              buttons: [
                { id: 'btn-cancel', label: '웃기네' },
                { id: 'btn-ok', label: '나도♥️', isPrimary: true },
              ],
              onClick: (selectedId) => {
                if (selectedId === 'btn-ok') {
                  this.SET_SIGNIN(this.username)
                  this.$router.push({ path: '/' })
                }
              },
            })
          }
        })
    },
    onClickSignOut () {
      this.SET_SIGNOUT()
    },
    ...mapMutations({
      SET_SIGNIN: 'setSignIn',
      SET_SIGNOUT: 'setSignOut',
    }),
  },
  mounted () {
    if (this.USERNAME) {
      this.username = this.USERNAME
    }
  },
}
</script>

<style scoped lang="scss">
  h2 > strong {
    color: deeppink;
  }
  .user-name {
    display: inline-block;
    width: 300px;
  }
  .err {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
    color: deeppink;
  }
</style>
