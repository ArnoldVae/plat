<template>
	<div class="anti-theft-customization">
		<div class="left-video">
			<ocxVideo :videoConfig="videoConfig"></ocxVideo>
		</div>
		<div class="right-list">
			<ul>
				<template v-for="(item, index) in listData">
					<li :key="index">
						<div class="list-item-left">
							<div :class="{ ddmg: item.ddg, ddmk: item.ddk, mjg: item.mjg, mjk: item.mjk }"></div>
						</div>
						<div class="list-item-right">
							<span>{{ item.equName }}</span>
							<div class="list-item-btn">
								<span v-for="(ite, idx) in item.btnArr" :key="idx" @click="handleClick(item, ite)">
									{{ ite.name }}
								</span>
							</div>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<confirm-modal
			title="提醒"
			text="确认执行该操作？"
			v-model="modalShow"
			@on-ok="handleConfirm"
			@on-cacel="handleCancel"
		></confirm-modal>
		<tool-tip createIframe v-model="tipShow" type="success" title="命令下发成功"></tool-tip>
	</div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import confirmModal from '@/components/native/confirm-modal/confirm-modal.vue'
import toolTip from '@/components/native/confirm-modal/tool-tip.vue'
export default {
	name: 'anti-theft-customization',
	components: { ocxVideo, 'confirm-modal': confirmModal, 'tool-tip': toolTip },
	props: {},
	data() {
		return {
			localDatas: [
				{
					nodeId: '0aff7a09f9874636b80384501a8a010b',
					equId: 'eb41cfb556b8426d92e1d3f2dc0e1744',
					equName: '220KV设备区门禁',
					videoUrl: null,
					nodeName: '关门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '471f59a5f48540ef9cf6edfe55d90cd0',
					equId: 'eb41cfb556b8426d92e1d3f2dc0e1744',
					equName: '220KV设备区门禁',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'eef769ee61ff472d8f072e87310419ce',
					equId: 'eb41cfb556b8426d92e1d3f2dc0e1744',
					equName: '220KV设备区门禁',
					videoUrl: null,
					nodeName: '门状态',
					alarmLevel: 0,
					fvalue: 1,
					valueDesc: '0 关门|1 开门',
					result: '开门',
					linkUrl: null,
					functionId: '1',
					nodeType: '2',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '3e27258e7b024a8b9cf9e74171b7ee74',
					equId: '246ef0ef793247f688958cdefc24c860',
					equName: '35kV场地1号主变汇控柜',
					videoUrl: null,
					nodeName: '关门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '1a49e35ad09b4b80954bfe91d984ba70',
					equId: '246ef0ef793247f688958cdefc24c860',
					equName: '35kV场地1号主变汇控柜',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '19736f8443f54f8fa3dab349dfde299c',
					equId: '33ab80ded43644de977d32bc6e1fbebf',
					equName: '500kV保护室自动柜门',
					videoUrl: null,
					nodeName: '关门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '8ecd7b487b62441fa2696c1cfd8a8794',
					equId: '33ab80ded43644de977d32bc6e1fbebf',
					equName: '500kV保护室自动柜门',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '1dc14d9288124e6a99c3bc6022cbe5fb',
					equId: 'ac5c8bcea9ca406a8c55174248a1a5cc',
					equName: '500KV设备区门禁',
					videoUrl: null,
					nodeName: '关门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'ef3a755fd77f4789af11c7e02fa286a8',
					equId: 'ac5c8bcea9ca406a8c55174248a1a5cc',
					equName: '500KV设备区门禁',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'd4fddaac9053496c9b6e6ae344fce34e',
					equId: 'ac5c8bcea9ca406a8c55174248a1a5cc',
					equName: '500KV设备区门禁',
					videoUrl: null,
					nodeName: '门状态',
					alarmLevel: 0,
					fvalue: 1,
					valueDesc: '0 关门|1 开门',
					result: '开门',
					linkUrl: null,
					functionId: '1',
					nodeType: '2',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '277a65d304194e43a6ffdb240217317c',
					equId: 'cc4990703f834140829ed9772cbcc3b4',
					equName: '主控楼东门厅门',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'fb49124dd08e4e6db22f326534895469',
					equId: 'cc4990703f834140829ed9772cbcc3b4',
					equName: '主控楼东门厅门',
					videoUrl: null,
					nodeName: '门状态',
					alarmLevel: 0,
					fvalue: 1,
					valueDesc: '0 关门|1 开门',
					result: '开门',
					linkUrl: '2|22.46.34.114:37782|admin:admin123|14',
					functionId: '1',
					nodeType: '2',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'faf7e03677d94cb3a7057d246a0c6a1c',
					equId: '24d69d5cdded40c4919d99439950cac1',
					equName: '主控楼西门厅门',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '32b0a38db0cf428fb2df623b12bf4a98',
					equId: '24d69d5cdded40c4919d99439950cac1',
					equName: '主控楼西门厅门',
					videoUrl: null,
					nodeName: '门状态',
					alarmLevel: 0,
					fvalue: 1,
					valueDesc: '0 关门|1 开门',
					result: '开门',
					linkUrl: '2|22.46.34.114:37782|admin:admin123|10',
					functionId: '1',
					nodeType: '2',
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '6a717312a3104708ba51b5adf654fec7',
					equId: 'fdfe9ad30f444ee1a2d7b0bb6df8041c',
					equName: '电动大门',
					videoUrl: null,
					nodeName: '关门布防',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门布防',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: '1',
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '4c0a5c5a101e4b1eba42e72971cb7bb7',
					equId: 'fdfe9ad30f444ee1a2d7b0bb6df8041c',
					equName: '电动大门',
					videoUrl: null,
					nodeName: '关门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 关门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: '1',
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'f0f6548937b84f0398863c010d3f64ae',
					equId: 'fdfe9ad30f444ee1a2d7b0bb6df8041c',
					equName: '电动大门',
					videoUrl: null,
					nodeName: '开门控制',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: '1',
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: 'd0b2903fdbe54724872b77604e1ecde4',
					equId: 'fdfe9ad30f444ee1a2d7b0bb6df8041c',
					equName: '电动大门',
					videoUrl: null,
					nodeName: '开门撤防',
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: '1 开门撤防',
					result: '-',
					linkUrl: null,
					functionId: '2',
					nodeType: '3',
					alarmName: '无报警',
					iParam1: '1',
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: '733c693e823a4217b5024cad463aaea9',
					equId: 'fdfe9ad30f444ee1a2d7b0bb6df8041c',
					equName: '电动大门',
					videoUrl: null,
					nodeName: '门状态',
					alarmLevel: 0,
					fvalue: 1,
					valueDesc: '0 关门|1 开门',
					result: '开门',
					linkUrl: '2|22.46.34.109:37777|admin:sjdsq5|2',
					functionId: '1',
					nodeType: '2',
					alarmName: '无报警',
					iParam1: '1',
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: null,
					equId: 'f5d6ec71c50849ef969b70632d5f528c',
					equName: '电动大门控制器',
					videoUrl: null,
					nodeName: null,
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: null,
					result: null,
					linkUrl: null,
					functionId: null,
					nodeType: null,
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: null,
					equId: 'd477c5eaadcd44b7b44a9c1f4592b5e8',
					equName: '门禁_10',
					videoUrl: null,
					nodeName: null,
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: null,
					result: null,
					linkUrl: null,
					functionId: null,
					nodeType: null,
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: null,
					equId: '5115f5c71888454e98be608af8413c0d',
					equName: '门禁_24',
					videoUrl: null,
					nodeName: null,
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: null,
					result: null,
					linkUrl: null,
					functionId: null,
					nodeType: null,
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: null,
					equId: 'ca67e737a25d445c89eba3c2f16d2d1d',
					equName: '门禁_25',
					videoUrl: null,
					nodeName: null,
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: null,
					result: null,
					linkUrl: null,
					functionId: null,
					nodeType: null,
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				},
				{
					nodeId: null,
					equId: 'b0d841eb9ea34fb899f9f950eb79b634',
					equName: '门禁_9',
					videoUrl: null,
					nodeName: null,
					alarmLevel: 0,
					fvalue: 0,
					valueDesc: null,
					result: null,
					linkUrl: null,
					functionId: null,
					nodeType: null,
					alarmName: '无报警',
					iParam1: null,
					iParam2: null,
					iParam3: null,
					vcUnit: null
				}
			],
			modalShow: false,
			tipShow: false,
			accessData: [],
			listData: [],
			videoConfig: {
				isAutoPlay: false,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				deviceInfo: '',
				hideTool: true
			}
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.gerEqList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		gerEqList() {
			//获取门禁列表
			// console.log(this.localDatas)

			this.accessData = this.localDatas

			//遍历找出所有设备
			let eqpList = []
			this.accessData.map(item => {
				if (!eqpList.includes(item.equId)) {
					eqpList.push(item.equId)
				}
			})
			// console.log(eqpList)

			let doorList = [],
				tempObj = { btnArr: [] }
			let flag = false //用来判断是否有状态节点

			eqpList.map((eqp, index) => {
				tempObj = { btnArr: [] }
				flag = false
				this.accessData.map((node, index) => {
					if (node.equId === eqp) {
						//当前节点为状态节点，则直接绑定在列表上[{"nodeId":"0aff7a09f9874636b80384501a8a010b","equId":"eb41cfb556b8426d92e1d3f2dc0e1744","equName":"220KV设备区门禁","videoUrl":null,"nodeName":"关门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"471f59a5f48540ef9cf6edfe55d90cd0","equId":"eb41cfb556b8426d92e1d3f2dc0e1744","equName":"220KV设备区门禁","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"eef769ee61ff472d8f072e87310419ce","equId":"eb41cfb556b8426d92e1d3f2dc0e1744","equName":"220KV设备区门禁","videoUrl":null,"nodeName":"门状态","alarmLevel":0,"fvalue":1,"valueDesc":"0 关门|1 开门","result":"开门","linkUrl":null,"functionId":"1","nodeType":"2","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"3e27258e7b024a8b9cf9e74171b7ee74","equId":"246ef0ef793247f688958cdefc24c860","equName":"35kV场地1号主变汇控柜","videoUrl":null,"nodeName":"关门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"1a49e35ad09b4b80954bfe91d984ba70","equId":"246ef0ef793247f688958cdefc24c860","equName":"35kV场地1号主变汇控柜","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"19736f8443f54f8fa3dab349dfde299c","equId":"33ab80ded43644de977d32bc6e1fbebf","equName":"500kV保护室自动柜门","videoUrl":null,"nodeName":"关门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"8ecd7b487b62441fa2696c1cfd8a8794","equId":"33ab80ded43644de977d32bc6e1fbebf","equName":"500kV保护室自动柜门","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"1dc14d9288124e6a99c3bc6022cbe5fb","equId":"ac5c8bcea9ca406a8c55174248a1a5cc","equName":"500KV设备区门禁","videoUrl":null,"nodeName":"关门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"ef3a755fd77f4789af11c7e02fa286a8","equId":"ac5c8bcea9ca406a8c55174248a1a5cc","equName":"500KV设备区门禁","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"d4fddaac9053496c9b6e6ae344fce34e","equId":"ac5c8bcea9ca406a8c55174248a1a5cc","equName":"500KV设备区门禁","videoUrl":null,"nodeName":"门状态","alarmLevel":0,"fvalue":1,"valueDesc":"0 关门|1 开门","result":"开门","linkUrl":null,"functionId":"1","nodeType":"2","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"277a65d304194e43a6ffdb240217317c","equId":"cc4990703f834140829ed9772cbcc3b4","equName":"主控楼东门厅门","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"fb49124dd08e4e6db22f326534895469","equId":"cc4990703f834140829ed9772cbcc3b4","equName":"主控楼东门厅门","videoUrl":null,"nodeName":"门状态","alarmLevel":0,"fvalue":1,"valueDesc":"0 关门|1 开门","result":"开门","linkUrl":"2|22.46.34.114:37782|admin:admin123|14","functionId":"1","nodeType":"2","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"faf7e03677d94cb3a7057d246a0c6a1c","equId":"24d69d5cdded40c4919d99439950cac1","equName":"主控楼西门厅门","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"32b0a38db0cf428fb2df623b12bf4a98","equId":"24d69d5cdded40c4919d99439950cac1","equName":"主控楼西门厅门","videoUrl":null,"nodeName":"门状态","alarmLevel":0,"fvalue":1,"valueDesc":"0 关门|1 开门","result":"开门","linkUrl":"2|22.46.34.114:37782|admin:admin123|10","functionId":"1","nodeType":"2","alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"6a717312a3104708ba51b5adf654fec7","equId":"fdfe9ad30f444ee1a2d7b0bb6df8041c","equName":"电动大门","videoUrl":null,"nodeName":"关门布防","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门布防","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":"1","iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"4c0a5c5a101e4b1eba42e72971cb7bb7","equId":"fdfe9ad30f444ee1a2d7b0bb6df8041c","equName":"电动大门","videoUrl":null,"nodeName":"关门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 关门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":"1","iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"f0f6548937b84f0398863c010d3f64ae","equId":"fdfe9ad30f444ee1a2d7b0bb6df8041c","equName":"电动大门","videoUrl":null,"nodeName":"开门控制","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":"1","iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"d0b2903fdbe54724872b77604e1ecde4","equId":"fdfe9ad30f444ee1a2d7b0bb6df8041c","equName":"电动大门","videoUrl":null,"nodeName":"开门撤防","alarmLevel":0,"fvalue":0,"valueDesc":"1 开门撤防","result":"-","linkUrl":null,"functionId":"2","nodeType":"3","alarmName":"无报警","iParam1":"1","iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":"733c693e823a4217b5024cad463aaea9","equId":"fdfe9ad30f444ee1a2d7b0bb6df8041c","equName":"电动大门","videoUrl":null,"nodeName":"门状态","alarmLevel":0,"fvalue":1,"valueDesc":"0 关门|1 开门","result":"开门","linkUrl":"2|22.46.34.109:37777|admin:sjdsq5|2","functionId":"1","nodeType":"2","alarmName":"无报警","iParam1":"1","iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":null,"equId":"f5d6ec71c50849ef969b70632d5f528c","equName":"电动大门控制器","videoUrl":null,"nodeName":null,"alarmLevel":0,"fvalue":0,"valueDesc":null,"result":null,"linkUrl":null,"functionId":null,"nodeType":null,"alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":null,"equId":"d477c5eaadcd44b7b44a9c1f4592b5e8","equName":"门禁_10","videoUrl":null,"nodeName":null,"alarmLevel":0,"fvalue":0,"valueDesc":null,"result":null,"linkUrl":null,"functionId":null,"nodeType":null,"alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":null,"equId":"5115f5c71888454e98be608af8413c0d","equName":"门禁_24","videoUrl":null,"nodeName":null,"alarmLevel":0,"fvalue":0,"valueDesc":null,"result":null,"linkUrl":null,"functionId":null,"nodeType":null,"alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":null,"equId":"ca67e737a25d445c89eba3c2f16d2d1d","equName":"门禁_25","videoUrl":null,"nodeName":null,"alarmLevel":0,"fvalue":0,"valueDesc":null,"result":null,"linkUrl":null,"functionId":null,"nodeType":null,"alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null},{"nodeId":null,"equId":"b0d841eb9ea34fb899f9f950eb79b634","equName":"门禁_9","videoUrl":null,"nodeName":null,"alarmLevel":0,"fvalue":0,"valueDesc":null,"result":null,"linkUrl":null,"functionId":null,"nodeType":null,"alarmName":"无报警","iParam1":null,"iParam2":null,"iParam3":null,"vcUnit":null}]
						tempObj.equName = node.equName
						if (node.functionId === '1') {
							tempObj.nodeid = node.nodeId
							// console.log(node.linkUrl);
							tempObj.linkUrl = node.linkUrl
							flag = true

							//图片和设备状态匹配
							if (node.fvalue == 0 && node.iParam1 == 1) {
								tempObj.ddg = true
							} else if (node.fvalue == 1 && node.iParam1 == 1) {
								tempObj.ddk = true
							} else if (node.fvalue == 0 && node.iParam1 == null) {
								tempObj.mjg = true
							} else if (node.fvalue == 1 && node.iParam1 == null) {
								tempObj.mjk = true
							}
						} else if (node.functionId === '2') {
							//控制节点，则作为生成按钮使用
							if (node.valueDesc) {
								let splitArr = node.valueDesc.split(' ')
								tempObj.btnArr.push({
									controlNodeid: node.nodeId,
									name: splitArr[1],
									value: splitArr[0]
								})
							}
						}
					}

					//遍历完一个设备，保存到数组中
					if (index === this.accessData.length - 1) {
						if (tempObj.btnArr.length > 0) {
							// tempObj.btnArr.sort((function(a,b){
							//   return a.name.length - b.name.length;
							// }));
							flag === false ? (tempObj.mjg = true) : ''
							doorList.push(tempObj)
						}
					}
				})
			})
			this.listData = doorList
		},
		handleClick(item, ite) {
			this.modalShow = true
			console.log(item)
			console.log(ite)
		},
		handleConfirm() {
			console.log('确认')
			this.tipShow = !this.tipShow
		},
		handleCancel() {
			console.log('取消')
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
.anti-theft-customization {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .left-video {
    float: left;
    box-sizing: border-box;
    border: 2px solid #26636c;
    padding: 2px;
    width: 65%;
    height: 100%;
  }

  .right-list {
    float: left;
    box-sizing: border-box;
    border: 2px solid #26636c;
    width: calc(35% - 10px);
    margin-left: 10px;
    height: 100%;
    overflow: auto;

    ul {
      padding-left: 10px;
      padding-top: 10px;

      li {
        float: left;
        list-style: none;
        display: flex;
        width: 48%;
        height: 130px;
        border: 2px solid #26636c;
        margin-bottom: 20px;
        margin-right: 10px;

        .list-item-left {
          width: 25%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #26636c;
          background: url('~@ac/assets/img/anti-theft/boxbg.png');

          > div {
            width: 60%;
            height: 46%;
          }

          .ddmg {
            background: url('~@ac/assets/img/anti-theft/mjddg.png') no-repeat;
            background-size: 100% 100%;
          }

          .ddmk {
            background: url('~@ac/assets/img/anti-theft/mjddk.png') no-repeat;
            background-size: 100% 100%;
          }

          .mjk {
            background: url('~@ac/assets/img/anti-theft/mjk.png') no-repeat;
            background-size: 100% 100%;
          }

          .mjg {
            background: url('~@ac/assets/img/anti-theft/mjg.png') no-repeat;
            background-size: 100% 100%;
          }
        }

        .list-item-right {
          width: 75%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          color: #fff;

          > span {
            font-size: 18px;
          }

          .list-item-btn {
            width: 200px;
            display: flex;
            // flex-direction: column;
            justify-content: space-around;
            flex-wrap: wrap;
            font-size: 18px;
			overflow:auto;

            > span {
              display: inline-block;
			  border-radius: 5px;
              background: #434750;
              padding: 2px 15px;
              color: #0dd6e5;
              margin-bottom: 4px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
