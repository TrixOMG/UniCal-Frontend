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
		resultFiveDays.push(date.setDate(pSelectedDay.getDate() + i));
	}
	return resultFiveDays;
}

export function getMonth(month = dayjs().month()) {
	month = Math.floor(month);
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

	let currentMonthCount = 0 - firstDayOfTheMonth;

	const daysMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});
	// console.log(daysMatrix);
	return daysMatrix;
}

//
//
//

// export function getUsersTimespan(pTimespan = getFiveDays(dayjs().date())) {
// 	let daysMatrix = null;

// 	const year = dayjs().year();
// 	const month = dayjs().month();
// 	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

// 	const timespanLength = pTimespan.length();

// 	if (timespanLength <= 7) {
// 		// one row
// 		daysMatrix = new Array(timespanLength).fill(pTimespan);
// 	} else if (timespanLength > 7 && timespanLength <= 14) {
// 		// two rows
// 		daysMatrix = new Array(2).fill([]).map(() => {
// 			return new Array(7); // continue here
// 		});
// 	} else if (timespanLength > 14 && timespanLength <= 21) {
// 		// three rows
// 	} else if (timespanLength > 21 && timespanLength <= 28) {
// 		// four rows
// 	} else if (timespanLength > 28) {
// 		// five rows
// 		let currentMonthCount = 0 - firstDayOfTheMonth;

// 		daysMatrix = new Array(5).fill([]).map(() => {
// 			return new Array(7).fill(null).map(() => {
// 				currentMonthCount++;
// 				return dayjs(new Date(year, month, currentMonthCount));
// 			});
// 		});
// 		// console.log(daysMatrix);
// 	}

// 	return daysMatrix;
// }

export function getProperSelectedDays(pSelDaysArray) {
	// запомнить здесь первый день и возвращать массив в том порядке, в каком выбрал пользователь
	// то есть он может быть и в обратном порядке(не в хронологическом), т.к. сейчас нам это не важно
	// при этом выбранный пользователем день будет всегда первым в массиве

	let firstDayOfTheArray = pSelDaysArray[0];

	let setOfDays = new Set(pSelDaysArray);
	// console.log(setOfDays);
	let daysArray = [...setOfDays];

	// let sortedDays = [...setOfDays].sort((a, b) => {
	// return dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
	// });

	// let firstDay = sortedDays[0];
	let lastDay = daysArray[daysArray.length - 1];
	// промежуток между первым и последним днём, нужнен для определения скольки дней возвращать
	let timespanLength = firstDayOfTheArray.isBefore(lastDay)
		? lastDay.diff(firstDayOfTheArray, "day") + 1
		: firstDayOfTheArray.diff(lastDay, "day") + 1;
	// console.log(timespanLength);
	let daysMatrix = [];

	let index = -1;

	if (timespanLength <= 7) {
		daysMatrix = Array(timespanLength)
			.fill([])
			.map(() => {
				index++;
				if (firstDayOfTheArray.isBefore(lastDay)) {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() + index
						)
					);
				} else {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() - index
						)
					);
				}
			});
	} else if (timespanLength > 7 && timespanLength <= 14) {
		//TODO: dopisat
		daysMatrix = Array(14)
			.fill([])
			.map(() => {
				index++;
				if (firstDayOfTheArray.isBefore(lastDay)) {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() + index
						)
					);
				} else {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() - index
						)
					);
				}
			});
	} else if (timespanLength > 14 && timespanLength <= 21) {
		//TODO: dopisat
		daysMatrix = Array(21)
			.fill([])
			.map(() => {
				index++;
				if (firstDayOfTheArray.isBefore(lastDay)) {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() + index
						)
					);
				} else {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() - index
						)
					);
				}
			});
	} else if (timespanLength > 21 && timespanLength <= 28) {
		//TODO: dopisat
		daysMatrix = Array(28)
			.fill([])
			.map(() => {
				index++;
				if (firstDayOfTheArray.isBefore(lastDay)) {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() + index
						)
					);
				} else {
					return dayjs(
						new Date(
							firstDayOfTheArray.year(),
							firstDayOfTheArray.month(),
							firstDayOfTheArray.date() - index
						)
					);
				}
			});
	} else if (timespanLength > 28) {
		//TODO: dopisat
	}

	// console.log(daysMatrix);
	return daysMatrix;
}
//
//
//

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
