import {
	ADD_TRACK,
	ADD_TRACK_TO_COLLECTION,
	CHANGE_TRACK_CURRENT_TIME,
	CHANGE_TRACK_POSITION,
	CHANGE_VOLUME,
	PLAY_TRACK,
	REMOVE_TRACK_FROM_COLLECTION,
	SELECT_NEXT_TRACK,
	SELECT_PREV_TRACK,
	SET_DURATION,
	SET_LISTENING_TRACK_LIST,
	TOGGLE_PLAYING_TRACK,
} from '../actions/player.actions';

export const createTrack = (
	src,
	title,
	artist = '',
	imgSrc = 'https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE'
) => ({
	src,
	title,
	artist,
	imgSrc,
});

export const initialState = {
	tracks: [
		{
			id: 0,
			src: require('../../../mock/Cattle.mp3'),
			imgSrc:
				'https://foodtank.com/wp-content/uploads/2020/04/COVID-19-Relief_Small-Farms-.jpg',
			title: 'Cattle',
			artist: 'YouTube Music Library',
		},
		{
			id: 1,
			src: require('../../../mock/Sunshine.mp3'),
			imgSrc:
				'https://media-cdn.tripadvisor.com/media/photo-s/21/3f/62/f8/sunshine-hotel-zanzibar.jpg',
			title: 'Sunshine',
			artist: 'YouTube Music Library',
		},
		{
			id: 2,
			src: require('../../../mock/Thunder.mp3'),
			imgSrc:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfI_Veh9YtTzh5h_1NZh-HS-Y-e50LBnNsg&usqp=CAU',
			title: 'Thunder',
			artist: 'YouTube Music Library',
		},
	],
	collection: [],
	isMainListeningTrackList: false,
	currentTrack: null,
	currentTrackState: {
		volume: 0.01,
		currentTimeInSeconds: 0,
		isPlaying: false,
		duration: 0,
	},
};

const getNewStateAfterChangeTrack = (state, selectedNext = true) => {
	const listeningTrackList = state.isMainListeningTrackList ? state.tracks : state.collection;

	const currentTrackIndex = listeningTrackList.findIndex(
		(t) => t.id === state.currentTrack?.id
	);

	const prevTrackIndex = currentTrackIndex === 0 ? 0 : currentTrackIndex - 1;

	const nextTrackIndex =
		currentTrackIndex === listeningTrackList.length - 1
			? currentTrackIndex
			: currentTrackIndex + 1;

	const newTrackIndex = selectedNext ? nextTrackIndex : prevTrackIndex;

	if (currentTrackIndex === newTrackIndex) return state;

	return {
		...state,
		currentTrack: {
			...listeningTrackList[newTrackIndex],
		},
		currentTrackState: {
			...state.currentTrackState,
			currentTimeInSeconds: 0,
			isPlaying: true,
		},
	};
};

const exchangeArrayElementPositions = (arr, from, to) => {
	const newArr = [...arr];
	const temp = newArr[from];
	newArr[from] = newArr[to];
	newArr[to] = temp;
	return newArr;
};

export const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TRACK_TO_COLLECTION:
			return {
				...state,
				collection: [
					...state.collection,
					state.tracks.find((t) => t.id === action.payload),
				],
			};
		case REMOVE_TRACK_FROM_COLLECTION:
			return {
				...state,
				collection: state.collection.filter((t) => t.id !== action.payload),
			};
		case PLAY_TRACK:
			return {
				...state,
				currentTrack: {
					...state.tracks.find((t) => t.id === action.payload),
				},
				currentTrackState: {
					...state.currentTrackState,
					currentTimeInSeconds: 0,
					isPlaying: true,
				},
			};
		case TOGGLE_PLAYING_TRACK:
			return {
				...state,
				currentTrack: {
					...state.currentTrack,
				},
				currentTrackState: {
					...state.currentTrackState,
					isPlaying: !state.currentTrackState.isPlaying,
				},
			};
		case CHANGE_TRACK_CURRENT_TIME:
			return {
				...state,
				currentTrackState: {
					...state.currentTrackState,
					currentTimeInSeconds: action.payload,
				},
			};
		case SET_LISTENING_TRACK_LIST:
			return {
				...state,
				isMainListeningTrackList: action.payload,
			};
		case SELECT_PREV_TRACK:
			return getNewStateAfterChangeTrack(state, false);
		case SELECT_NEXT_TRACK:
			return getNewStateAfterChangeTrack(state);
		case SET_DURATION:
			return {
				...state,
				currentTrackState: {
					...state.currentTrackState,
					duration: action.payload,
				},
			};
		case CHANGE_VOLUME:
			return {
				...state,
				currentTrackState: {
					...state.currentTrackState,
					volume: action.payload,
				},
			};
		case ADD_TRACK:
			return {
				...state,
				tracks: [
					...state.tracks,
					{ ...action.payload, id: state.tracks.length },
				],
			};
		case CHANGE_TRACK_POSITION:
			if (action.payload.isMainPlaylist) {
				const trackIndex = state.tracks.findIndex(t => t.id === action.payload.track.id);
				const newTrackIndex = action.payload.isUp ? trackIndex - 1 : trackIndex + 1;

				if (newTrackIndex < 0 || newTrackIndex >= state.tracks.length) return state;

				return {
					...state,
					tracks: exchangeArrayElementPositions(state.tracks, trackIndex, newTrackIndex),
				};
			} else {
				const trackIndex = state.collection.findIndex(t => t.id === action.payload.track.id);
				const newTrackIndex = action.payload.isUp ? trackIndex - 1 : trackIndex + 1;

				if (newTrackIndex < 0 || newTrackIndex >= state.collection.length) return state;

				return {
					...state,
					collection: exchangeArrayElementPositions(state.collection, trackIndex, newTrackIndex),
				};
			}
		default:
			return state;
	}
};
