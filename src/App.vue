<template>
  <div id="app">
    <m-header></m-header>
  	<tab></tab>
  	<transition  mode="out-in">
      <keep-alive>
  		  <router-view></router-view>
      </keep-alive>
  	</transition>
  </div>
</template>

<script>
import './assets/css/reset.css'
import "./assets/js/rem.js"

import mHeader from "@/components/mHeader"
import Tab from "@/components/Tab"
import "./assets/scss/font-awesome.scss"
export default {
  name: 'app',
  components: {
    mHeader,
    Tab
  }
}
</script>

<style>

</style>
