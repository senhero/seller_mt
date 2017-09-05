<template>
	<div class="shopcart_fixed">
		<div class="shopcart" @click.stop="toggleList()">
			<div class="cart_wrapper" :class="{'hasfoods': totalPrice > 0}">
				<div class="cart">
					<i class="fa fa-shopping-cart"></i>
				</div>
				<div v-show="totalCount > 0" class="shopNum">{{totalCount}}</div>
			</div>
			<div class="delivery_price">
				<div v-if="totalPrice > 0" class="allPrice">￥{{totalPrice}}</div>
				<div class="delivery">另需配送费￥5</div>
			</div>
			
			<span class="on_delivery pay" @click.stop="payClick()" :class="{'payClass':totalPrice > minPrice}">{{payDesc}}</span>
			
			<div class="ball_wrapper">
				<transition-group tag="div" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
					<div class="ball" v-for="ball,index in balls" :key="index" v-show="ball.show"></div>
				</transition-group>
			</div>
		</div>
		<div class="list_cart_show" v-show="listShow">
			<div class="list_cart_header">
				下单减15元，再买<span>34.3元</span>可减<span>30元</span>（在线支付专享）
			</div>
			<div class="list_header_title">
				<span>1号口袋</span>
				<span @click="removeAll()">
					<i class="fa fa-trash-o"></i>
					清空购物车
				</span>
			</div>
			<div class="list" ref="listCart">
				<ul>
					<li v-for="food in selectFood">
						<span>{{food.name}}</span>
						<span class="price">￥{{food.count*food.price}}</span>
						<span class="cartcontrol_wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<transition name="shopMark">
			<div class="shopcart_mask" @click="fold=true" v-show="!fold"></div>
		</transition>
	</div>
</template>
<script>
	// jquery 引入的时候uc中出现空白的问题  
	import Velocity from "velocity-animate"
	import iScroll from "better-scroll"
	import Cartcontrol from "@/components/Cartcontrol" 
	export default {
		name: "Shopcart",
		props:{
			selectFood:{
				type:Array,
				default(){
					// {price:10,count:1}
					return [{price:10,count:4}]
				}
			},
			delivery:{
				type:Number,
				default: 0
			},
			minPrice:{
				type:Number,
				default: 25
			}
		},
		data(){
			return {
				balls:[
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls:[],
				fold: true
			}
		},
		computed:{
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(function(){
						if(!this.scroll){
							this.scroll = new iScroll(this.$refs.listCart,{
								click:true
							});
						}
						else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			},
			totalPrice(){
				let total = 0;
				for(let i=0; i < this.selectFood.length;i++){
					total += this.selectFood[i].price * this.selectFood[i].count;
				}
				return total
			},
			totalCount(){
				let count = 0;
				this.selectFood.forEach((food)=>{
					count += food.count;
				});
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}起送`;
				}
				else if(this.totalPrice < this.minPrice) {
					var diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}起送`;
				}
				else {
					return '去结算';
				}
			}
		},
		methods: {
			drop(el){
				for (let i = 0; i < this.balls.length; i++) {
					if (!this.balls[i].show) {
						this.balls[i]["show"] = true;
						this.balls[i].el = el;
						this.dropBalls.push(this.balls[i]);
						return;
					}
		        }
			},
			beforeEnter(el){

				for(let i = 0; i < this.balls.length;i++){
					var cur = this.balls[i];
					if(cur.show){
						// 记录当前的位置信息
						let pos = cur.el.getBoundingClientRect();
						el.style.display = "";
						el.pos = pos;
					}
				}
				
			},
			enter(el,done){
				Velocity(el,
					{
						left :['26px', 'linear', el.pos.left],
						top: [window.innerHeight - 32, el.pos.top] 
					},
					{ 
						easing:[0.49, -0.29, 0.75, 0.41],// 贝塞尔曲线curize
						duration: 450,
						mobileHA: true, // 移动端加速
						complete: function(){
							// 购物车的动态效果
							cartTransiton();
							//动画完成之后才能执行afterEnter
							done();
						} 
					});

				function cartTransiton(){
					var cartWrapperEle = document.querySelector('.cart_wrapper');
					cartWrapperEle.style.webkitTransform = 'scale(1.2)';
					cartWrapperEle.style.transform = 'scale(1.1)';
					cartWrapperEle.style.webkitTransition = 'transform .3s';
					cartWrapperEle.style.transition = 'transform .3s';
					setTimeout(()=>{
						cartWrapperEle.style.transform = '';
					},400);
				}

			},
			afterEnter(el){
				let ball = this.dropBalls.shift();
				if(ball){
					ball.show = false;
					el.style.display = 'none';
				}
			},
			removeAll(){
				this.selectFood.forEach(food => {
					food.count = 0;
				})
			},
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			payClick(){
				if(this.totalPrice==0 || this.totalPrice < this.minPrice ) return;
				alert(`请支${this.totalPrice}元`);
			}
		},
		components: {
			Cartcontrol
		}
	}
