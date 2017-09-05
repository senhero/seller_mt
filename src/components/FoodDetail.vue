<template>
	<transition name="foodDetail">
		<div class="foodDetail" v-show="showFlag" ref="FoodDetail">
			<div class="wrapper" >
				<div class="scroll_imgs">
					<div class="closeFoodDetail" @click="showFlag=false">
						<i class="fa fa-chevron-circle-left"></i>
					</div>
					<img :src="selectedFood.image" alt="">
				</div>
				<div class="food_price_wrapper">
					<h3>{{selectedFood.name}}</h3>
					<span class="cont_sell">月售 {{selectedFood.sellCount}}</span>
					<div class="price">
						<span class="price_now">￥{{selectedFood.price}}</span>
						<span v-if="selectedFood.oldPrice" class="price_old">￥{{selectedFood.oldPrice}}</span>
					</div>
					<p class="zk_price"><i class="fa fa-bookmark"></i>3.174折 限一份</p>
					<div class="cartcontrol_wrapper">
						<cartcontrol v-show="selectedFood.count&&selectedFood.count > 0" :food="selectedFood"></cartcontrol>
						<a @click="addCart()" v-show="!selectedFood.count" class="shopCart" href="javascript:;">加入购物车</a>
					</div>
				</div>
				<div class="food_detail_content">
					<h3 class="common_tit">
						商品详情
					</h3>
					<div class="detail_content">
						<p>{{selectedFood.info}}</p>
					</div>
				</div>
				<div class="food_evaluate">
					<h3 class="ev_title">外卖评价<span>(好评度<span>88%</span>)</span></h3>
					<div class="evaluate_list">
						<ul>
							<li v-for="item in selectedFood.ratings">
								<div class="face_imgs">
									<img :src="item.avatar" alt="">
								</div>
								<div class="txt">
									<span class="nickName">{{item.username}}</span>
									<span class="zan">赞了该商品</span>
									<span class="ev_con">{{item.text}}</span>
									<span class="ev_time">{{item.rateTime}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import iScroll from "better-scroll"
	import Vue from "vue"
	import Cartcontrol from "@/components/Cartcontrol"
	export default {
		name: "FoodDetail",
		props:{
			selectedFood:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false,
			}
		},
		methods: {
			showFood(){
				this.showFlag = true;
				this.$nextTick(function(){
					if(!this.scroll){
						this.scroll = new iScroll(this.$refs.FoodDetail,{
							click: true
						})
					}
					else {
						this.scroll.refresh();
					}
				})
			},
			addCart(){
				Vue.set(this.selectedFood, 'count', 1);
			}			
		},
		components: {
			Cartcontrol
		}
	}
</script>
<style lang="scss">

	.foodDetail{
		margin: 0 auto;
		right: 0;
		position: fixed;
		top: 0px;
		left: 0px;
		max-width: 640px;
		min-width: 320px;
		bottom: .72rem;
		z-index: 10;
		background-color: #fff;
		.scroll_imgs{
			width: 100%;
			height:0;
			position: relative;
			padding-top: 100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.closeFoodDetail {
				position: absolute;
				top: .17rem;
				left: .17rem;
				width: .5rem;
				height: .5rem;
				border-radius: 50%;
				z-index: 5;
				text-align: center;
				line-height: .5rem;
				.fa {
					font-size: .5rem;
					color: #eee;
					font-weight: normal;
				}
			}
		}
		.food_price_wrapper {
			position: relative;
			padding: .14rem .22rem;
			border-bottom: 1px solid #ededed;
			h3 {
				font-size: .24rem;
				font-weight: 500;
				line-height: .46rem	;
			}
			.cont_sell {
				font-size: .2rem;
				line-height: .4rem;
				color: #909090;
			}
			.price {
				font-size: 0;
				margin-top: .27rem;
				&_now {
					display: inline-block;
					font-size: .28rem;
					color: #ff4042;
					font-weight: bold;
				}
				&_old {
					display: inline-block;
					font-size: .15rem;
					color: #ddd;
					vertical-align: bottom;
					text-decoration: line-through;
				}
			}
			.zk_price {
				color: #ff4042;
				font-size: .18rem;
				font-weight: 500;
				margin-top: .2rem;
				padding-left: .05rem;
				.fa{
					font-size: .18rem;
					margin-right: .05rem;
				}
			}
			.cartcontrol_wrapper {
				position: absolute;
				bottom: .37rem;
				right: .22rem;
				.shopCart {
					display: inline-block;
					font-size: .22rem;
					color: #333;
					border-radius: 4px;
					background-color: #ffd161;
					width: 1.48rem;
					height: .5rem;
					font-weight: bold;
					text-align: center;
					line-height: .5rem;
				}
			}
		}
		.food_detail_content {
			margin: 0 .32rem;
			.common_tit{
				line-height: .66rem;
				color: #999999;
				position: relative;
				font-size: .24rem;
				padding-left: .1rem;
				&:before {
					content: '';
					position: absolute;
					top: 50%;
					left: 0;
					transform: translate(0,-50%);
					width: 3px;
					height: .2rem;
					background-color: #ffcb5c;
				}
			}
			.detail_content {
				line-height: .36rem;
				color: #333;
				font-size: .24rem;
				border-bottom: 1px solid #ddd;
				padding: 0  0 .2rem 0;
			}
		}
		.food_evaluate{
			padding: 0 .22rem;
			.ev_title {
				line-height: .7rem;
				font-size: .24rem;
				color: #333;
				border-bottom: 1px solid #ddd;
				span {
					color: #909090;
					span {
						color: #c55d54;
					}
				}
			}
			.evaluate_list li {
				display: flex;
				padding: .22rem 0;
				position: relative;
				.face_imgs {
					width: .65rem;
					height: .65rem;
					margin-right: .05rem;
					position: relative;
					img {
						width: 100%;
						height: 100%;	
						border-radius: 50%;
						overflow: hidden;
					}
				}
				.txt {
					flex: 1;
					span {
						display: block;
						line-height: .38rem;
						font-size: .2rem;
					}
					.ev_time {
						top: .22rem;
						right: .22rem;
						position: absolute;
					}
				}
			}
		}
	}
	.foodDetail-enter-active,.foodDetail-leave-active {
		transition: all .3s;
	}
	.foodDetail-enter,.foodDetail-leave-to{
		transform: translate(-100%,0);
		opacity: 0;
	}
</style>