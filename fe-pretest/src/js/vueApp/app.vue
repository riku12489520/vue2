<template>
	<div class="vue-app">
		<!-- <h1>Vue App</h1> -->
		<div class="container">
			<div class="pcmid1">
				{{realtimelist['refrigeratorA']}}
				<info-box v-for="item in ['refrigeratorA','refrigeratorB']" :key="item" :item="item" :layout="layout"></info-box>
			</div>
			<div class="right">
				<div class="right-top">
					<div class="pcmid2">
						<info-box v-for="item in ['packA']" :key="item" :item="item" :layout="layout"></info-box>
					</div>
					<div class="pcmid3">
						<info-box v-for="item in ['stock1', 'stock2']" :key="item" :item="item" :layout="layout"></info-box>
					</div>
				</div>	
				<div class="pcmid4"></div>
			</div>	
		</div>
	</div>
</template>

<script>
import APIURI from '../APIURI'
import portData from '../portData'
import unit from './unitId1.vue'
import DeviceKey from '../DeviceKey'
import store from '../store'

const postData = function(portData) {
				return new Promise((resolve) => {
					let posting =[];
					portData.forEach(data => {
						let list = axios({
							method: "post",
							url: APIURI,
							data: data,
							timeout: 5 * 1000,
						});
						posting.push(list)
					})
					resolve(posting)
				})
		}

		const classdData = function(item) {
			return new Promise(async function (resolve, reject) {
				let list = await postData(portData);
					Promise.all(list).then(re => {
						let storelayout = store;
						let layoutItem = storelayout[item];
						let keyname = Object.keys(layoutItem);
						re.forEach(e => {
							keyname.forEach(keye => {
								if (layoutItem[keye] == e['data']['list'][0]['dev_id']){
									layoutItem[keye] = e['data']['list'][0]['data'][0]['Data'];
								}
							})
						});	
						if (layoutItem['pack'] == "0") {
							layoutItem['pack'] ="Off"
						} else if (layoutItem['pack'] == "1") {
							layoutItem['pack'] ="On"}
						if (layoutItem['freeze'] == "0") {
								layoutItem['freeze'] = "Off"
						} else if (layoutItem['freeze'] == "1") {
							layoutItem['freeze'] = "On"}
						
						resolve(storelayout);
					}).catch(error => reject(error))
			})
		}

export default {
	components: {
    "info-box": unit
  },
	data: function() {
		return {
			layout: {},
			realtimelist: {},
		}
	},
	beforeMount: function(){
		this.layout = store;
		this.realtimelist = "";
		let names = Object.keys(store);

		names.forEach(n => classdData(n));
		
	},
	mounted: function() {
		console.clear();
		console.log(APIURI);
		console.log(this.layout["refrigeratorA"])
		
		
		
	},
	methods: {

	}
}

</script>  

<style lang="scss">
html, body{
	height: 100%;
	span{
		font-size: 30px;
	}
}
.vue-app {
	height: 100%;
	width: 100%;
	h1 {
		display: inline-block;
		color: teal;
		border: 1px solid teal;
		padding: 0.3em 0.5em;
		background: orange;
	}
}
%box {
	border-radius: 20px;
	background: #3399ff;
	margin: 5px;
	padding: 5px;
	box-sizing: border-box;
}
%inner-box{
	flex: 1;
	margin: 2.5px;
	padding: 5px;
	border-radius: 20px;
	background: #9ed8e2;
}
%item{
	padding: 10px;
	margin: 10px;
	background: #fff;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
}
%term{
	text-align: center;
	img{
		height: 20%;
		text-align: center;
		margin-bottom: 10px;
		}
	h2{
		font-size: 2rem;
		margin-bottom: 10px;
	}
	.item{
		@extend %item;
	}
}
.container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	.pcmid1 {
		@extend %box;
		flex: 1 0 33%;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		.group {
		@extend %inner-box;
		@extend %term;
	}
	}
	
	.right {
		flex: 1 0 66%;
		display: flex;
		flex-direction: column;
		.right-top{
			display: flex;
			flex: 1 1 60%;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}	
	.pcmid2 {
	@extend %box;
	flex: 1 1 48%;
		.group {
		@extend %inner-box;
		@extend %term;
	}
	}
	.pcmid3 {
		@extend .pcmid2;
		display: flex;
		flex-direction: column;
	}
}
.pcmid4 {
		@extend %box;
		flex: 1;
		height: 32.4%;
	}

</style>