// global variables
const dayjs = require("dayjs");

// const currentYear = dayjs().year();
// const currentMonth = dayjs().month(); //отсчёт от 0
// const currentDay = dayjs().date();

// experiments with comments
//console.log(dayjs().date()); - выдаёт номер дня в месяце (09.01.23 => 9)
// console.log(dayjs().daysInMonth()); - выдаёт количество дней в текущем месяце
// console.log(
// 	currentYear + "-" + currentMonth + "-" + currentDay
// );

// пытаюсь сделать функцию, выдающую 5 дней, при этом "сегодня" находится посередине
// сделать так, чтобы юзер сам мог выбрать день (pSelectedDay)

export function getFiveDays(pSelectedDay) {
	let resultFiveDays = [];
	for (let i = -2; i < 3; i++) {
		let date = new Date();
		resultFiveDays.push(
			date.setDate(pSelectedDay.getDate() + i)
		);
	}
	return resultFiveDays;
}

// export function oldGetFiveDays(pSelectedDay) {
// 	// let resultFiveDays = [];

// 	let today = dayjs().date();
// 	// первый и последний день в очереди (сегодня находится посередине)
// 	let firstDay = 0;
// 	let secondDay = 0;
// 	let forthDay = 0;
// 	let lastDay = 0;

// 	let nextMonth = currentMonth + 1;
// 	let prevMonth = currentMonth - 1;
// 	let nextYear = currentYear + 1;
// 	let prevYear = currentYear - 1;

// 	console.log("currentMonth", currentMonth);

// 	if (currentMonth - 1 === -1) {
// 		prevMonth = 12;
// 	}
// 	if (currentMonth + 1 === 12) {
// 		nextMonth = 1;
// 	}

// 	let nextMonthFullDate = new Date(
// 		currentYear,
// 		nextMonth,
// 		currentDay
// 	);
// 	console.log("nextM", dayjs(nextMonthFullDate).format());
// 	let prevMonthFullDate = new Date(
// 		currentYear,
// 		prevMonth,
// 		currentDay
// 	);
// 	console.log("prevM", dayjs(prevMonthFullDate).format());
// 	// получить дальнее число месяца, вычтенное из сегодняшнего дня (9-2=7)
// 	// проблема: нельзя вычесть из малых чисел - продумать как всё будет залезать на другие месяцы
// 	if (today - 2 <= 0) {
// 		//  узнать сколько дней нужно взять из предыдущего месяца
// 		let subtractedDays = today - 2;
// 		if (subtractedDays === 0) {
// 			firstDay = dayjs().daysInMonth(prevMonthFullDate);
// 			console.log(firstDay);
// 		} else if (subtractedDays === -1) {
// 		} else if (subtractedDays === -2) {
// 		}
// 		firstDay = 0.0;
// 		secondDay = 0.0;
// 	} else {
// 		firstDay = today - 2;
// 		secondDay = today - 1;
// 	}
// 	// >= или > ???
// 	if (today + 2 > dayjs().daysInMonth()) {
// 	} else {
// 		forthDay = today + 1;
// 		lastDay = today + 2;
// 	}

// 	// resultFiveDays = [firstDay, firstDay+1, today]
// 	// return
// }
