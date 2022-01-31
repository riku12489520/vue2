<template>
	<div>
		<div class="id1" v-if="item.freeze">
			<span>制冷</span><span>{{item.freeze}}</span>
			<span>溫度</span><span>{{item.temperature}} °C</span>
			<span>微壓差</span><span>{{item.differentialpressure}} pa</span>
		</div>
		<div class="id2" v-if="item.pack">
			<span>啟動</span><span>{{item.pack}}</span>
		</div>
		<div class="id3" v-if="item.inventory">
			<span>庫存量比例</span><span>{{item.inventory}} %</span>
		</div>
		
	</div>
</template>

<script>
  export default {
    props: ['item'],
    template: 'info-box',
  }
</script>