console.log(window.module)
console.log(window)

const peopleConfigList = (event) => {
	const howManyAgree = parseInt(document.getElementById("howManyPeopleAgree").value)
	const howManyDisagree = parseInt(document.getElementById("howManyPeopleDisagree").value)
	let html = "";
	let howMany = howManyDisagree;
	if (howManyAgree > howManyDisagree) {
		howMany = howManyAgree
	}
	for (let i = 1; i <= howMany; i++) {
		html += `<div class="row">`
		html += ` <div class="six columns">`
		if (howManyAgree >= i) {
			html += `<label for="name-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('name-dis-${i}').focus()">`
		} else {
			html += `<label style="visibility: hidden">Imie osoby nr. ${i}</label>`
		}
		html += `</div>`
		html += ` <div class="six columns">`
		if (howManyDisagree > i) {
			html += `<label for="name-dis-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-dis-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('name-${i + 1}').focus()">`
		} else if (howManyDisagree === i) {
			html += `<label for="name-dis-${i}">Imie osoby nr. ${i}</label>
                		<input class="u-full-width" type="text" placeholder="Imie" id="name-dis-${i}"
                		onkeydown="if (event.keyCode === 13) document.getElementById('submit').focus()">`
		} else {
			html += `<label style="visibility: hidden">Imie osoby nr. ${i}</label>`
		}
		html += `</div>`
		html += `</div>`
	}
	document.getElementById("peopleNameConfig").innerHTML = html
}

const buttonHandler = () => {
	const idea = document.getElementById("idea")
	const howManyPeopelAgree = document.getElementById("howManyPeopleAgree")
	const howManyPeopelDisagree = document.getElementById("howManyPeopleDisagree")
	const time = document.getElementById("time")
	const blockTime = document.getElementById("blockTime")
	if (isNaN(howManyPeopelAgree.value) || parseInt(howManyPeopelAgree.value) < 0 || parseInt(howManyPeopelDisagree.value) < 0 || isNaN(time.valueAsNumber) || time.valueAsNumber < blockTime.valueAsNumber) {
		document.getElementById("warring").style.display = "block"
	} else {
		document.getElementById("warring").style.display = "none"
		window.location.assign("file://timer.html")
	}
}

peopleConfigList()
