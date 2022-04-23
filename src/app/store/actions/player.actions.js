export const ADD_TRACK_TO_COLLECTION = 'ADD_TRACK_TO_COLLECTION';
export const REMOVE_TRACK_FROM_COLLECTION = 'REMOVE_TRACK_FROM_COLLECTION';
export const PLAY_TRACK = 'PLAY_TRACK';
export const TOGGLE_PLAYING_TRACK = 'TOGGLE_PLAYING_TRACK';
export const CHANGE_TRACK_CURRENT_TIME = 'CHANGE_TRACK_CURRENT_TIME';
export const SET_LISTENING_TRACK_LIST = 'SET_LISTENING_TRACK_LIST_LINK';
export const SELECT_NEXT_TRACK = 'SELECT_NEXT_TRACK';
export const SELECT_PREV_TRACK = 'SELECT_PREV_TRACK';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const SET_DURATION = 'SET_DURATION';
export const ADD_TRACK = 'ADD_TRACK';
export const CHANGE_TRACK_POSITION = 'CHANGE_TRACK_POSITION';

export const addTrackToCollection = (trackId) => ({
	type: ADD_TRACK_TO_COLLECTION,
	payload: trackId,
});

export const removeTrackFromCollection = (trackId) => ({
	type: REMOVE_TRACK_FROM_COLLECTION,
	payload: trackId,
});

export const playTrack = (trackId) => ({
	type: PLAY_TRACK,
	payload: trackId,
});

export const togglePlayingTrack = () => ({
	type: TOGGLE_PLAYING_TRACK,
});

export const changeTrackCurrentTime = (currentTimeInSeconds) => ({
	type: CHANGE_TRACK_CURRENT_TIME,
	payload: currentTimeInSeconds,
});

export const setListeningTrackList = (isMainPlaylist) => ({
	type: SET_LISTENING_TRACK_LIST,
	payload: isMainPlaylist,
});

export const selectNextTrack = () => ({
	type: SELECT_NEXT_TRACK,
});

export const selectPrevTrack = () => ({
	type: SELECT_PREV_TRACK,
});

export const changeVolume = (volume) => ({
	type: CHANGE_VOLUME,
	payload: volume,
});

export const setDuration = (duration) => ({
	type: SET_DURATION,
	payload: duration,
});

export const addTrack = (track) => ({
	type: ADD_TRACK,
	payload: track,
});

export const changeTrackPosition = (track, isMainPlaylist, isUp) => ({
	type: CHANGE_TRACK_POSITION,
	payload: {
		isMainPlaylist,
		track,
		isUp,
	}
})