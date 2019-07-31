// import draggable from './module/draggable'
// import clipboard from './module/clipboard'

const directives = {
	// draggable,
	// clipboard
}
export const center = {
	bind(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	},
	inserted(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	},
	update(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	}
}

export default directives
