<template>
	<div class="food_wrapper">
		<loading v-if="loading"></loading>
		<div class="left_nav" ref="leftNav">
			<ul>
				<li :class="{'active':currentIndex==index}" v-for="good,index in goods" @click.stop.prevent="selectMenu(index);">
					<i class="fa"></i>
					{{good.name}}
				</li>
			</ul>		
		</div>
		<div class="food_content" ref="foodContent">
			<div class="foods_conWrapper">
				<div class="content_item content_item_hook"  v-for="item in goods">
					<h4 class="food_title">{{item.name}}</h4>
					<ul class="itemList">
						<li v-for="food in item.foods" @click="showDetailFood(food,$event)">
							<div class="imgs">
								<img :src="food.image" height="86" width="87" alt="">
							</div>
							<div class="text">
								<h3>{{food.name}}</h3>
								<p>{{food.info?food.info:"物美价廉的"+ food.name}}</p>
								<p><span>月售{{food.sellCount}}</span> <span>赞31</span></p>
								<p class="price">￥{{food.price}}</p>
								<div class="cartcontrol_wrapper">
									<!-- 添加数量的组件 -->
									<cartcontrol :food="food" @getPlus="_drop"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<Shopcart :select-food="selectFoods" ref="shopcart"></Shopcart>
		<food-detail :selectedFood='selectedFood' ref="FoodDetail"></food-detail>
	</div>
</template>
<script>
	import iScroll from "better-scroll"
	// import iScroll from "iScroll" 
	import Shopcart from "@/components/Shopcart"
	import Cartcontrol from "@/components/Cartcontrol"
	import FoodDetail from "@/components/FoodDetail"
	//console.log(iScroll);
	export default {
		name:"Foods",
		props:{
			seller:{
				type:Object,
			}	
		},
		data(){
			return {
				goods: [],
				scrollY: 0,
				listFoodHeight:[],
				selectedFood:{},
				loading: false
			}
		},
		created(){
			this._fetchData();
		},
		computed:{
			currentIndex(){
				for(let i=0; i < this.listFoodHeight.length; i++) {
					var cur = this.listFoodHeight[i];
					var next = this.listFoodHeight[i+1];
					if(!next || (this.scrollY >= cur && this.scrollY < next)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let result = [];
				this.goods.forEach(good=>{
					good.foods.forEach(food=>{
						if(food.count){
							result.push(food);
						}
					});
				})
				return result;
			}
		},
		mounted(){
			// 获取子组件的可以使用this.$ref 
			// 获取子组件的dom元素也可以通过ref属性绑定一个值 通过组件的ref也可以访问
			// this.$refs.cartcontrol.$refs.addCartEle;
	
		},
		methods: {
			//获取数据
			_fetchData(){
				this.loading = true;
				this.$http('/api/goods').then(res=>{
					// console.log(res);
					this.loading = false;
					if(res.data.errno === 0){
						this.goods = res.data.data;
						this.$nextTick(function(){
							this._intScroll();
							this.caleFoodHeight();//计算food里面每个的高度
						})
					}
				});
			},
			selectMenu(index){
				console.log(index);
				var contentItemHook = document.getElementsByClassName('content_item_hook');

				var el = contentItemHook[index];
				this.foodsContentScroll.scrollToElement(el,300);
				// this.foodsContentScroll.refresh();
			},
			_intScroll(){ //初始化滚动
				this.leftNavScroll = new iScroll(this.$refs.leftNav,{
					click: true,
					probeType:1
				});
				this.foodsContentScroll = new iScroll(this.$refs.foodContent,{
					click: true,
					probeType:3
				});
				this.foodsContentScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			caleFoodHeight(){
				let foodList = this.$refs.foodContent.getElementsByClassName('content_item');
				var height = 0;
				this.listFoodHeight.push(height);
				for(let i=0; i< foodList.length;i++){
					var cur = foodList[i];
					height += cur.clientHeight;
					this.listFoodHeight.push(height);
				}
			},
			_drop(target){
				this.$nextTick(function(){
					this.$refs.shopcart.drop(target);
				})
			},
			showDetailFood(food){
				this.selectedFood = food;
				this.$refs.FoodDetail.showFood();
			}
		},
		components: {
			Shopcart,
			Cartcontrol,
			FoodDetail
		}
	}
</script>
<style lang="scss">
	.food_wrapper {
		max-width: 640px;
		min-width: 320px;
		margin: 0 auto;
		display: flex;
		position: absolute;
		top: 2.17rem;
		left:0;
		right: 0;
		bottom: .72rem;
		z-index: 1;
		.left_nav {
			width: 1.24rem;
			overflow: hidden;
			padding-top: 1px;
			ul{
				// padding-bottom: .72rem;
			}
			li{
				font-size: .22rem;
				height: .80rem;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 .1rem;
				line-height: 1.4;
				// line-height: .7rem;
				text-align: center;
				background-color: #f4f4f4;
				border-bottom: 1px solid #eaeaea;
				color: #5e5e5e;
				&.active{
					background-color: #fff;
					color: #404040;
				}
				&.active:last-of-type {
					border-bottom: none;
				}
			}
		}
		.food_content {
			flex: 1;
			padding-left: .15rem;
			overflow: hidden;
			// padding-bottom: .72rem;
			.foods_conWrapper {
				// padding-bottom: .72rem;
			}
			.food_title {
				position: relative;
				padding-left: .11rem;
				line-height: .52rem;
				font-size: .22rem;
				color: #4a4a4a;
				margin-bottom: .1rem;
				&:before {
					position: absolute;
					top: 50%;
					left: 0;
					transform: translate(0,-50%);
					content:"";
					display: block;
					width: .04rem;
					height: .17rem;
					background-color: #fecf5b;
				}
			}
			.itemList{
				li{
					display: flex;
					margin-bottom: .38rem;
					.imgs{
						width: .87rem;
						height: .86rem;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.text {
						flex: 1;
						font-size: .2rem;
						padding-left: .16rem;
						position: relative;
					}
					.cartcontrol_wrapper {
						position: absolute;
						right: .18rem;
						top: .66rem;
					}
					h3 {
						font-size: .22rem;
						font-weight: bold;
						color: #000;
						margin-bottom: .07rem;
					}
					p {
						color:#828282;
						line-height: .32rem;
						&:first-of-type {
							display: -webkit-box;
							-webkit-line-clamp: 1;
							overflow: hidden;
							word-break: break-all;
							-webkit-box-orient: vertical;
						}
					}
					.price{
						color: #fb4f43;
						font-weight: 700;
						font-size: .2rem;
					}
					&:last-of-type {
						// padding-bottom: .3rem;
						// border-bottom: none;
					}
				}
			}
		}
		
	}
</style>