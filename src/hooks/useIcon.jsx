export default function useIcon(string) {
	// todo need to handle edge-case for emojis; either filter them out or set only the emoji as icon. study how emojis are encoded (eg.: \uD83E)
	const stringArray = string.split(" ");
	return stringArray.length > 1 ? stringArray[0][0] + stringArray[1][0] : stringArray[0].slice(0, 2);
}
