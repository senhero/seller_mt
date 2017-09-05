<template>
	<div class="tabWrapper">
		<ul class="tabNav">
			<router-link :to="{name:'foods'}" tag="li">
				<a href="" >点菜</a>
			</router-link>
			<router-link :to="{name:'evaluate'}" tag="li">
				<a href="" >评价</a>
			</router-link>
			<router-link :to="{name:'seller'}" tag="li">
				<a href="" >详情</a>
			</router-link>
			<!-- <router-link tag="li">
				<a href="" :to="{name:'evaluate'}"></a>
			</router-link>
			<router-link tag="li">
				<a href="" :to="{name:'seller'}"></a>
			</router-link> -->
			<!-- <li><a href="" class="link-active-class">点菜</a></li>
			<li><a href="">评价</a></li>
			<li><a href="">详情</a></li> -->
		</ul>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="scss">
	.tabWrapper {
		position: relative;
		height: .6rem;
		.tabNav {
			font-size: .22rem;
			display: flex;
			border:1px solid rgba(210,214,217,.5);
			border:{
				left: none;
				right: none;
			}
			align-items: center;
			justify-content: space-between;
		}
		li {
			height: .58rem;
			flex: 1;
			line-height: .58rem;
			text-align: center;
			a {
				display: inline-block;
				height: .58rem;
			}
			&.router-link-exact-active a {
				border-bottom: 2px solid #fbad15
			}
		}
	}
</style>