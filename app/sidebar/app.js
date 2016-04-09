import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link} from 'react-router'
import { createHistory, useBasename,createHashHistory } from 'history'
import data from './data'//读取模拟数据
import './app.css'//加载组件样式

//此处用于添加根路径,此处一定的用hash历史记录,不然访问子路径,无法还原子组件内容
const history = useBasename(createHashHistory)({
	queryKey: '_key',
	basename: '/'
})

class Category extends React.Component {
	render() {
		const category = data.lookupCategory(this.props.params.category)

		return (
			<div>
				<h1>{category.name}</h1>
				{this.props.children || (
					<p>{category.description}</p>
				)}
			</div>
		)
	}
}

class CategorySidebar extends React.Component {
	render() {
		const category = data.lookupCategory(this.props.params.category)

		return (
			<div>
				<Link to="/">◀︎ Back</Link>
				<h2>{category.name} Items</h2>
				<ul>
					{category.items.map((item, index) => (
						<li key={index}>
							<Link to={`/category/${category.name}/${item.name}`}>{item.name}</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

class Item extends React.Component {
	render() {
		const { category, item } = this.props.params
		const menuItem = data.lookupItem(category, item)

		return (
			<div>
				<h1>{menuItem.name}</h1>
				<p>${menuItem.price}</p>
			</div>
		)
	}
}

class Index extends React.Component {
	render() {
		return (
			<div>
				<h1>Sidebar</h1>
				<p>
					Routes can have multiple components, so that all portions of your UI
					can participate in the routing.
				</p>
			</div>
		)
	}
}

class IndexSidebar extends React.Component {
	render() {
		return (
			<div>
				<h2>Categories</h2>
				<ul>
					{data.getAll().map((category, index) => (
						<li key={index}>
							<Link to={`/category/${category.name}`}>{category.name}</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

class App extends React.Component {
	render() {
		const { content, sidebar } = this.props

		return (
			<div>
				<div className="Sidebar">
					{sidebar || <IndexSidebar />}
				</div>
				<div className="Content">
					{content || <Index />}
				</div>
			</div>
		)
	}
}

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="category/:category" components={{ content: Category, sidebar: CategorySidebar }}>
				<Route path=":item" component={Item}/>
			</Route>
		</Route>
	</Router>
), document.getElementById('example'))
