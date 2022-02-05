<template>
	<div class="group">
		<div class="listname" v-if="layout[item].listname">
			<h2>{{layout[item].listname}}</h2>
		</div>
		<div class="item" v-if="layout[item].freeze">
			<span>制冷</span><span>{{layout[item].freeze}}</span>
		</div>
		<div class="item" v-if="layout[item].temperature">
			<span>溫度</span>
			<span v-if="layout[item].temperature == 'Loading'">{{layout[item].temperature}}</span>
			<span v-else>{{layout[item].temperature}} °C</span>
		</div>
		<div class="item" v-if="layout[item].differentialpressure">
			<span>微壓差</span>
			<span v-if="layout[item].differentialpressure == 'Loading'">{{layout[item].differentialpressure}}</span>
			<span v-else>{{layout[item].differentialpressure}} pa</span>
		</div>
		<div class="pack item" v-if="layout[item].pack">
				<span>啟動</span><span>{{layout[item].pack}}</span>
		</div>
		<div class="stock item" v-if="layout[item].inventory">
				<span>庫存量比例</span>
				<span v-if="layout[item].inventory == 'Loading'">{{layout[item].inventory}}</span>
				<span v-else>{{layout[item].inventory}} %</span>	
		</div>
		
	</div>
</template>

<script>
  export default {
    props: ['item', 'layout'],
    template: 'info-box',
  }
</script>