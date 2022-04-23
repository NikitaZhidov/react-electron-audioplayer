import { PauseCircleTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import './AudioShortInfo.css';

export const AudioShortInfo = ({
	audio,
	className,
	active,
	isPlaying,
	onClickPlayButton,
	showHoverPlay,
}) => {
	const onClickPlay = (event) => {
		event.stopPropagation();
		if (onClickPlayButton) {
			onClickPlayButton();
		}
	};

	return (
		<div className={`audio-info ${className || ''}`}>
			<div className="player-img">
				{active ? (
					<div onClick={(e) => onClickPlay(e)} className="active-track-status">
						{!isPlaying ? <PlayCircleTwoTone /> : <PauseCircleTwoTone />}
					</div>
				) : null}

				<div
					className={`active-track-status hover ${showHoverPlay && 'active'}`}
				>
					<PlayCircleTwoTone />
				</div>
				<img alt={audio.title} src={audio.imgSrc} />
			</div>

			<div className="short-info">
				<div className="audio-title">{audio.title}</div>
				<div className="audio-artist">{audio.artist}</div>
			</div>
		</div>
	);
};
