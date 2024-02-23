export default function useIcon(string) {
	const stringArray = string.split(" ");
	return stringArray.length > 1 ? stringArray[0][0] + stringArray[1][0] : stringArray[0].slice(0, 2);
}
