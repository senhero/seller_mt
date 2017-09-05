import Vue from 'vue'
import Router from 'vue-router'
import Foods from '@/components/Foods'
import Evaluate from '@/components/Evaluate'
import Seller from '@/components/Seller'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{ path:'/', name:'foods',component:Foods},
		{ path:'/evaluate', name:'evaluate',component:Evaluate},
		{ path:'/seller', name:'seller',component:Seller}
	]
})
