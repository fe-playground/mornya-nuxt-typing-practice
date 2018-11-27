<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="isShowDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list-tile>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
        </v-btn>
      </v-list-tile>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="isShowDrawer = !isShowDrawer"/>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&nbsp;&nbsp;Created 2018 mornya</span>
    </v-footer>

    <alert/>
  </v-app>
</template>

<script>
import Alert from '~/components/Alert'

export default {
  components: {
    Alert
  },
  data () {
    return {
      clipped: true,
      isShowDrawer: true,
      fixed: false,
      items: [
        { icon: 'home', title: 'Main', to: '/' },
        { icon: 'contact_support', title: 'About', to: '/about' },
        { icon: 'supervisor_account', title: 'Signin', to: '/signin' },
      ],
      miniVariant: true,
      title: 'Typing Practice',
    }
  },
}
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.__ui-frozen-body__ {
      position: fixed;
      overflow: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 0;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    &.__ui-unfrozen-body__ {
      position: fixed;
      overflow: auto;
    }
  }
</style>
