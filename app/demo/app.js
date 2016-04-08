/*eslint-disable no-unused-vars */
import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename,createHashHistory } from 'history'
import { Router } from 'react-router'
import stubbedCourses from './mock/COURSES'//读取模拟数据
import './components/app.scss'//加载组件样式

// 此处用于添加根路径,此处一定的用hash历史记录,不然访问子路径,无法还原子组件内容
const history = useBasename(createHashHistory)({
	queryKey: '_key',
	basename: '/'
})


const rootRoute = {
	component: 'div',
	childRoutes: [{
		path: '/',
		component: require('./components/App'),
		childRoutes: [
			require('./routes/Calendar'),
			require('./routes/Course'),
			require('./routes/Grades'),
			require('./routes/Messages'),
			require('./routes/Profile')
		]
	}]
}

render(
	<Router history={history} routes={rootRoute}/>,
	document.getElementById('example')
)
