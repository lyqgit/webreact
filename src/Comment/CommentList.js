/**
 * Created by Administrator on 2017/12/24.
 */

import React,{ Component } from 'react';
import { Table,Switch } from 'antd';
const url = '';
const localUrl = '';
const curUrl = url;

export default class CommentList extends Component{

    state = {
        data:null,
        collapsed:false,
        pagination:{}
    }

    componentWillMount(){
        let that = this;
        fetch(curUrl+'/admin/comment/comlist',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&page=0'
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            const pagination = {...that.state.pagination};
            pagination.total = body.total;
            that.setState({
                data:body.data,
                pagination
            });
        })
    }

    onCollapse = (collapsed)=>{
        console.log(collapsed);
        this.setState({collapsed});
    };

    handleChange = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        const pager = {...this.state.pagination};
        this.setState({
            sortedInfo: sorter,
            pagination:pager
        });

        let that = this;
        let current = pagination.current-1;
        fetch(curUrl+'/admin/comment/comlist',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&page='+current
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            console.log(body);
            const pagination = {...that.state.pagination};
            pagination.total = body.total;
            that.setState({
                data:body.data,
                pagination,
            });
        })

    };

    switchStatus = (val,Id)=>{
        let status = 0;
        switch(val){
            case true:
                status = 1;
            break;
            default:
            break;
        }
        fetch(curUrl+'/admin/comment/isshow',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&Id='+Id+'&status='+status
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            if(body.errorcode === 0){
                return true;
            }else{
                return false;
            }
        })
    };

    render(){
        // console.log(this.state.data);
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: '评论Id',
            dataIndex: 'Id',
            key: 'Id',
            sorter: (a, b) => a.Id - b.Id,
            sortOrder: sortedInfo.columnKey === 'Id' && sortedInfo.order,
        }, {
            title: '作品编号',
            dataIndex: 'PortfolioId',
            key: 'PortfolioId',
            sorter: (a, b) => a.PortfolioId - b.PortfolioId,
            sortOrder: sortedInfo.columnKey === 'PortfolioId' && sortedInfo.order,
        }, {
            title: '用户Id',
            dataIndex: 'AccId',
            key: 'AccId',
        }, {
            title: '评论内容',
            dataIndex: 'AccContent',
            key: 'AccContent',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                  <Switch checkedChildren="显示" unCheckedChildren="关闭" defaultChecked={parseInt(record.Status)?true:false} onChange={(val)=>this.switchStatus(val,record.Id)} />
                </span>
            ),
        }];

        return(
            <Table
                rowKey={record=>record.Id}
                columns={columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                onChange={this.handleChange}
            />
        );
    }
}
