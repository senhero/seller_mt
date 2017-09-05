<template>
	<span class="star">
		<i class="fa" :class="itemClass" v-for="itemClass in itemClasses"></i>
	</span>
</template>
<script>
	const COUNT = 5;
	const CLAS_ON = "fa-star on"; // 全星状态
	const CLAS_HALF = "fa-star-half half"; // 半星的状态
	const CLAS_OFF = 'fa-star off';
	export default {
		name: "star",
		props: {
			score:{
				type:Number
			}
		},
		computed: {
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				let half = score % 1 !== 0;
				let interger = Math.floor(score);
				for(let i = 0; i < interger; i++){
					result.push(CLAS_ON);
				} 
				if(half) {
					result.push(CLAS_HALF);
				}
				while(result.length < COUNT){
					result.push(CLAS_OFF);
				}
				return result;
			}
		}
	}
</script>
<style lang="scss">
	.star {
		display: inline-block;
		.fa {
			color: #ddd;
			margin-right: .05rem;
		}
		.on{
			color: #ffd161;
		}
		.fa-star-half.half{
			color: #ffd161;
		}
		.off {
			color: #ddd;
		}
	}
</style>