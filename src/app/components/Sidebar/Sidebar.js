import { Menu } from 'antd';
import { HeartOutlined, BarsOutlined } from '@ant-design/icons';
import './Sidebar.css';
import React from 'react';
import { AppRoutes } from '../../constants/AppRoutes';
import { Link, useLocation } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	getItem('Music', AppRoutes.MainList, <BarsOutlined />),
	getItem('Favourites', AppRoutes.Favourites, <HeartOutlined />),
];

export const Sidebar = ({ className }) => {
	const location = useLocation();

	return (
		<div className={className + ' sidebar-wrapper'}>
			<Menu
				style={{ height: '100%', padding: '30px 0' }}
				selectedKeys={[location.pathname.slice(1)]}
				mode="inline"
			>
				{items.map((i) => (
					<Menu.Item icon={i.icon} key={i.key}>
						<Link to={i.key}>{i.label}</Link>
					</Menu.Item>
				))}
			</Menu>
		</div>
	);
};
