document.getElementById("title").innerText = localStorage.getItem("idea")
const time = document.getElementsByTagName("time")[0];
let actualPerson = 1
let agreePersonActive = true
let nextPerson = true
const add = () => {
	const tmp = time.innerText.split(":")
	let seconds, minutes
	if (parseInt(tmp[1]) === 59) {
		minutes = parseInt(tmp[0]) + 1
		seconds = 0
	} else {
		seconds = parseInt(tmp[1]) + 1
		minutes = parseInt(tmp[0])
	}
	if (((minutes * 60 + seconds) * 1000) === parseInt(localStorage.getItem("blockTime"))) {
		document.getElementsByTagName("body")[0].style.backgroundColor = "#ffd278"
	} else if (((minutes * 60 + seconds) * 1000) === parseInt(localStorage.getItem("time"))) {
		document.getElementsByTagName("body")[0].style.backgroundColor = "#ff695e"
	}
	time.innerText = `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
}

let t;

const startHandler = () => {
	t = setInterval(add, 1000);
	document.getElementById("start").disabled = true
	document.getElementById("stop").disabled = false
	document.getElementById("clear").innerText = "Wyczyść"
	nextPerson = false
}

const stopHandler = () => {
	clearInterval(t)
	document.getElementById("stop").disabled = true
	document.getElementById("start").disabled = false
	document.getElementById("clear").innerText = "NASTĘPNA OSOBA"
	nextPerson = true
}

const clearHandler = () => {
	document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
	document.getElementsByTagName("time")[0].innerText = "00:00"
	if (nextPerson) {
		if (agreePersonActive) {
			agreePersonActive = !agreePersonActive;
			const table = document.getElementById(`agree-table-${actualPerson-1}`)
			if(table !== null){
				table.scrollIntoView()
			}
		} else {
			actualPerson++;
			agreePersonActive = !agreePersonActive;
			const table = document.getElementById(`disagree-table-${actualPerson-1}`)
			if(table !== null){
				table.scrollIntoView()
			}
		}
		drawTables()
	}
	stopHandler()
}

const drawTables = () => {
	const howManyPeopleAgree = localStorage.getItem("peopleAgree")
	const tables = document.getElementById("tables-agree")
	tables.innerHTML = ""
	for (let i = 1; i <= parseInt(howManyPeopleAgree); i++) {
		let name = localStorage.getItem(`name-${i}`)
		if (name === null) {
			name = ""
		}
		if (actualPerson === i && agreePersonActive) {
			tables.innerHTML += `<div class="table-row"><div class="table table-active" id="agree-table-${i}"><section></section></div> <h4>${name}</h4></div>`
		} else if (actualPerson >= i) {
			tables.innerHTML += `<div class="table-row"><div class="table-close" id="agree-table-${i}"></div> <h4>${name}</h4></div>`
		} else {
			tables.innerHTML += `<div class="table-row"><div class="table" id="agree-table-${i}"> </div> <h4>${name}</h4> </div>`
		}

	}

	const howManyPeopleDisagree = localStorage.getItem("peopleAgree")
	const tablesDis = document.getElementById("tables-disagree")
	tablesDis.innerHTML = ""
	for (let i = 1; i <= parseInt(howManyPeopleDisagree); i++) {
		let name = localStorage.getItem(`name-dis-${i}`)
		if (name === null) {
			name = ""
		}
		if (actualPerson === i && !agreePersonActive) {
			tablesDis.innerHTML += `<div class="table-row"><div class="table table-active" id="disagree-table-${i}"><section></section></div><h4>${name}</h4></div>`
		} else if (actualPerson > i) {
			tablesDis.innerHTML += `<div class="table-row"><div class="table-close" id="disagree-table-${i}"></div><h4>${name}</h4></div>`
		} else {
			tablesDis.innerHTML += `<div class="table-row"><div class="table" id="disagree-table-${i}"></div> <h4>${name}</h4></div>`
		}

	}
}

drawTables()
