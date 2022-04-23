import {
	CustomerServiceOutlined,
	PauseCircleTwoTone,
	PlayCircleTwoTone,
	StepBackwardFilled,
	StepForwardFilled,
} from '@ant-design/icons';
import { Slider } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeTrackCurrentTime,
	changeVolume,
	selectNextTrack,
	selectPrevTrack,
	setDuration,
	togglePlayingTrack,
} from '../../store/actions/player.actions';
import {
	canPlayNextTrackSelector,
	canPlayPrevTrackSelector,
} from '../../store/selectors/player.selectors';
import { AudioShortInfo } from '../../ui';
import { fromSecondsToFormattedTime } from '../../utils';
import './PlayerBar.css';

export const AUDIO_OBJ = new Audio();

const toPercentString = (value) => {
	const percentStr = Math.ceil(value * 100).toString();
	if (percentStr.length === 1) {
		return `0${percentStr}`;
	}

	return percentStr;
};

// Too much logic in this component
// for example: use react hooks and/or create shared utils to handle this logic
// incapsulate audio logic in separate module (hook)
// TODO: refactor

export const PlayerBar = ({ className }) => {
	const currentTrack = useSelector((state) => state.player.currentTrack);
	const [currentTrackTime, setCurrentTrackTime] = useState(0);
	const [changingCurrentTrackTime, setChangingCurrentTrackTime] =
		useState(false);

	const canPlayNextTrack = useSelector(canPlayNextTrackSelector);
	const canPlayPrevTrack = useSelector(canPlayPrevTrackSelector);
	const currentTrackState = useSelector(
		(state) => state.player.currentTrackState
	);

	useEffect(() => {
		setCurrentTrackTime(0);
	}, [currentTrack?.id]);

	useEffect(() => {
		if (currentTrack?.id !== undefined && currentTrack?.src) {
			AUDIO_OBJ.src = currentTrack.src;

			AUDIO_OBJ.volume = currentTrackState.volume;

			AUDIO_OBJ.onloadeddata = () => {
				dispatch(setDuration(AUDIO_OBJ.duration));
			};

			AUDIO_OBJ.onended = () => onEndTrack();

			AUDIO_OBJ.play();
		}
	}, [currentTrack?.src, currentTrack?.id]);

	useEffect(() => {
		AUDIO_OBJ.ontimeupdate = () => {
			const trackTime = Math.ceil(AUDIO_OBJ.currentTime);
			dispatch(changeTrackCurrentTime(trackTime));

			if (!changingCurrentTrackTime) {
				setCurrentTrackTime(trackTime);
			}
		};
	}, [changingCurrentTrackTime]);

	useEffect(() => {
		if (currentTrack) {
			if (currentTrackState.isPlaying) {
				AUDIO_OBJ.play();
			} else {
				AUDIO_OBJ.pause();
			}
		}
	}, [currentTrackState.isPlaying]);

	useEffect(() => {
		const spaceListenter = (e) => {
			if (e.keyCode === 32) {
				dispatch(togglePlayingTrack());
			}
		};

		window.addEventListener('keydown', spaceListenter);

		return () => window.removeEventListener('keydown', spaceListenter);
	});

	const dispatch = useDispatch();

	const onClickPlayButton = () => {
		dispatch(togglePlayingTrack());
	};

	const onChangeCurrentTimeBuffer = (currentTime) => {
		setChangingCurrentTrackTime(true);
		setCurrentTrackTime(currentTime);
	};

	const onChangeCurrentTime = (currentTime) => {
		setChangingCurrentTrackTime(false);
		AUDIO_OBJ.currentTime = currentTime;
		dispatch(changeTrackCurrentTime(currentTime));
	};

	const onChangeVolume = (volume) => {
		dispatch(changeVolume(volume));

		if (AUDIO_OBJ) {
			AUDIO_OBJ.volume = volume;
		}
	};

	const onEndTrack = () => {
		if (canPlayNextTrack) {
			onSelectNextTrack();
		} else {
			AUDIO_OBJ.pause();
			dispatch(togglePlayingTrack());
		}
	};

	const onSelectNextTrack = () => {
		if (canPlayNextTrack) {
			dispatch(selectNextTrack());
		}
	};

	const onSelectPrevTrack = () => {
		if (canPlayPrevTrack) {
			dispatch(selectPrevTrack());
		}
	};

	return (
		<div className={`${className || ''} player-wrapper`}>
			{currentTrack ? (
				<div className="player-content">
					<AudioShortInfo
						className="player-audio-short-info"
						audio={currentTrack}
					/>

					<div className="play-area">
						<div className="change-track">
							<div
								onClick={onSelectPrevTrack}
								className={`change-track-icon ${
									canPlayPrevTrack || 'disabled'
								}`}
							>
								<StepBackwardFilled />
							</div>

							<div className="play-button" onClick={onClickPlayButton}>
								{!currentTrackState.isPlaying ? (
									<PlayCircleTwoTone />
								) : (
									<PauseCircleTwoTone />
								)}
							</div>

							<div
								onClick={onSelectNextTrack}
								className={`change-track-icon ${
									canPlayNextTrack || 'disabled'
								}`}
							>
								<StepForwardFilled />
							</div>
						</div>

						<div className="track-timeline">
							<Slider
								min={0}
								max={Math.ceil(currentTrackState.duration)}
								value={currentTrackTime}
								onChange={onChangeCurrentTimeBuffer}
								step={1}
								onAfterChange={onChangeCurrentTime}
								tipFormatter={fromSecondsToFormattedTime}
								defaultValue={currentTrackState.currentTimeInSeconds}
							/>
						</div>
					</div>

					<div className="duration">
						<div className="current-time">
							{fromSecondsToFormattedTime(
								currentTrackState.currentTimeInSeconds
							)}
						</div>
					</div>

					<div className="volume-editor">
						<div className="volume-slider-wrapper">
							<Slider
								vertical
								className="volume-slider"
								min={0}
								max={1}
								step={0.01}
								tipFormatter={toPercentString}
								defaultValue={currentTrackState.volume}
								value={currentTrackState.volume}
								onChange={onChangeVolume}
							/>
						</div>

						<div className="volume-value">
							<CustomerServiceOutlined />
							<span className="volume-value-text">
								{toPercentString(currentTrackState.volume)}%
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className="no-track-message">Choose any track to listen music</div>
			)}
		</div>
	);
};
