import { createSelector } from '@reduxjs/toolkit';

const selectListeningTrackList = (state) => state.player.isMainListeningTrackList ? state.player.tracks : state.player.collection;
const selectCurrentTrack = (state) => state.player.currentTrack;

export const selectCurrentTrackIndex = createSelector(
	selectListeningTrackList,
	selectCurrentTrack,
	(list, track) => {
		return list.findIndex((t) => t.id === track?.id)
	}
);

export const canPlayPrevTrackSelector = createSelector(
	selectCurrentTrackIndex,
	(i) => i > 0
);

export const canPlayNextTrackSelector = createSelector(
	selectCurrentTrackIndex,
	selectListeningTrackList,
	(i, list) => i < list.length - 1
);
