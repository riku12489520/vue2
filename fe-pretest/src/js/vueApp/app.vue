<template>
	<div class="vue-app">
		<!-- <h1>Vue App</h1> -->
		<div class="container">
			<div class="pcmid1">
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
				<div class="pcmid4">
					<!-- {{this.realtimelist}} -->
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import APIURI from '../APIURI'
import postConfigData from '../postConfigData'
import unit from './unitId1.vue'
import DeviceKey from '../DeviceKey'
import board from '../board'

const postData = function(postConfigData) {
	return new Promise((resolve, reject) => {
		let posting =[];
		postConfigData.forEach(data => {
			let p = axios({
				method: "post",
				url: APIURI,
				data: data,
				timeout: 5 * 1000,
			})
			.catch(err => reject(err))
			posting.push(p);
		})
		resolve(posting)
	})
}

const getLayoutData = function(items) {
	return new Promise(async function (resolve, reject) {
		let list = await postData(postConfigData);
			Promise.all(list).then(re => {
				let boardlayout = Object.assign({}, board);
				items.forEach(item => {
					let keynames = Object.keys(boardlayout[item]);
					re.forEach(e => {
						keynames.forEach(key => {
							if (board[item][key] == e['data']['list'][0]['dev_id']) {
								// console.log(key+ '=' + board[item][key] + ', config val=' +  e['data']['list'][0]['dev_id'])
								boardlayout[item] = {...boardlayout[item], [key]:e['data']['list'][0]['data'][0]['Data']}
							}
							if (key == 'pack' || 'freeze') {
								let listname = boardlayout[item];
								if (listname[key] == "0") {
									listname[key] ="Off"
								} else if (listname[key ] == "1") {
									listname[key] ="On"};
							}
						})
					})
				})
					// console.log(boardlayout);
					// console.log(board);
				resolve(boardlayout);
			}).catch(error => reject(error))	
	})
}

const checkdata = function(layout, defaultVal = 'Loading') {
		Object.keys(layout).forEach(storekey => {	// storekey = 'packA'
			const itemtable = layout[storekey];
			Object.keys(itemtable).forEach(key => {	// key = 'pack'
				const vaildkey = [].concat(DeviceKey);
				if (vaildkey.includes(key)) {
					const deviceid = itemtable[key];
					if (deviceid.includes('dev_')) {
						layout[storekey] = { ...layout[storekey], [key]:defaultVal}
					}
				}
			})
		})
	return layout
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
		this.layout = Object.assign({}, board);
		this.realtimelist = checkdata(this.layout, 'Loading');
		
	},
	mounted: function() {
		console.clear();
		console.log(APIURI);
		// console.log(this.realtimelist['refrigeratorB']);
		let names = Object.keys(board);
		getLayoutData(names)
			.then(res => {
				this.layout = Object.assign({}, res)
			})
		
		setInterval(() => {    
			getLayoutData(names).then(res => {this.layout = Object.assign({}, res)})
		}, 5 * 1000); 
	},
	methods: {
		
	}
}

</script>  

<style lang="scss">
html, body {
	height: 100%;
	span {
		font-size: 36px;
	}
}
// .vue-app {
// 	height: 100%;
// 	width: 100%;
// 	h1 {
// 		display: inline-block;
// 		color: teal;
// 		border: 1px solid teal;
// 		padding: 0.3em 0.5em;
// 		background: orange;
// 	}
// }
%box {
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 20px;
	// background: #3399ff;
	padding: 5px;
	box-sizing: border-box;
}
%inner-box {
	flex: 1;
	margin: 2.5px;
	margin-bottom: 15px;
	padding: 5px;
	border-radius: 20px;
	background: #9ed8e2;
}
%term{
	text-align: center;
	img {
		height: 20%;
		text-align: center;
		margin-bottom: 10px;
	}
	h2 {
		font-size: 3rem;
		margin-bottom: 10px;
		padding: 0.75rem;
	}
	.listname {
		margin: 1.5rem;
		text-align: center;
	}
	.item {
		padding: 1.75rem;
		margin: 1rem;
		background: #fff;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
	}
}
.container {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	.group {
		@extend %inner-box;
		@extend %term;
	}
}	
.pcmid1 {
	@extend %box;
	flex: 1 0 33%;
}
.right {
	flex: 1 0 66%;
	display: flex;
	flex-direction: column;
	.right-top {
		display: flex;
		flex: 1 1 60%;
		flex-wrap: wrap;
		flex-direction: row;
		.pcmid2 {
			@extend %box;
			flex: 1 1 48%;
		}
		.pcmid3 {
			@extend %box;
			flex: 1 1 48%;
		}
	}
}	
.pcmid4 {
	@extend %box;
	border: 1px solid #9ed8e2;
	margin: 0 5px;
	flex: 1;
	height: 32.4%;
}
</style>
