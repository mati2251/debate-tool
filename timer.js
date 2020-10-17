document.getElementById("title").innerText = localStorage.getItem("idea")
const time = document.getElementsByTagName("time")[0];
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
	if(((minutes*60 + seconds) * 1000) === parseInt(localStorage.getItem("blockTime"))){
		document.getElementsByTagName("body")[0].style.backgroundColor = "#ffd278"
	}
	else if(((minutes*60 + seconds) * 1000) === parseInt(localStorage.getItem("time"))){
		document.getElementsByTagName("body")[0].style.backgroundColor = "#ff695e"
	}
	time.innerText = `${minutes  > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
}

let t;

const startHandler = () => {
	t = setInterval(add, 1000);
	document.getElementById("start").disabled = true
	document.getElementById("stop").disabled = false
	document.getElementById("clear").innerText = "Wyczyść"
}

const stopHandler = () => {
	clearInterval(t)
	document.getElementById("stop").disabled = true
	document.getElementById("start").disabled = false
	document.getElementById("clear").innerText = "Nastepna Osoba"
}

const clearHandler = () => {
	document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
	stopHandler()
	document.getElementsByTagName("time")[0].innerText = "00:00"
}
