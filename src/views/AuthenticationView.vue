<template>
	<div>
		<div class="static-content">
			<p>Welcome to SpareSti! <br>Application to make your wallet happier. <br>Free to use, money back guarantee.</p>
		</div>
		<div class="dynamic-content">
			<router-view class="dynamic-content"></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.static-content {
	font-size: 1.5rem;
	text-align: center;
	margin-top: 2rem;
	color: #000;
}
</style>
