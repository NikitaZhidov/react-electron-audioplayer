import { message } from 'antd';
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import { MainList, MyPlaylist, PlayerBar, Sidebar } from './app/components';
import { AppRoutes } from './app/constants/AppRoutes';
import { addTrack } from './app/store/actions/player.actions';
import { createTrack } from './app/store/reducers/player.reducer';
import { fromFileToBlobSrc, isAudioType } from './app/utils';

function App() {
	const dispatch = useDispatch();

	const [dragFile, setDragFile] = useState(false);

	const navigate = useNavigate();

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDragFile(true);
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDragFile(false);
	};

	const dropHandler = async (e) => {
		e.preventDefault();
		setDragFile(false);

		// Works with correct files
		const trackFiles = e.dataTransfer.files;

		for (const track of trackFiles) {
			if (isAudioType(track)) {
				const trackSrc = await fromFileToBlobSrc(track);
				const trackItem = createTrack(trackSrc, track.name);
				message.success(`${track.name} added`);
				dispatch(addTrack(trackItem));
			} else {
				message.error(`Wrong ${track.name} file type: ${track.type}`);
			}
		}

		navigate(AppRoutes.MainList);
	};

	return (
		<div className="main-layout">
			<div className="main-content">
				<div className="sidebar-container">
					<Sidebar />
				</div>

				{!dragFile && (
					<div
						className="track-list-container"
						onDragStart={(e) => dragStartHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
					>
						<Routes>
							<Route path={AppRoutes.MainList} element={<MainList />} />
							<Route path={AppRoutes.Favourites} element={<MyPlaylist />} />
							<Route
								path="*"
								element={<Navigate to={AppRoutes.MainList} replace />}
							/>
						</Routes>
					</div>
				)}

				{dragFile && (
					<div
						className="drag-track-window"
						onDragStart={(e) => dragStartHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDrop={(e) => dropHandler(e)}
					>
						Drag file here to add to track
					</div>
				)}
			</div>

			<div className="player">
				<PlayerBar />
			</div>
		</div>
	);
}

export default App;
