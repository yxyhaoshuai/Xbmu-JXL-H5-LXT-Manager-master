import React, {Component} from "react";
import {Layout, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import "./index.less"
import menuItems from "../../config/menuConfig"
import SzIcon from "../../config/iconFont";

const {Sider} = Layout;
const {SubMenu} = Menu;

class MenuBar extends Component {
    state = {
        collapsed: false,
        menuItems,
        routeToTitles: {}
    }
    _onCollapse = collapsed => {
        this.setState({collapsed});
    };

    _renderMenus(menuItems) {
        return menuItems.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.route} icon={<SzIcon type={item.icon}/>}>
                        <Link to={item.route}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.route} icon={<SzIcon type={item.icon}/>} title={item.title}>
                        {this._renderMenus(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    _handlerMenuData = (menuData) => {
        let routeToTitle = {"404": ["撩课后台首页", "404"]}
        menuData.forEach(item=>{
            if (!item.children) {
                routeToTitle[item.route] = ["撩课后台首页", item.title]
            } else {
                routeToTitle[item.route] = ["撩课后台首页", item.title]
                item.children.forEach(subItem=>{
                    routeToTitle[subItem.route] = ["撩课后台首页", item.title, subItem.title]
                })
            }
        })
        return routeToTitle;
    }

    _getTitles = (key) => {
        // "/article/add"
        if (key.length > 0) {
            let result = this.state.routeToTitles[key]
            if (result) return result;
            key = key.substring(0, key.lastIndexOf("/"))
            return this._getTitles(key)
        } else {
            return this.state.routeToTitles["404"]
        }
    }

    _handlerMenuClick = ({key}) => {
        // "/article"
        // "/article/edit/2"
        let titles =  this._getTitles(key)
        // console.log(key, titles)
        if (typeof this.props.menuChangeFunc === "function") {
            this.props.menuChangeFunc(titles)
        }
    }
    componentDidMount() {
        this.setState({
            routeToTitles: this._handlerMenuData(menuItems)
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let pathname = this.props.location.pathname;
        // console.log(pathname)
        this._handlerMenuClick({key: pathname})
    }

    _handlerTruePathName = (pathname) => {
        while (true) {
            if (pathname.length === 0) return "/"
            let result = this.state.routeToTitles[pathname]
            if (result) return pathname;
            pathname = pathname.substring(0, pathname.lastIndexOf("/"))
        }
    }

    render() {
        const {collapsed, menuItems} = this.state;
        // 1. 需要获取当前的访问路由路径
        let pathname = this._handlerTruePathName(this.props.location.pathname);
        // 2.
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this._onCollapse}>
                <div className="logo">
                    {collapsed ? "撩" : "撩学堂-后台管理"}
                </div>
                <Menu onClick={this._handlerMenuClick} theme="dark" selectedKeys={[pathname]} mode="inline">
                    {this._renderMenus(menuItems)}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(MenuBar);