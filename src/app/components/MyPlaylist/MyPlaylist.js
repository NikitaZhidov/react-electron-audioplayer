import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TrackList } from '../TrackList/TrackList';
import { AppRoutes } from '../../constants/AppRoutes';

import './MyPlaylist.css';
import { changeTrackPosition } from '../../store/actions/player.actions';

export const MyPlaylist = ({ className }) => {
	const dispatch = useDispatch();
	const tracks = useSelector((state) => state.player.collection);

	const onUpTrackPosition = (track) => {
		dispatch(changeTrackPosition(track, false, true));
	};

	const onDownTrackPosition = (track) => {
		dispatch(changeTrackPosition(track, false, false));
	};

	return (
		<>
			{tracks.length > 0 ? (
				<div className={`playlist-wrapper ${className || ''}`}>
					<TrackList
						onUpTrackPosition={onUpTrackPosition}
						onDownTrackPosition={onDownTrackPosition}
						isMainPlaylist={false}
						tracks={tracks}
					/>
				</div>
			) : (
				<div className="no-tracks-wrapper">
					<div className="no-tracks-info">
						<span>No tracks in your playlist</span>
						<Button type="primary">
							<NavLink to={AppRoutes.MainList}>Go to Music Library</NavLink>
						</Button>
					</div>
				</div>
			)}
		</>
	);
};
