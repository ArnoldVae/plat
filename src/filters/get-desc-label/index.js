import getDescLabel from './get-desc-label'

getDescLabel.install = Vue => {
	Vue.directive('getDescLabel', getDescLabel)
}

export default getDescLabel