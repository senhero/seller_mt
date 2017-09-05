<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="minus" @click.stop.prevent="minusCart()" v-show="food.count > 0">
				<i class="fa fa-minus-circle" ></i>
			</div>
		</transition>
		<div class="count" v-show="food.count > 0">{{food.count}}</div>
		<div class="plus" ref="addCartEle" @click.stop.prevent="plusCart($event)">
			<i class="fa fa-plus-circle"></i>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		name:'Cartcontrol',
		props:{
			food:{
				type:Object
			}
		},
		methods: {
			minusCart(){
				if(this.food.count > 0){
					this.food.count--;
				}
			},
			plusCart(ev){
				if(!this.food.count){
					Vue.set(this.food,'count', 1);
				}
				else{
					this.food.count++;
				}
				//子级想父级传递ev.target dom元素
				//
				this.$emit('getPlus',ev.target);
			}

		}
	}
</script>
<style lang="scss">
	.cartcontrol {
		.minus,.plus{
			padding: 0 .1rem ;
			// margin: .1rem;
			.fa{
				font-size: .4rem;
			}
		}
		.minus{
			color: #adadad;
			position: relative;
			z-index: 5;
		}
		.plus{
			position: relative;
			color: #ffd161;
			z-index: 8;
		}
		.count {
			font-size: .24rem;
		}
		.minus,.plus,.count {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.move-enter-active,.move-leave-active {
		transition: all .5s;
	}
	.move-enter,.move-leave-to {
		opacity: 0;
		transform: translate3d(.8rem,0,0) rotate(180deg);
	}
	
</style>