console.log('Its working')

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('default')
}else{
	setTheme(theme)
}

// let themeDots = document.getElementsByClassName('theme-dot')


// for (var i=0; themeDots.length > i; i++){
// 	themeDots[i].addEventListener('click', function(){
// 		let mode = this.dataset.mode
// 		console.log('Option clicked:', mode)
// 		setTheme(mode)
// 	})
// }
function setTheme(mode) {
	this.currentTheme = mode; // Update the current theme
	const style = this.document.createElement('link');
	style.id = 'theme-style'
	style.rel = 'stylesheet'
	style.href= './default.css'
	document.head.appendChild(style); 
	// Update the stylesheet link
	const stylesheet = document.getElementById('theme-style');
	if (stylesheet) {
		stylesheet.href = `@/assets/${mode}.css`;
	} else {
		console.log("The 'theme-style' link element was not found in the DOM." + stylesheet);
	}

	// Save theme to localStorage
	localStorage.setItem('theme', mode);
}
export {setTheme}