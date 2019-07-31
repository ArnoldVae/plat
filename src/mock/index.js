// 通过axios-mock-adapter生成代理api地址
/*import {service} from '@/api/service'
import MockAdapter from 'axios-mock-adapter'*/
// import {requestLogin} from '@/api/api'
/*import { users } from './data/user'
import { declarations, amendments } from './data/declaration'
import { seaHouseManifest } from './data/seaHouseManifest'
import { seaMasterManifests, seaMasterAmends } from './data/seaMasterManifest'*/

export default {
	init() {
		let mock = new MockAdapter(service)

		// login 模拟登录接口
		mock.onPost('/user/login').reply(config => {
			// 解析axios传过来的数据
			let { username, password, userRole } = config.params
			return new Promise((resolve, reject) => {
				// 先创建一个用户为空对象
				let user = null
				setTimeout(() => {
					// 判断模拟的假数据中是否有和传过来的数据匹配的
					let hasUser = users.some(person => {
						// 如果存在这样的数据
						if (
							person.basicForm.organisation_name === username &&
							person.password === password &&
							person.userRole.includes(userRole)
						) {
							user = JSON.parse(JSON.stringify(person))
							user.password = undefined
							user.token = person.token
							return true
						} else {
							//  如果没有这个person
							return false
						}
					})
					// 如果有那么一个人
					if (hasUser) {
						resolve([200, { code: 200, msg: 'Login success!', user }])
					} else {
						//  如果没有那么一个人
						resolve([
							200,
							{ code: 500, msg: 'Please enter the correct username or password or check the user type!' }
						])
					}
				}, 500)
			})
		})

		mock.onGet('/user/info').reply(config => {
			return new Promise((resolve, reject) => {
				const { token } = config.params
				let user = null
				// 先创建一个用户为空对象
				setTimeout(() => {
					// 判断模拟的假数据中是否有和传过来的数据匹配的
					let hasUser = users.some(person => {
						// 如果存在这样的数据
						if (person.token === token) {
							user = JSON.parse(JSON.stringify(person))
							user.password = undefined
							return true
						} else {
							return false
						}
					})
					// 如果有那么一个人
					if (hasUser) {
						resolve([200, { code: 200, msg: 'Get user info success!', user }])
					} else {
						//  如果没有那么一个人
						resolve([500, { code: 500, msg: 'Get info failed!' }])
					}
				}, 500)
			})
		})
		//  模拟注册接口
		mock.onPost('/user/register').reply(config => {
			let {
				token,
				userRole,
				basicForm,
				contactPersonForm,
				regAuthorForm,
				regAddressForm,
				userTable,
				attachTable
			} = config.params
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					let hasUser = users.some(person => {
						// 如果已经存在该用户
						if (person.basicForm.organisation_name === basicForm.organisation_name) {
							return true
						} else {
							//  如果不存在该用户
							return false
						}
					})
					if (hasUser) {
						resolve([200, { code: 500, msg: 'User Already Exist!' }])
					} else {
						//  如果不存在该用户，注册该用户
						users.push({
							token: token,
							userRole: userRole,
							basicForm: basicForm,
							contactPersonForm: contactPersonForm,
							regAuthorForm: regAuthorForm,
							regAddressForm: regAddressForm,
							userTable: userTable,
							attachTable: attachTable,
							password: '123456'
						})
						resolve([200, { code: 200, msg: 'Create Successful!' }])
					}
				}, 500)
			})
		})
		// Mock Logout
		mock.onPost('/user/logout').reply(config => {
			let token = config.params
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					let hasUser = users.some(person => {
						if (person.token === token) {
							// use token filter
							return true
						} else {
							return false
						}
					})
					if (hasUser) {
						resolve([200, { code: 200, msg: 'LogOut Successful!' }])
					} else {
					}
				}, 500)
			})
		})
		// mock submit cargo declaration new draft
		mock.onPost('/cargoDeclaration/submit').reply(config => {
			let {
				attachments,
				basicForm,
				commodities,
				declarationNo,
				invoiceTable,
				partiesTable,
				shipmentForm,
				traderRegimeInfo,
				transForm,
				transInfo
			} = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let declarationIndex = declarations.findIndex(declaration => {
						return declaration.declarationNo === declarationNo
					})
					if (declarationIndex >= 0) {
						declarations.splice(declarationIndex, 1, {
							attachments: attachments,
							basicForm: basicForm,
							commodities: commodities,
							declarationNo: declarationNo,
							invoiceTable: invoiceTable,
							partiesTable: partiesTable,
							shipmentForm: shipmentForm,
							traderRegimeInfo: traderRegimeInfo,
							transForm: transForm,
							transInfo: transInfo,
							status: 1
						})
					} else {
						declarations.push({
							attachments: attachments,
							basicForm: basicForm,
							commodities: commodities,
							declarationNo: declarationNo,
							invoiceTable: invoiceTable,
							partiesTable: partiesTable,
							shipmentForm: shipmentForm,
							traderRegimeInfo: traderRegimeInfo,
							transForm: transForm,
							transInfo: transInfo,
							status: 1
						})
					}
					resolve([200, { code: 200, msg: 'Declaration Submit Successful!' }])
				}, 500)
			})
		})
		// mock save cargo declaration new draft
		mock.onPost('/cargoDeclaration/save').reply(config => {
			let {
				attachments,
				basicForm,
				commodities,
				declarationNo,
				invoiceTable,
				partiesTable,
				shipmentForm,
				traderRegimeInfo,
				transForm,
				transInfo
			} = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let declarationIndex = declarations.findIndex(declaration => {
						return declaration.declarationNo === declarationNo
					})
					if (declarationIndex >= 0) {
						declarations.splice(declarationIndex, 1, {
							attachments: attachments,
							basicForm: basicForm,
							commodities: commodities,
							declarationNo: declarationNo,
							invoiceTable: invoiceTable,
							partiesTable: partiesTable,
							shipmentForm: shipmentForm,
							traderRegimeInfo: traderRegimeInfo,
							transForm: transForm,
							transInfo: transInfo,
							status: 1
						})
					} else {
						declarations.push({
							attachments: attachments,
							basicForm: basicForm,
							commodities: commodities,
							declarationNo: declarationNo,
							invoiceTable: invoiceTable,
							partiesTable: partiesTable,
							shipmentForm: shipmentForm,
							traderRegimeInfo: traderRegimeInfo,
							transForm: transForm,
							transInfo: transInfo,
							status: 1
						})
					}
					resolve([200, { code: 200, msg: 'Declaration Save Successful!' }])
				}, 500)
			})
		})
		// mock get declarations request
		mock.onGet('/declarations').reply(config => {
			return new Promise(resolve => {
				setTimeout(() => {
					let data = []
					let { status, declarationNo } = config.params
					if (declarationNo !== '') {
						data = declarations.filter(declaration => {
							if (declaration.declarationNo === declarationNo && declaration.status === status) {
								return declaration
							}
						})
					} else {
						let tmpData = declarations.filter(declaration => {
							if (declaration.status === status) {
								return declaration
							}
						})
						for (let index in tmpData) {
							data[index] = {}
							data[index].declaration_no = tmpData[index].declarationNo
							data[index].trader_regime_type = tmpData[index].basicForm['trader-regime'][1]
							data[index].transport_mode = tmpData[index].transForm['transport-mode']
							data[index].ucr = tmpData[index].traderRegimeInfo['ucr']
						}
					}
					resolve([200, { code: 200, data: data }])
				}, 200)
			})
		})
		// mock delete declarations request
		mock.onPost('/declaration/del').reply(config => {
			return new Promise(resolve => {
				// get this line record declarationNo
				setTimeout(() => {
					let declarationNo = config.params
					let declarationIndex = declarations.findIndex(declaration => {
						return declaration.declarationNo === declarationNo
					})
					if (declarationIndex >= 0) {
						declarations.splice(declarationIndex, 1)
						resolve([200, { code: 200, msg: 'Record delete success' }])
					}
				}, 200)
			})
		})

		// mock post amendment
		mock.onPost('/amendment/submit').reply(config => {
			let { basicForm, declarationNo, transForm, requireAmendForm, submitInfo, status } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					amendments.push({
						basicForm: basicForm,
						declarationNo: declarationNo,
						transForm: transForm,
						requireAmendForm: requireAmendForm,
						submitInfo: submitInfo,
						status: status
					})
					console.log(amendments)
					resolve([200, { code: 200, msg: 'Submit Amendment Application Successful!' }])
				}, 500)
			})
		})
		// mock get request for amendment
		mock.onGet('/amendment').reply(config => {
			let { declarationNo } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let data = []
					if (declarationNo !== '') {
						if (declarationNo === -1) {
							data = amendments[amendments.length - 1]
						} else {
							data = amendments.filter(amendment => {
								if (amendment.declarationNo === declarationNo) {
									return amendment
								}
							})
						}
					} else {
						let tmpData = amendments.filter(amendment => {
							if (amendment.status === 2) {
								return amendment
							}
						})
						for (let index in tmpData) {
							data[index] = {}
							data[index].declaration_no = tmpData[index].declarationNo
							data[index].unique_consig_ref = tmpData[index].transForm.ucr
							data[index].trader_regime = tmpData[index].basicForm['trader-regime']
							data[index].transport_mode = tmpData[index].basicForm
						}
					}
					resolve([200, { code: 200, data: data }])
				}, 500)
			})
		})
		// mock submit & save request for house manifest
		mock.onPost('/seaHouseManifest/submit').reply(config => {
			let { manifestNo, basicForm, bills, status } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let houseIndex = seaHouseManifest.findIndex(houseManifest => {
						return houseManifest.manifestNo === manifestNo
					})
					if (houseIndex >= 0) {
						seaHouseManifest.splice(houseIndex, 1, {
							manifestNo: manifestNo,
							basicForm: basicForm,
							bills: bills,
							status: status
						})
					} else {
						seaHouseManifest.push({
							manifestNo: manifestNo,
							basicForm: basicForm,
							bills: bills,
							status: status
						})
					}
					resolve([200, { code: 200, msg: 'Success!' }])
				}, 500)
			})
		})
		// mock get sea house manifest request
		mock.onGet('/seaHouseManifests').reply(config => {
			return new Promise(resolve => {
				setTimeout(() => {
					let data = []
					let { status, manifestNo } = config.params
					if (manifestNo !== '') {
						data = seaHouseManifest.filter(manifest => {
							if (manifest.manifestNo === manifestNo && manifest.status === status) {
								return manifest
							}
						})
					} else {
						let tmpData = seaHouseManifest.filter(manifest => {
							if (manifest.status === status) {
								return manifest
							}
						})
						for (let index in tmpData) {
							data[index] = {}
							data[index].manifest_no = tmpData[index].manifestNo
							data[index].rotation_no = tmpData[index].basicForm.rotation_no
							data[index].vessel_name = tmpData[index].basicForm.vessel_name
							data[index].voyage_no = tmpData[index].basicForm.voyage_no
							if (status === 2) {
								data[index].customs_office = tmpData[index].basicForm.customs_office
							}
						}
					}
					resolve([200, { code: 200, data: data }])
				}, 500)
			})
		})
		// mock delete request for house manifest submission
		mock.onPost('/seaHouseManifest/del').reply(config => {
			return new Promise(resolve => {
				setTimeout(() => {
					let { status, manifestNo } = config.params
					let manifestIndex = seaHouseManifest.findIndex(manifest => {
						return manifest.manifestNo === manifestNo && manifest.status === status
					})
					if (manifestIndex >= 0) {
						seaHouseManifest.splice(manifestIndex, 1)
						resolve([200, { code: 200, msg: 'Record delete success' }])
					}
				}, 500)
			})
		})
		// mock declaration approve or reject actions
		mock.onPost('/declaration/update').reply(config => {
			return new Promise(resolve => {
				// get this line record declarationNo
				setTimeout(() => {
					let declarationNo = config.params
					let declarationIndex = declarations.findIndex(declaration => {
						return declaration.declarationNo === declarationNo
					})
					if (declarationIndex >= 0) {
						declarations[declarationIndex].status = 1
						resolve([200, { code: 200, msg: 'Update success' }])
					}
				}, 200)
			})
		})
		// mock get sea master manifest request
		mock.onGet('/seaMasterManifests').reply(config => {
			return new Promise(resolve => {
				setTimeout(() => {
					let data = []
					let { status, manifestNo } = config.params
					if (manifestNo !== '') {
						data = seaMasterManifests.filter(manifest => {
							if (manifest.manifestNo === manifestNo && manifest.status === status) {
								return manifest
							}
						})
					} else {
						// let tmpData = seaMasterManifest.filter(manifest => {
						//   if (manifest.status === status) {
						//     return manifest
						//   }
						// })
						// for (let index in tmpData) {
						//   data[index] = {}
						//   data[index].manifest_no = tmpData[index].manifestNo
						//   data[index].rotation_no = tmpData[index].basicForm.rotation_no
						//   data[index].vessel_name = tmpData[index].basicForm.vessel_name
						//   data[index].voyage_no = tmpData[index].basicForm.voyage_no
						//   if (status === 2) {
						//     data[index].customs_office = tmpData[index].basicForm.customs_office
						//   }
						// }
					}
					resolve([200, { code: 200, data: data }])
				}, 500)
			})
		})
		// mock submit sea master manifest request
		mock.onPost('/seaMasterManifest/submit').reply(config => {
			let { manifestNo, basicForm, masterBills } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let seaMasterManIndex = seaMasterManifests.findIndex(seaMasterMan => {
						return seaMasterMan.manifestNo === manifestNo
					})
					if (seaMasterManIndex >= 0) {
						seaMasterManifests.splice(seaMasterManIndex, 1, {
							manifestNo: manifestNo,
							basicForm: basicForm,
							masterBills: masterBills,
							status: 1
						})
					} else {
						seaMasterManifests.push({
							manifestNo: manifestNo,
							basicForm: basicForm,
							masterBills: masterBills,
							status: 1
						})
					}
					resolve([200, { code: 200, msg: 'Sea Master Manifest Submit Successful!' }])
				}, 500)
			})
		})
		// mock save sea master manifest request
		mock.onPost('/seaMasterManifest/save').reply(config => {
			let { manifestNo, basicForm, masterBills } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let seaMasterManIndex = seaMasterManifests.findIndex(seaMasterMan => {
						return seaMasterMan.manifestNo === manifestNo
					})
					if (seaMasterManIndex >= 0) {
						seaMasterManifests.splice(seaMasterManIndex, 1, {
							manifestNo: manifestNo,
							basicForm: basicForm,
							masterBills: masterBills,
							status: 1
						})
					} else {
						seaMasterManifests.push({
							manifestNo: manifestNo,
							basicForm: basicForm,
							masterBills: masterBills,
							status: 1
						})
					}
					resolve([200, { code: 200, msg: 'Sea Master Manifest Save Successful!' }])
				}, 500)
			})
		})
		// mock submit sea master amendment request
		mock.onPost('/seaMasterAmend/submit').reply(config => {
			let { amendNo, basicForm, requireAmendForm, reasonAmendForm, attachDocForm, attachData } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let seaMasterAmendIndex = seaMasterAmends.findIndex(amend => {
						return amend.amendNo === amendNo
					})
					if (seaMasterAmendIndex >= 0) {
						seaMasterAmends.splice(seaMasterAmendIndex, 1, {
							amendNo: amendNo,
							basicForm: basicForm,
							requireAmendForm: requireAmendForm,
							reasonAmendForm: reasonAmendForm,
							attachDocForm: attachDocForm,
							attachData: attachData
						})
					} else {
						seaMasterAmends.push({
							amendNo: amendNo,
							basicForm: basicForm,
							requireAmendForm: requireAmendForm,
							reasonAmendForm: reasonAmendForm,
							attachDocForm: attachDocForm,
							attachData: attachData
						})
					}
					resolve([200, { code: 200, msg: 'Amendment Application Submit Successful!' }])
				}, 500)
			})
		})
		// mock save sea master amendment request
		mock.onPost('/seaMasterAmend/save').reply(config => {
			let { amendNo, basicForm, requireAmendForm, reasonAmendForm, attachDocForm, attachData } = config.params
			return new Promise(resolve => {
				setTimeout(() => {
					let seaMasterAmendIndex = seaMasterAmends.findIndex(amend => {
						return amend.amendNo === amendNo
					})
					if (seaMasterAmendIndex >= 0) {
						seaMasterAmends.splice(seaMasterAmendIndex, 1, {
							amendNo: amendNo,
							basicForm: basicForm,
							requireAmendForm: requireAmendForm,
							reasonAmendForm: reasonAmendForm,
							attachDocForm: attachDocForm,
							attachData: attachData
						})
					} else {
						seaMasterAmends.push({
							amendNo: amendNo,
							basicForm: basicForm,
							requireAmendForm: requireAmendForm,
							reasonAmendForm: reasonAmendForm,
							attachDocForm: attachDocForm,
							attachData: attachData
						})
					}
					resolve([200, { code: 200, msg: 'Amendment Application Save Successful!' }])
				}, 500)
			})
		})
		// mock get sea master amendment request
		mock.onGet('/seaMasterAmends').reply(config => {
			return new Promise(resolve => {
				setTimeout(() => {
					let data = []
					let { status, amendNo } = config.params
					if (amendNo !== '') {
						data = seaMasterAmends.filter(amend => {
							if (amend.amendNo === amendNo && amend.status === status) {
								return amend
							}
						})
					} else {
						// let tmpData = seaMasterManifest.filter(manifest => {
						//   if (manifest.status === status) {
						//     return manifest
						//   }
						// })
						// for (let index in tmpData) {
						//   data[index] = {}
						//   data[index].manifest_no = tmpData[index].manifestNo
						//   data[index].rotation_no = tmpData[index].basicForm.rotation_no
						//   data[index].vessel_name = tmpData[index].basicForm.vessel_name
						//   data[index].voyage_no = tmpData[index].basicForm.voyage_no
						//   if (status === 2) {
						//     data[index].customs_office = tmpData[index].basicForm.customs_office
						//   }
						// }
					}
					resolve([200, { code: 200, data: data }])
				}, 500)
			})
		})
		mock.onAny().passThrough()
	}
}
