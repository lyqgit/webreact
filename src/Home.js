/**
 * Created by lyq on 2017/12/22.
 */
import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import PortfList from './Portfolio/PortfList';
import PortfDetail from './Portfolio/PortfDetail';
import CommentList from './Comment/CommentList';
import { Icon,Layout,Menu,message } from 'antd';
const { Header,content,Sider } = Layout;
// const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class Home extends Component{

    componentWillMount(){
        if(localStorage.getItem('user') !== 'qida'){
            this.props.history.push('/Login');
        }
    }

    state = {
        title:'主页',
        collapsed:false,
    };
    onCollapse = (collapsed)=>{
        // console.log(collapsed);
        this.setState({collapsed});
    };

    switchRoute=(obj)=>{
        if(this.props.location.pathname !== obj.key){
            let title = '';
            switch(obj.key){
                case '/Home/PortfList':
                    title = '作品审核列表';
                break;
                case '/Home/CommentList':
                    title = '评论审核列表';
                break;
            }

            this.props.history.push({pathname:obj.key,state:title});
        }else{
            message.info('已经为列表页');
        }
    };

    render(){
        // console.log(this.props);
        return (
            <Layout>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.switchRoute}>
                        <MenuItem key="/Home/PortfList">
                            <Icon type="file-jpg" />
                            <span>作品列表</span>
                        </MenuItem>
                        <MenuItem key="/Home/CommentList">
                            <Icon type="file-jpg" />
                            <span>评论审核</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background:'#ffffff',textAlign:'left'}} >{this.props.location.state?this.props.location.state:this.state.title}</Header>
                    <content>
                        <Route path="/Home/PortfList" component={PortfList}/>
                        <Route path="/Home/PortfDetail/:id" component={PortfDetail}/>
                        <Route path="/Home/CommentList" component={CommentList}/>
                    </content>
                </Layout>
            </Layout>

        );
    }
}
