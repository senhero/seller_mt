<template>
	<div class="seller_detail" ref="seller_detail">
		<loading v-if="loading"></loading>
		<div class="wrapper">
			<div class="seller_location">
				<h3><i class="fa fa-location-arrow"></i>上海闵行区漕宝路3457号汇宝广场5楼 <a href=""><i class="fa fa-phone"></i></a></h3>
				<div class="scroll_pic" ref="scroll_pic">
					<ul>
						<li><img src="../assets/images/scroll1.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll2.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll3.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll1.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll1.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll2.png" height="122" width="163"></li>
						<li><img src="../assets/images/scroll3.png" height="122" width="163"></li>
					</ul>
				</div>
				<div class="food_safety">
					<i class="fa fa-star"></i>查看食品安全档案
					<i class="fa fa-angle-right"></i>
				</div>
			</div>
			<div class="delivery">
				<div class="item">
					<i class="fa fa-bookmark-o"></i>
					配送服务：<span>美团专送</span> 提供高品质送餐服务
				</div>
				<div class="item">
					<i class="fa fa-clock-o"></i>
					配送时间：10：00 - 21：00
				</div>
			</div>
			<div class="tel_wrapper">
				<div class="item">
					<i class="fa fa-phone-square"></i>
					客服电话18945214578
				</div>
				<div class="item">
					<span><i class="fa fa-check-square-o"></i>商家服务</span>、
					<span><i class="fa fa-html5"></i>可开发票</span>
				</div>
				<div class="supports"><p><i class="fa fa-ico1"></i>
						满25减8；满35减15；满55减25；
					</p> <p><i class="fa fa-ico2"></i>
						折扣商品6折起
					</p> <p><i class="fa fa-ico3"></i>
						新用户立减14元，首次使用银行卡支付最高再减3元
					</p>
				</div>
			</div>
			<div class="report_seller">
				<h5><a href="javascript:;">举报商家作弊领红包<i class="fa fa-angle-right"></i></a> 举报商家</h5>
			</div>
		</div>
	</div>
</template>
<script>
	import iScroll from 'better-scroll'
	export default {
		name:"Seller",
		data(){
			return {
				loading: false
			}
		},
		mounted(){

			this.$nextTick(()=>{
				// 加载数据
				this._fetchData();
				if(!this.scroll){
					this.scroll = new iScroll(this.$refs.seller_detail,{
						click: true,
						probeType: 1
					})
				}
				else {
					this.scroll.refresh();
				}
			});
			
			this.sellerPic();
		},
		watch:{
			'$route':'_fetchData'
		},
		methods: {
			_fetchData(){
				this.loading = true;
				this.post = null;
				
				setTimeout(()=>{
					this.loading = false;
				}, 2000);

			},
			sellerPic(){
				var remFontSize = document.documentElement.clientHeight / 6.4;
				var oUl = document.querySelector(".scroll_pic ul");
				var aLi = document.querySelectorAll(".scroll_pic li");
				oUl.style.width = aLi.length * (aLi[0].offsetWidth + 0.12*remFontSize) - 2*0.12*remFontSize + 'px';

				if(!this.scrollPic){
					this.scrollPic = new iScroll(this.$refs.scroll_pic,{
						click: true,
						probeType: 3,
						scrollX: true
					})
				}
				else {
					this.scrollPic.refresh();
				}
			}
		}
	}
</script>
<style lang="scss" scope>
	.seller_detail {
		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    top: 2.19rem;
	    max-width: 640px;
	    min-width: 320px;
	    margin: 0 auto;
	    overflow: hidden;
		font-size: .22rem;
		.seller_location {
			background-color: #fff;
			h3 {
				margin: 0 0 .12rem .22rem;
				position: relative;
				height: .86rem;
				line-height: .86rem;
				border-bottom: 1px solid rgba(210, 214, 217, 0.5);
				color: #373737;
			}
			.fa {
				margin-right: .05rem;
			}
			.fa-location-arrow {
				color: #ddd;
			}
			.fa-phone {
				position: absolute;
				top: 50%;
				right: .2rem;
				transform: translate(0,-50%);
			}
			.scroll_pic {
				width: 6.17rem;
				height: 1.22rem;
				margin: 0 0 .12rem .22rem;
				overflow: hidden;
				ul {
					height: 100%;
				}
				li {
					float: left;
					width: 1.63rem;
					margin-right: .12rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.food_safety {
				margin: 0 0 .12rem .22rem;
				position: relative;
				line-height: .72rem;
				border-top: 1px solid rgba(210, 214, 217, 0.5);
				.fa-angle-right {
					position: absolute;
					top: 50%;
					right: .2rem;
					transform: translate(0,-50%);
				}
			}
		}
		.delivery {
			background-color: #fff;
			.item {
				margin-left: .23rem;
				line-height: .72rem;
				border-bottom: 1px solid rgba(210, 214, 217, 0.5);
				&:last-of-type {
					border-bottom: none;
				}
			}
		}
		.tel_wrapper {
			background-color: #fff;
			margin-top: .12rem;
			.fa {
				margin-right: .05rem;
			}
			.item {
				margin: 0 0 0 .22rem;
				line-height: .72rem;
				border-bottom: 1px solid rgba(210, 214, 217, 0.5);
				&:last-of-type {
					border-bottom: none;
				}
			}
			.supports {
				margin: .12rem 0 .12rem .22rem;
				padding-bottom: .12rem;
				p {
					line-height: .38rem;
					font-size: .22rem;
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
		.report_seller {
			margin-top: .12rem;
			line-height: .72rem;
			background-color: #fff;
			h5 {
				margin: 0 0 .12rem .22rem;
				position: relative;
				a {
					float: right;
					color: red;
					margin-right: .22rem;
				}
				.fa-angle-right {
					color: #333;
					margin-left: .05rem;	
				}
			}
		}
	}	
	
</style>