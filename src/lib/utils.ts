export function dateToString(date: Date | undefined) {
	return date
		? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
		: "";
}