</script>
<style lang="scss">
	.shopcart_fixed {
		.shopcart {
			display: flex;
			max-width: 640px;
			min-width: 320px;
			margin: 0 auto;
			height: .72rem;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-top: 1px solid #aeaeaf;
			background-color: rgba(0,0,0,.9);
			color: #9d9d9d;
			z-index: 50;
			font-size: .24rem;
			.cart_wrapper {
				position: absolute;
				top: -.16rem;
				left: .15rem;
				width: .78rem;
				height: .78rem;
				border-radius: 50%;
				background-color: #e7e7e7;
				.cart{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					font-size: .46rem;
					.fa {
						color: #bababa;
					}
				}
				&.hasfoods {
					background-color: #ffd161;	
					.fa {
						color: #000;
					}
					.shopNum {
						position: absolute;
						top: -.1rem;
						right: -.05rem;
						display: inline-block;
						width: .25rem;
						// padding: 0 .05rem;
						height: .25rem;
						border-radius: .25rem;
						background-color: #fa4f45;
						line-height: .25rem;
						text-align: center;
						color: #fff;
						font-size: .18rem;
					}
				}
			}
			.delivery_price{
				padding-left: 1.2rem;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-content: center;
				.allPrice{
					font-size: .26rem;
					color: #fff;
					padding: .04rem 0;
				}
				.delivery{
					font-size: .2rem;
				}
			}
			.on_delivery{
				float: right;
				width: 1.87rem;
				line-height: .72rem;
				text-align: center;
				&.pay {
					background-color: #373737;
				}
				&.payClass {
					background-color: #ffd161;
					color: #000;
					border-top: 1px solid #ffd161;
					margin-top: -1px;
				}
			}
			.ball_wrapper {
				.ball {
					position: fixed;
			        left: .46rem;
			        bottom: 22px;
			        z-index: 200;
					width: .24rem;
					height: .24rem;
					border-radius: 50%;
					background-color: #ffd161;
				}
			}
		}
		.list_cart_show{
			max-width: 640px;
			min-width: 320px;
			left:0;
			right:0;
			margin: 0 auto;
			height: auto;
			position: fixed;
			bottom: .72rem;
			background-color: #fff;
			z-index: 41;
			.list_cart_header{
				width: 100%;
				height: .5rem;
				font-size: .24rem;
				line-height: .5rem;
				text-align: center;
				color: #353128; 
				background-color: #fff0cf;
				span{
					color:#d55049;
				}
			}
			.list_header_title {
				display: flex;
				height: .78rem;
				justify-content: space-between;
				align-items: center;
				padding: 0 .18rem;
				border-bottom: 1px solid #ededed;
				font-size: .24rem;
				color: #959595;
			}
			.list{
				max-height: 3.88rem;
				overflow: hidden;
			}
			li{
				position: relative;
				height:.97rem;
				line-height: .97rem;
				padding-left: .18rem;
				font-size: .24rem;
				border-bottom: 1px solid #ededed;
				.price,.cartcontrol_wrapper{
					position: absolute;
				}
				.price {
					right: 1.59rem;
				}
				.cartcontrol_wrapper {
					right: .14rem;
				}
			}
		}
		.shopcart_mask {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
			top: 0;
			left: 0;
			z-index: 40;
		}
		.shopMark-enter-active,shopMark-leave-active {
			transition: opacity .3s;
		}
		.shopMark-enter,.shopMark-leave-to {
			opacity: 0;
		}
	}	
</style>