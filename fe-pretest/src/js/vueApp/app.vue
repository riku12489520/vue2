<template>
	<div class="vue-app">
		<!-- <h1>Vue App</h1> -->
		<div class="container">
			<div class="id1">
				<!-- <info-box v-for="item in pcmid1" :key="item" :item="item"></info-box> -->
			</div>
			<div class="right">
				<div class="right-top">
					<div class="id2">
						<info-box v-for="item in pcmid2" :key="item" :item="item"></info-box>
					</div>
					<div class="id3">
						<!-- {{store}} -->
						<info-box v-for="item in pcmid3" :key="item" :item="item"></info-box>
					</div>
				</div>	
				<div class="id4"></div>
			</div>	
		</div>
	</div>
</template>

<script>
import APIURI from '../APIURI'
import configData from '../configData'
import unit from './unitId1.vue'
import DeviceKey from '../DeviceKey'


export default {
	components: {
    "info-box": unit
  },
	data() {
		return {
			pcmid1: [],
			pcmid2: [],
			pcmid3: []
		}
	},
	mounted: function () {
		console.clear();
		console.log(APIURI);
		// console.log(configData);

		const postData = function(configData) {
			return new Promise((resolve, reject) => {
				let pullResults =[];
				let posting =[];
				configData.forEach(data => {
					posting.push(axios({
						method: "post",
						url: APIURI,
						data: data,
					}))
				
				// .then(res => {
				// 		if (typeof(res) === "object") {
				// 			pullResults.push(res.data);
				// 			return(pullResults);
				// 			// resolve(res.data.list[0])
				// 		} /*else {reject("No data");}*/
				// 	}).then( p => console.log(p))
				})
				Promise.all(posting)
					.then(re => {
						re.forEach((e, eIndex) => {
						let keyname = Object.keys(configData[eIndex])[3];
							
						if (DeviceKey.includes(keyname)) {
							configData[eIndex][keyname] = e['data']['list'][0]['data'][0]['Data'];
						}
					})
				})
				// console.log(configData)
				resolve(configData);
		})
	};
	postData(configData)
		.then(t => {
			t.forEach(item => {
				if (item['pcm_id'] == 1){
					this.pcmid1.push(item)
				} else if (item['pcm_id'] == 2){
					this.pcmid2.push(item);
				} else if (item['pcm_id'] == 3) {
					this.pcmid3.push(item);
				}
				
			// console.log(this.pcmid2)
			});
		})
		// const InitPull = function() {
		// 		return new Promise((resolve, reject) => {
		// 	let list = postData(configData);
		// 	let ar =[];
		// 	list.then(req => {ar.push(req); return ar[0]})
		// 	.then(arra => arra.forEach((e, eIndex) => 
		// 					console.log(e)))
				

					
					

				
				// 	.then(res => {
				// 		// console.log(res);
				// 		res.forEach((e, eIndex) => {
				// 			console.log(eIndex);
				// 			let keyname = Object.keys(configData[eIndex])[3];
				// 			console.log(keyname);
				// 			if (DeviceKey.includes(keyname)) {
				// 				configData[eIndex][keyname] = e['data'][0]['Data'];
				// 				resolve(res)
				// 			} else {
				// 				reject('No init')
					// 		}
					// 	})
					// });

				// Promise.all(postData(configData))
				// 	.then(res => console.log(res))


	// InitPull();
	// console.log(pullResults)

		// 	let  requests = idArr.map(axiosData)	// promise array
		// 	// console.log(requests);
		// 	return await Promise.all(requests)
		// 		.then(function(results){
		// 			return results
		// 		})
		// };

		// push results in array
		// function pushData(idArr, pushArr, ls) {
		// 	postData(idArr)
		// 	.then(res => {res.forEach(v => pushArr.push(v))})
		// 	.then(re => ls[0].forEach(e => {
		// 		ls[1] = configData.find(ob => {return ob['dev_id'] == e});
		// 		ls[2] = pushArr.find(o =>{return o['dev_id'] == e})['data'][0];
		// 		let store = [];
		// 		store = ls[3].push(Object.assign(ls[1], ls[2]));	
		// 	}))
		// };
		
	
		// this.dev_id = configData.map(v => v.dev_id);
		// let ls = [this.dev_id, this.res_obj, this.res_dev_obj, this.store];
		// pushData(configData, this.id3Arr, ls);
		// console.log(this.store)

		// this.dev_id.forEach(e => {
		// 		this.res_obj = configData.find(ob => {return ob['dev_id'] == e});
		// 		this.res_dev_obj = this.id3Arr.find(o =>{return o['dev_id'] == e});
		// 		console.log(this.res_dev_obj);
		// 		this.store = Object.assign(this.res_obj ,this.res_dev_obj);
				// console.log(this.store);
		// })

		// // 用 pcmid 分類
		// configData.forEach((e, index, array) => {
		// 	if (e.pcm_id == 1){
		// 		this.arr1 = this.filter(configData, 1);
		// 	} else if (e.pcm_id == 2) {
		// 		this.arr2 = this.filter(configData, 2);
		// 	} else if (e.pcm_id == 3) {
		// 		this.arr3 = this.filter(configData, 3);
		// 	} else {}
		// });

		// let ls1=[], ls2=[], ls3=[]; 
		// let ls = [ls1, ls2, ls3];
		// let arrls = [this.arr1, this.arr2, this.arr3]
		// for (let i=0; i<3; ++i) {
		// 	pushData(arrls[i], ls[i])
		// };
	},
	methods: {

	}
}

</script>  

<style lang="scss">
html, body{
	height: 100%;
	span{
		font-size: 28px;
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
	border: 1px solid rgb(61, 61, 61);
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
	.id1 {
		@extend %box;
		flex: 1 0 33%;
		display: flex;
		flex-direction: column;
		.id1_a, .id1_b{
			@extend %inner-box;
			@extend %term;
		}
	}
	.right{
		flex: 1 0 66%;
		display: flex;
		flex-direction: column;
		.right-top{
			display: flex;
			flex: 1 1 60%;
			flex-wrap: wrap;
			flex-direction: row;
			.id2 {
			@extend %box;
			flex: 1 1 48%;
			}
			.id3 {
				@extend .id2;
				display: flex;
				flex-direction: column;
				.id3_a, .id3_b{
					text-align: center;
					@extend %inner-box;
					@extend %term;
				}
			}
		}
		.id4 {
				@extend %box;
				flex: 1;
				height: 32.4%;
			}
	}
}
</style>