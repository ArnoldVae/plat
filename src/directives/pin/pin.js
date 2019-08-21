export default {
	name: 'pin',
	bind(el, binding) {
		// 拿到修饰方向
		let postion = binding.modifiers
		console.log(binding)
		if (binding.value) {
			el.style.position = 'fixed'

			if (postion == {}) {
				for (let key in postion) {
					el.style[key] = '10px'
				}
			} else {
				el.style.top = '50%'
				el.style.transform = 'translateY(-50%)';
				el.style.left = '50%'
				el.style.transform = 'translateX(-50%)';
			}

			if (binding.arg === 'current') {
				el.style.background = '#F14F9A'
			}
		} else {
			el.style.position = 'static'
		}
	}
}
