<template>
	<div>
		<div class="refrigerator group" v-if="layout[item].freeze || layout[item].temperature || layout[item].differentialpressure">
			<span>{{layout[item].listname}}</span>
			<div class="item">
				<span>制冷</span><span>{{layout[item].freeze}}</span>
			</div>
			<div class="item">
				<span>溫度</span><span>{{layout[item].temperature}} °C</span>
			</div>
			<div class="item">
				<span>微壓差</span><span>{{layout[item].differentialpressure}} pa</span>
			</div>
		</div>
		<div class="pack group" v-if="layout[item].pack">
			<span>{{layout[item].listname}}</span>
			<div class="item">
				<span>啟動</span><span>{{layout[item].pack}}</span>
			</div>
		</div>
		<div class="stock group" v-if="layout[item].inventory">
			<span>{{layout[item].listname}}</span>
			<div class="item">
				<span>庫存量比例</span><span>{{layout[item].inventory}} %</span>
			</div>
			
		</div>
		
	</div>
</template>

<script>
  export default {
    props: ['item', 'layout'],
    template: 'info-box',
  }
</script>