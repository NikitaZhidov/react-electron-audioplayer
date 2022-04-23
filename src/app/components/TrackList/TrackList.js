import {
	CaretDownOutlined,
	CaretUpOutlined,
	HeartFilled,
	HeartOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addTrackToCollection,
	playTrack,
	removeTrackFromCollection,
	setListeningTrackList,
	togglePlayingTrack,
} from '../../store/actions/player.actions';
import { AudioShortInfo } from '../../ui';
import './TrackList.css';

export const TrackList = ({
	tracks,
	onUpTrackPosition,
	onDownTrackPosition,
	isMainPlaylist,
}) => {
	const dispatch = useDispatch();

	const onClickAdd = (event, track) => {
		event.stopPropagation();
		dispatch(addTrackToCollection(track.id));
	};

	const onClickRemove = (event, track) => {
		event.stopPropagation();
		dispatch(removeTrackFromCollection(track.id));
	};

	const onClick = (track) => {
		if (currentTrack?.id !== track.id) {
			dispatch(setListeningTrackList(isMainPlaylist));
			dispatch(playTrack(track.id));
		} else {
			dispatch(togglePlayingTrack());
		}
	};

	const onUpTrack = (e, track) => {
		e.stopPropagation();
		onUpTrackPosition(track);
	};

	const onDownTrack = (e, track) => {
		e.stopPropagation();
		onDownTrackPosition(track);
	};

	const collection = useSelector((state) => state.player.collection);
	const currentTrack = useSelector((state) => state.player.currentTrack);
	const currentTrackState = useSelector(
		(state) => state.player.currentTrackState
	);

	const trackInCollection = (track) => {
		return collection.some((t) => t.id === track.id);
	};

	return (
		<div className="tracklist-wrapper">
			{tracks.map((t, i) => {
				return (
					<div
						key={`${t.title}_${i}`}
						className="track"
						onClick={() => onClick(t)}
					>
						<AudioShortInfo
							className={'audio-short-info'}
							onClickPlayButton={() => dispatch(togglePlayingTrack())}
							active={t.id === currentTrack?.id}
							showHoverPlay={t.id !== currentTrack?.id}
							isPlaying={currentTrackState.isPlaying}
							audio={t}
							key={`${t.title}_${t.id}`}
						/>
						<div className="change-track-order">
							{i > 0 && (
								<div
									className="caret-up caret"
									onClick={(e) => onUpTrack(e, t)}
								>
									<CaretUpOutlined />
								</div>
							)}

							{i < tracks.length - 1 && (
								<div
									className="caret-down caret"
									onClick={(e) => onDownTrack(e, t)}
								>
									<CaretDownOutlined />
								</div>
							)}
						</div>

						<div className="services-info">
							{trackInCollection(t) ? (
								<div
									className="toggle-icon"
									onClick={(e) => onClickRemove(e, t)}
								>
									<HeartFilled />
								</div>
							) : (
								<div className="toggle-icon" onClick={(e) => onClickAdd(e, t)}>
									<HeartOutlined />
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
