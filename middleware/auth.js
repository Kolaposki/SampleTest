export default function ({ store, redirect, route }) {
	// If the user is not authenticated
	let navEl = document.querySelector('#mainbar');
	let toggler = document.querySelector('[data-nav-toggler]');
	if(navEl != undefined && toggler != undefined) {
		navEl.classList.remove('is-active');
		toggler.classList.remove('is-clicked');
	}

	let checkout = document.getElementsByName('checkout');

	if(checkout != undefined && checkout[0] != undefined) {
		checkout[0].setAttribute('style',
			'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
		document.body.style.overflow = '';
	}

	if ((localStorage.getItem('token') == null || localStorage.getItem('token') == undefined || localStorage.getItem('token') == '' || localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == 'null') && (route.path != '/' && !route.path.includes('/forgot-password'))) {
		return redirect('/')
	}
}