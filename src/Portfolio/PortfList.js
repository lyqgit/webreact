/**
 * Created by lyq on 2017/12/23.
 */

import React,{ Component } from 'react';
import { Table,Divider,Icon,Button,Input,Select,message } from 'antd';
import { Link } from 'react-router-dom';
const Option = Select.Option;
const url = '';
const localUrl = '';
const curUrl = localUrl;

export default class PortfList extends Component{

    state = {
        data:[],
        collapsed:false,
        filterDropdownVisible:false,
        filtered:false,
        searchText:'',
        sourcedata:[],
        loading:false,
        pagination:{}
    };

    componentWillMount(){
        let that = this;
        this.setState({loading:true});
        fetch(curUrl+'/admin/home/prolist',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&page=0'
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            console.log(body);
            const pagination = {...that.state.pagination};
            pagination.total = body.total;
            that.setState({
                loading:false,
                data:body.data,
                sourcedata:body.data,
                pagination,
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
            filteredInfo: filters,
            sortedInfo: sorter,
            pagination:pager,
            loading:true
        });
        let that = this;
        let current = pagination.current-1;
        fetch(curUrl+'/admin/home/prolist',{
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
                loading:false,
                data:body.data,
                sourcedata:body.data,
                pagination,
            });
        })

    };

    handleStatusChange = (val,Id)=>{//更改审核状态
        fetch(curUrl+'/admin/home/proedit',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&column=Status'+'&Id='+Id+'&val='+val
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            message.info(body.info);
        });
    };

    handlerecomChange = (val,Id)=>{//是否推荐
        fetch(curUrl+'/admin/home/proedit',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&column=IsRecommend'+'&Id='+Id+'&val='+val
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            message.info(body.info);
        });
    };

    hanldefailreason = (val,Id)=>{//填写失败原因
        fetch(curUrl+'/admin/home/addfailreason',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&Id='+Id+'&fail='+val
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            message.info(body.info);
        });
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    };
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.state.sourcedata.map((record) => {
                const match = record.Id.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.Id.split(reg).map((text, i) => (
                  i > 0 ? [<span key={i} className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '作品编号',
            dataIndex: 'Id',
            sorter: (a, b) => a.Id - b.Id,
            sortOrder: sortedInfo.columnKey === 'Id' && sortedInfo.order,
            key: 'Id',
            filterDropdown: (
                <div style={{padding:'8px',borderRadius:'6px',backgroundColor:'#fff',boxShadow:'0 1px 6px rgba(0, 0, 0, .2)'}}>
                    <Input
                        style={{width:'130px',marginRight:'8px'}}
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        }, {
            title: '作品名称',
            dataIndex: 'Title',
            key: 'Title',
        }, {
            title: '投票数',
            dataIndex: 'VotesNum',
            key: 'VotesNum',
            sorter: (a, b) => a.VotesNum - b.VotesNum,
            sortOrder: sortedInfo.columnKey === 'VotesNum' && sortedInfo.order,
        }, {
            title: '点赞数',
            dataIndex: 'UpVoteNum',
            key: 'UpVoteNum',
            sorter: (a, b) => a.UpVoteNum - b.UpVoteNum,
            sortOrder: sortedInfo.columnKey === 'UpVoteNum' && sortedInfo.order,
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/Home/PortfDetail/${record.Id}`}>作品详情</Link>
                    <Divider type="vertical" />
                    <Select defaultValue={record.Status} style={{ width: 120 }} onSelect={(val)=>this.handleStatusChange(val,record.Id)}>
                          <Option value="0">未审核</Option>
                          <Option value="1">审核通过</Option>
                          <Option value="2">审核不通过</Option>
                          <Option value="3">禁用</Option>
                    </Select>
                   <Divider type="vertical" />
                   <Select defaultValue={record.IsRecommend} style={{ width: 120 }} onSelect={(val)=>this.handlerecomChange(val,record.Id)}>
                          <Option value="0">不推荐</Option>
                          <Option value="1">推荐</Option>
                    </Select>
                    <Divider type="vertical" />
                    <Input.Search
                        style={{width:'360px'}}
                        defaultValue={record.FailReason}
                        placeholder="如果审核不通过或者禁用，写入原因"
                        onSearch={(val)=>this.hanldefailreason(val,record.Id)}
                        enterButton="提交审核原因"
                    />
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
                loading={this.state.loading}
            />
        );
    }
}
