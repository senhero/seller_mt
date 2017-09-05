<template>
	<div class="header">
		<div class="header_wrapper" @click="showDetail()">
			<div class="imgs">
				<img src="../assets/images/header_img.jpg">
			</div>
			<div class="seller_infos">
				<h3>合记小菜（u味，七宝店）</h3>
				<p><i class="fa fa-bullhorn"></i> 客服电话18930628480。订餐须知：1.请确保您的..</p>
			</div>
			<div class="collection" @click.prevent.stop="collectionSelect()">
				<i class="fa" :class="[collection?'fa-star':'fa-star-o']"></i>
				<span class="col_block">{{collection ?'已收藏':'收藏'}}</span>
			</div>
			<div class="background">
				<img src="../assets/images/header_img.jpg" width="100%" height="100%">
			</div>
		</div>
		<div class="notice_wrapper" @click="showDetail()">
			<div class="notice_scroll">
				<div class="notice_txt">
					<i class="fa fa-icon"></i> 满35减15，满70减30，满一百减40
				</div>
			</div>
			<div class="notice_activity">
				3个活动 <i class="fa fa-angle-right"></i>
			</div>
		</div>
		<!-- 头部弹窗 -->
		<transition name="fade">
			<div class="header_layer_tips" v-show="detailShow">
				<div class="layer_content">
					<div class="layer_top">
						<div class="seller_imgs">
							<img src="../assets/images/header_img.jpg">
						</div>
						<div class="seller_title">
							正新鸡排（七宝老店）
						</div>
						<div class="seller_evaluate">
							<!-- 评分组件 -->
							<star :score='4.2'></star>
							<span>4.8</span>
						</div>
						<div class="delivery">
							<span>起送￥20</span>
							<span>配送￥8（夜间价）</span>
							<span>30分钟</span>
						</div>
						<div class="delivery_time">
							配送时间：09：10-23：20
						</div>
						<div class="line"></div>
					</div>
					<div class="supports">
						<p>
							<i class="fa fa-ico1"></i>
							满25减8；满35减15；满55减25；
						</p>
						<p>
							<i class="fa fa-ico2"></i>
							折扣商品6折起
						</p>
						<p>
							<i class="fa fa-ico3"></i>
							新用户立减14元，首次使用银行卡支付最高再减3元
						</p>
					</div>
				</div>
				<div class="close_btn" @click="detailShow=false">
					<i class="fa fa-close"></i>
				</div>
				<div class="bg">
					<img src="../assets/images/header_img.jpg" width="100%" height="100%">
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mark" v-show="detailShow"></div>
		</transition>
	</div>
</template>
<script>
	import Star from "@/components/Star"
	export default {
		name: "mHeader",
		data(){
			return {
				collection: false,// 收藏
				detailShow: false // 详情页
			}
		},
		methods: {
			getFullData(){
			},
			showDetail(){
				this.detailShow = true;
			},
			collectionSelect(){
				this.collection = !this.collection;
			}
		},
		components: {
			Star
		}
	}
</script>
<style lang="scss">
	.header {
		position: relative;
		background: rgba(135,162,157, 0.5);
		overflow: hidden;
		height: 1.57rem;
		position: relative;
		.header_wrapper {
			height: 1.07rem;
			padding: .15rem 0 .15rem .15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			.imgs {
				width: .68rem;
				height: .68rem;
				img {
					width: 100%;
				}
			}
			// // background-repeat: no-repeat;
			// backdrop-filter: blur(10px);
			.fa {
				color: #fff;
			}
			.seller_infos {
				width: 4.28rem;
				padding: .1rem;
			}
			.seller_infos h3 {
				font-size: .24rem;
			}
			.seller_infos p{
				line-height: .36rem;
				font-size: .18rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis
			}
			.collection {
				width: 1.11rem;
				height: .48rem;
				border-left: 1px solid rgba(255,255,255,.4);
				text-align: center;
				font-size: .24rem;
				vertical-align: top;
				.fa-star {
					color: #fbad15;
				}
				.fa {
					top: -.05rem;
					position: relative;
					font-size: .34rem;
				}
				.col_block {
					line-height: .38rem;
					display: block;
					font-size: .20rem;
				}
			}
			.background {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
	     		filter: blur(10px);
			}
		}

		.notice_wrapper {
			height: .46rem;
			font-size: .18rem;
			margin: 0 .15rem;
			position: relative;
			.notice_txt {
				line-height: .46rem;
				color: #fff;
				border-top: 1px solid rgba(255,255,255,.4);
			}
			.notice_activity {
				color: #fff;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(0,-50%);
			}
		}
		// header_layer_tips
		.header_layer_tips {
			position: fixed;
			top: .31rem;
			left: .31rem;
			right: .31rem;
			bottom: 1.23rem;
			z-index: 80;
			background-color: rgba(135, 162, 157, 0.9);
			.layer_content{
				color: #fff;
				font-size: .20rem;
				padding: .62rem .24rem 0;
				.layer_top {
					text-align: center;
					line-height: .32rem;
				}
				.seller_imgs {
					
				}
				.seller_title {
					font-size: .24rem;
					line-height: .4rem;
				}
				.seller_evaluate {

				}
				.delivery {
					span {
						display: inline-block;
						position: relative;
						padding: 0 .1rem;
						&:last-of-type {
							&:after {
								display: none;
							}
						}
						&:after {
							content:'';
							display: block;
							width:1px; 
							height: 80%;
							position: absolute;
							right: 0;
							top: 50%;
							transform: translate(0,-50%);
							background-color: rgba(255,255,255,.6);
						}
					}
				}
				.line {
					margin: .28rem 0;
					height: 1px;
					background-color: rgba(255,255,255,.6);
				}
				.supports {
					p {
						line-height: .38rem;
					}
					.fa {
						width: .24rem;
						height: .23rem;
						vertical-align: middle;
						background-size: cover;
						position: relative;
						top: -.04rem;
					}
					.fa-ico1 {
						background-image: url(../assets/images/ico1.png);
					}
					.fa-ico2 {
						background-image: url(../assets/images/ico2.png);
					}
					.fa-ico3 {
						background-image: url(../assets/images/ico3.png);
					}
				}
			}
			.close_btn {
				position: fixed;
				bottom: .3rem;
				left: 50%;
				width: .6rem;
				height: .6rem;
				text-align: center;
				line-height: .6rem;
				border: 1px solid rgba(255,255,255,.8);
				border-radius: 50%;
				background-color: rgba(255,255,255,.3);
				transform: translate(-50%, 0);
				.fa {
					font-size: .3rem;
					color: #fff;
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
				}
			}
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				filter: blur(200px);
				z-index: -1;
			}
		}
		.mark {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.8);
			backdrop-filte: blur(10px);
			z-index: 79;
		}
		.fade-enter-active,.fade-leave-active {
			transition: opacity .1s;
		}
		.fade-enter,.fade-leave-to {
			opacity: 0;
		}
	}
</style>
