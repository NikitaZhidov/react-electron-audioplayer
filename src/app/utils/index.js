export const fromSecondsToFormattedTime = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;

	return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
};

export const fromFileToBlobSrc = (file) => {
	return new Promise((res, rej) => {
		const reader = new FileReader();

		try {
			reader.onload = () => {
				res(reader.result);
			};

			reader.readAsDataURL(file);
		} catch (e) {
			rej(e);
		}
	});
};

export const isAudioType = (file) => {
	return file.type.includes('audio');
};
