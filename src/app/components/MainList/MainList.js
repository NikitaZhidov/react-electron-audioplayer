import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack, changeTrackPosition } from '../../store/actions/player.actions';
import { createTrack } from '../../store/reducers/player.reducer';
import { fromFileToBlobSrc, isAudioType } from '../../utils';
import { TrackList } from '../TrackList/TrackList';

import './MainList.css';

export const MainList = ({ className }) => {
	const tracks = useSelector((state) => state.player.tracks);
	const dispatch = useDispatch();

	const onUpTrackPosition = (track) => {
		dispatch(changeTrackPosition(track, true, true))
	};

	const onDownTrackPosition = (track) => {
		dispatch(changeTrackPosition(track, true, false))
	};

	const addTracksHandler = async (trackFiles) => {
		const track = trackFiles.file;
		if (isAudioType(track)) {
			const trackSrc = await fromFileToBlobSrc(track);
			const trackItem = createTrack(trackSrc, track.name);
			message.success(`${track.name} added`);
			dispatch(addTrack(trackItem));
		} else {
			message.error(`Wrong ${track.name} file type: ${track.type}`);
		}
	};

	return (
		<div className={`${className || ''} main-list-wrapper`}>
			<div className="track-list-wrapper">
				<TrackList
					onUpTrackPosition={onUpTrackPosition}
					onDownTrackPosition={onDownTrackPosition}
					isMainPlaylist={true}
					tracks={tracks}
				/>
			</div>
			<div className="upload-tracks-input">
				<Upload
					beforeUpload={() => false}
					showUploadList={false}
					accept=".mp3"
					multiple
					onChange={addTracksHandler}
				>
					<Button type="dashed" icon={<UploadOutlined />}>
						Add more tracks
					</Button>
				</Upload>
			</div>
		</div>
	);
};
