<template>
	<div class="vue-app">
		<!-- <h1>Vue App</h1> -->
		<div class="container">
			<div class="id1">
				<div class="id1_a">
					<img src="https://icon-library.com/images/freeze-icon/freeze-icon-6.jpg" alt="freeze">
					<h2>冰箱A</h2>
						<!-- <span>制冷: {{resultArr[0]}}</span>
						<span>冷凍庫溫度: {{resultArr[1]}} ℃</span>
						<span>微壓差: {{resultArr[2]}} pa</span> -->
					<div class="item temp">
					<span>制冷</span><span>{{resultArr[1]}}</span>
					</div>
					<div class="item item2"><span>冷凍庫溫度</span><span>{{resultArr[2]}} ℃</span></div>
					<div class="item item3"><span>微壓差</span><span>{{resultArr[3]}} pa</span></div>
					
				</div>
				<div class="id1_b">
					<img src="https://icon-library.com/images/freeze-icon/freeze-icon-6.jpg" alt="freeze">
					<h2>冰箱B</h2>
					<!-- <span>制冷: {{resultArr[3]}}</span>
						<span>冷凍庫溫度: {{resultArr[4]}} ℃</span>
						<span>微壓差: {{resultArr[5]}} pa</span> -->
					<div class="item temp">
						<span>制冷</span><span>{{resultArr[3]}}</span>
					</div>
					<div class="item item2"><span>冷凍庫溫度</span><span>{{resultArr[4]}} ℃</span></div>
					<div class="item item3"><span>微壓差</span><span>{{resultArr[5]}} pa</span></div>
				</div>
			</div>
			<div class="right">
				<div class="right-top">
					<div class="id2">
						<h2>包裝A線</h2>
						<p>{{resultArr[6]}}</p>
					</div>
					<div class="id3">
						<div class="id3_a">
							<h2>倉庫A區</h2>
							<div class="item stock">
								<span>庫存量比例</span>
								<span>{{resultArr[6]}}%</span>
							</div>
						</div>
						<div class="id3_b">
							<h2>倉庫B區</h2>
							<div class="item stock">
								<span>庫存量比例</span>
								<span>{{resultArr[6]}}%</span>
							</div>
						</div>
					</div>
				</div>	
				<div class="id4"></div>
			</div>	
		</div>
	</div>
</template>

<script>
import APIURI from '../APIURI'
import json from '../portData'
import portData from '../portData'

export default {
	data() {
		return {
			pcmId: "",
			devId: "",
			dataArr: [],
			resultArr : []
		}
	},
	mounted: function () {
		console.log(APIURI);
		// console.log(portData);
		let getdata = () => {
			for (let i=0; i<portData.length; i++) {
				this.devId = portData[i].dev_id;
				this.pcmId = portData[i].pcm_id;
				this.dataArr.push({"pcm_id":this.pcmId, "dev_id": this.devId});	
			};
			let lis = Array.from(this.dataArr);
			// console.log(lis);
			let promises = [];
			for (let i=0; i<lis.length; i++) {
				console.log(lis[i]);
				promises.push(
					axios({
					method:	"POST",
					url: APIURI,
					data: lis[i],
					})
						.then( res => {
							this.resultArr.push(res.data.list[0].data[0].Data)
							// console.log(res.data.list[0].data[0].Data)
						})
						.catch( error => {console.log(error)})
				)
			}
			axios.all(promises).then(() => console.log(this.resultArr));
		};
		getdata();
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