const { session } = require('electron')

const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
.then(() => {
	// success
}, (error) => {
	console.error(error)
})

const peopleConfigList = (event) => {
	const howManyAgree = parseInt(document.getElementById("howManyPeopleAgree").value)
	const howManyDisagree = parseInt(document.getElementById("howManyPeopleDisagree").value)
	let html = "";
	let howMany = howManyDisagree;
	if(howManyAgree > howManyDisagree){
		howMany = howManyAgree
	}
	for (let i=1; i<=howMany; i++){
		html += `<div class="row">`
		html += ` <div class="six columns">`
		if(howManyAgree >= i){
			html += `<label for="name-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('name-dis-${i}').focus()">`
		}
		else {
			html += `<label style="visibility: hidden">Imie osoby nr. ${i}</label>`
		}
		html += `</div>`
		html += ` <div class="six columns">`
		if(howManyDisagree > i){
			html += `<label for="name-dis-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-dis-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('name-${i+1}').focus()">`
		}
		else if(howManyDisagree === i) {
			html += `<label for="name-dis-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-dis-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('submit').focus()">`
		}
		else {
			html += `<label style="visibility: hidden">Imie osoby nr. ${i}</label>`
		}
		html += `</div>`
		html += `</div>`
	}
	document.getElementById("peopleNameConfig").innerHTML = html
}

window.configuration = {
	name: "imie"
}

document.cookie = "imie=lol"

peopleConfigList()
