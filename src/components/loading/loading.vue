<template>
	<div id="loadingWrap">
		<div></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"loading"
	}
</script>
<style lang="scss">

	@-webkit-keyframes test {
		0% { background-position:0px -0%; }
		100% { background-position:0px -300%; }
	}
	@keyframes test {
		0% { background-position:0px -0%; }
		100% { background-position:0px -300%; }
	}
	#loadingWrap {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		background-color: #fff;
		z-index: 5;
	}
	#loadingWrap {
		div {
		  height: 1.425rem;
		  width: 1.05rem;
		  animation: test 400ms steps(3) infinite;
		  background: url(./images/mt_loading.png);
		  background-size: cover;
		  position: absolute;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%,-50%);
		} 
	}

</style>