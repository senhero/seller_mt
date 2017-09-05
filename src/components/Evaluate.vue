<template>
	<div class="evaluate_wrapper" ref="evaluate_wrapper">
		<loading v-if="loading"></loading>
		<div class="wrapper">
			<div class="detail_evaluate">
				<div class="eval">
					<span class="eval_count">4.7</span>
					<span class="eval_text">商家评价</span>
				</div>
				<div class="star_wrapper">
					
				</div>
				<div class="delivery">
					<span class="delivery_count">4.9</span>
					<span class="delivery_text">配送评分</span>
				</div>
			</div>
			<ul class="evaluate_list">
				<li v-for="item in ratings">
					<div class="avator">
						<img :src="item.avatar" alt="">
					</div>
					<div class="evaluate_right">
						<div class="evaluate_sub">{{item.username}}</div>
						<div class="evaluate_stars">
							<div class="apper_status">
								<star :score='item.score'></star><span>{{item.score}}分</span>
							</div>
							<span v-if="item.deliveryTime" class="evaluate_ship_time">{{item.deliveryTime}}分钟到达</span>
						</div>
						<div class="evaluate_content">
							<p>{{item.text}}</p>
						</div>
						<div class="evaluate_time">{{item.rateTime | formateTime('yyyy.mm.dd')}}</div>
					</div>
				</li>
			</ul>
			<div class="pullup-wrapper" v-show="showLoadingMore">
				<div class="before-trigger">
					<span><i class="fa fa-spinner fa-spin"></i>加载更多...</span>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import iScroll from 'better-scroll';
	import Star from "@/components/Star"
	import Vue from "vue";

	export default {
		name:"Evaluate",
		data(){
			return {
				ratings:[],
				loading: false,
				showLoadingMore:false
			}
		},
		created(){
			this.getRatingsData();
		},
		mounted(){
			
		},
		methods:{
			getRatingsData(){
				this.loading = true;
				this.$http('/api/ratings').then((res)=>{
					this.loading = false;
					if(res){
						this.ratings = res.data.data;
						this.$nextTick(function(){
							if(!this.scroll) {
								this.scroll = new iScroll(this.$refs.evaluate_wrapper,{
									probeType: 1,
									pullingDown: true,
									momentumLimitDistance: 15
								});
								this.scroll.on('scroll',(pos)=>{
									if(pos.y < (this.scroll.maxScrollY - 30)){
										this.showLoadingMore = true;
									}
									else {
										this.showLoadingMore = false;
									}
								})
								this.scroll.on('touchEnd',(pos)=>{
									if(pos.y < (this.scroll.maxScrollY - 30)){
										
										this.ratings.push({
									    	"username": "新加的数据",
									    	"rateTime": 1469271264000,
									    	"deliveryTime": "",
									    	"score": 4,
									    	"rateType": 0,
									    	"deliveryTime": "",
									    	"text": "新加的数据",
									    	"avatar": "http://xs01.meituan.net/waimai_i/img/default-avatar.c4e0230d.png",
									    	"recommend": [
									        	"新加的数据"
									    	]
									    });
										// 加载更多的评论数据
										// nextTick之后调用数据更新
										this.showLoadingMore = false;
										this.$nextTick(function(){
											this.scroll.stop(); // 加载之后限制回弹的数据
 											this.scroll.refresh();
										});   
									}
								})
							}
							else {
								this.scroll.refresh();
							}
						})
					}
				})
			}
		},
		components: {
			Star
		}
	}
</script>
<style lang="scss" scoped>
	.evaluate_wrapper{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 2.17rem;
		max-width: 640px;
		min-width: 320px;
		margin: 0 auto;
		overflow: hidden;
	}
	.detail_evaluate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.eval,.delivery {
			width: 1.61rem;
			text-align: center;
			span {
				display: block;

			}
			&_count {
				margin-top: .14rem;
				font-size: .24rem;
				color: #f90;
				font-weight: bold;
				line-height: .32rem;
			}
			&_text {
				font-size: .18rem;
				color: #ddd;
				line-height: .22rem;
			}
		}
		.star_wrapper{
			flex: 1;
		}
		.delivery {
			width: 1.75rem;
			margin-top: .14rem;
			border-left: 1px solid #ddd;
			&_count {
				padding: 0;
				margin-top: 0;
				color: #ddd;
			}
		}
	}
	.evaluate_list {
		margin-top: .12rem;
		
		li {
			display: flex;
			margin: 0 .15rem;
			padding: .15rem 0;
			position: relative;
			font-size: .20rem;
			color: #666;
			border-bottom: 1px solid #ddd;
			&:last-of-type {
				border-bottom: none;
			}
		}
		.avator {
			width: .65rem;
			height: .65rem;
			margin-right: .05rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.evaluate_sub {
			font-size: .22rem;
			line-height: .32rem;
		}
		.apper_status {
			display: inline-block;
			line-height: .32rem;
		}
		.evaluate_content {
			padding: .05rem;
			line-height: .3rem;
		}
		.evaluate_time {
			position: absolute;
			top: .15rem;
			right: .15rem;
		}
	}
	.pullup-wrapper {
		text-align: center;
		color: #666;
		padding: .1rem 0;
		font-size: .20rem;
		.fa-spinner {
			margin-right: .05rem;
		}
	}
</style>