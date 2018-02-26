/**
 * Created by lyq on 2017/12/23.
 */

import React,{ Component } from 'react';
import { Row,Col,Card,Upload,Icon,Select,Tag,message } from 'antd';
const { Meta } = Card;
const Option = Select.Option;
const url = '';
const localUrl = '';
const curUrl = localUrl;

export default class PortfDetail extends Component{

    state = {
        data:null,
        status:false,
    };


    componentWillMount(){
        let Id = this.props.match.params.id;
        let that = this;
        fetch(curUrl+'/admin/home/prodetail',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&Id='+Id
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            console.log(body)
            that.setState({data:body.data});
        })
    }

    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    imgClick = (Id,num,img)=>{
        let that = this;
        fetch(curUrl+'/admin/home/editnewimg',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&Id='+Id+'&num='+num+'&img='+img
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            if(body.errorcode === 0){
                message.info('更新成功');
                switch(num){
                    case 1:
                        delete that.state.data.NewImg1;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg1:img
                            }
                        });
                    break;
                    case 2:
                        delete that.state.data.NewImg2;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg2:img
                            }
                        });
                    break;
                    case 3:
                        delete that.state.data.NewImg3;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg3:img
                            }
                        });
                    break;
                    case 4:
                        delete that.state.data.NewImg4;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg4:img
                            }
                        });
                    break;
                    case 5:
                        delete that.state.data.NewImg5;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg5:img
                            }
                        });
                    break;
                    case 6:
                        delete that.state.data.NewImg6;
                        that.setState({data:
                            {
                                ...that.state.data,
                                NewImg6:img
                            }
                        });
                    break;
                }

                return true;
            }else{
                message.info('更新失败');
                return false;
            }
        })
    };

    handleChange = (info,id) => {

        if (info.file.status === 'uploading') {
            switch(id){
                case 1:
                    this.setState({ loading1: true });
                break;
                case 2:
                    this.setState({ loading2: true });
                break;
                case 3:
                    this.setState({ loading3: true });
                break;
                case 4:
                    this.setState({ loading4: true });
                break;
                case 5:
                    this.setState({ loading5: true });
                break;
                case 6:
                    this.setState({ loading6: true });
                break;
                case 7:
                    this.setState({ loading7: true });
                break;
            }

            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            switch(id){
                case 1:
                    this.getBase64(info.file.originFileObj, imageUrl1 => this.setState({
                        imageUrl1,
                        loading1: false,
                    }));
                break;
                case 2:
                    this.getBase64(info.file.originFileObj, imageUrl2 => this.setState({
                        imageUrl2,
                        loading2: false,
                    }));
                break;
                case 3:
                    this.getBase64(info.file.originFileObj, imageUrl3 => this.setState({
                        imageUrl3,
                        loading3: false,
                    }));
                break;
                case 4:
                    this.getBase64(info.file.originFileObj, imageUrl4 => this.setState({
                        imageUrl4,
                        loading4: false,
                    }));
                break;
                case 5:
                    this.getBase64(info.file.originFileObj, imageUrl5 => this.setState({
                        imageUrl5,
                        loading5: false,
                    }));
                break;
                case 6:
                    this.getBase64(info.file.originFileObj, imageUrl6 => this.setState({
                        imageUrl6,
                        loading6: false,
                    }));
                break;
                case 7:
                    this.getBase64(info.file.originFileObj, imageUrl7 => this.setState({
                        imageUrl7,
                        loading7: false,
                    }));
                break;
            }

        }
    };

    handleStatusChange = (val,Id)=>{
        fetch(curUrl+'/admin/home/statusedit',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            mode:'cors',
            body:'adminuser='+localStorage.getItem('user')+'&Id='+Id+'&status='+val
        }).then(function(resp){
            return resp.json();
        }).then(function(body){
            if(body.errorcode === 0){
                message.info('更新成功');
                return true;
            }else{
                message.info('更新失败');
                return false;
            }
        })
    };


    render(){
        // console.log(this.state.data);

        const status = this.state.status;

        const imageUrl1 = this.state.imageUrl1;
        const uploadButton1 = (
            <div>
                <Icon type={this.state.loading1 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl2 = this.state.imageUrl2;
        const uploadButton2 = (
            <div>
                <Icon type={this.state.loading2 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl3 = this.state.imageUrl3;
        const uploadButton3 = (
            <div>
                <Icon type={this.state.loading3 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl4 = this.state.imageUrl4;
        const uploadButton4 = (
            <div>
                <Icon type={this.state.loading4 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl5 = this.state.imageUrl5;
        const uploadButton5 = (
            <div>
                <Icon type={this.state.loading5 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl6 = this.state.imageUrl6;
        const uploadButton6 = (
            <div>
                <Icon type={this.state.loading6 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl7 = this.state.imageUrl7;
        const uploadButton7 = (
            <div>
                <Icon type={this.state.loading7 ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );



        const divimg = this.state.data?
            <div>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg1']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg1']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce1']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg1']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],1,this.state.data['OriginalImg1'])}
                        >
                            <Meta
                                title={this.state.data['Introduce1']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg1'}}
                            onChange={(info)=>this.handleChange(info,1)}
                        >
                            {imageUrl1 ? <img style={{width:300,height:300}} src={imageUrl1} alt="" /> : uploadButton1}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg2']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg2']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce2']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg2']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],2,this.state.data['OriginalImg2'])}
                        >
                            <Meta
                                title={this.state.data['Introduce2']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg2'}}
                            onChange={(info)=>this.handleChange(info,2)}
                        >
                            {imageUrl2 ? <img src={imageUrl2} alt="" /> : uploadButton2}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg3']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg3']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce3']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg3']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],3,this.state.data['OriginalImg3'])}
                        >
                            <Meta
                                title={this.state.data['Introduce3']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg3'}}
                            onChange={(info)=>this.handleChange(info,3)}
                        >
                            {imageUrl3 ? <img src={imageUrl3} alt="" /> : uploadButton3}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg4']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg4']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce4']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg4']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],4,this.state.data['OriginalImg4'])}
                        >
                            <Meta
                                title={this.state.data['Introduce4']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg4'}}
                            onChange={(info)=>this.handleChange(info,4)}
                        >
                            {imageUrl4 ? <img src={imageUrl4} alt="" /> : uploadButton4}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg5']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg5']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce5']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg5']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],5,this.state.data['OriginalImg5'])}
                        >
                            <Meta
                                title={this.state.data['Introduce5']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg5'}}
                            onChange={(info)=>this.handleChange(info,5)}
                        >
                            {imageUrl5 ? <img src={imageUrl5} alt="" /> : uploadButton5}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={2} span={6} >
                        <a href={curUrl+'/admin/Down/originalimg?img=.'+this.state.data['OriginalImg6']} style={{textDecoration:'none'}}>
                            <Card
                                hoverable={true}
                                style={{ width: 240 }}
                                cover={<img src={curUrl+this.state.data['OriginalImg6']} />}
                            >
                                <Meta
                                    title={this.state.data['Introduce6']}
                                    description="原图"
                                />
                            </Card>
                        </a>
                    </Col>
                    <Col offset={3} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['NewImg6']} />}
                            onClick={()=>this.imgClick(this.state.data['PortfolioId'],6,this.state.data['OriginalImg6'])}
                        >
                            <Meta
                                title={this.state.data['Introduce6']}
                                description="新上传的图片"
                            />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'NewImg6'}}
                            onChange={(info)=>this.handleChange(info,6)}
                        >
                            {imageUrl6 ? <img src={imageUrl6} alt="" /> : uploadButton6}
                        </Upload>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col offset={3} span={3}>
                        选择展出样式 &nbsp;
                        <Select defaultValue={this.state.data['ArrangMode']} style={{ width: 120 }} onSelect={(val)=>this.handleStatusChange(val,this.state.data['PortfolioId'])}>
                            <Option value="1">样式1</Option>
                            <Option value="2">样式2</Option>
                            <Option value="3">样式3</Option>
                            <Option value="4">样式4</Option>
                        </Select>
                        <Tag style={{marginTop:'30px'}} color="geekblue">创建时间&nbsp;{this.state.data.CreateTime.substring(0,11)}</Tag>
                        <Tag style={{marginTop:'30px',marginBottom:'30px'}}  color="geekblue">更新时间&nbsp;{this.state.data.UpdateTime?this.state.data.UpdateTime.substring(0,11):'未更新'}</Tag>
                    </Col>
                    <Col offset={3} span={3}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={curUrl+this.state.data['VotesImg']} />}
                        >
                            <Meta
                                description="推荐图"
                            />
                        </Card>
                    </Col>
                    <Col offset={3} span={3}>
                        <div style={{width:'100%',textAlign:'left'}}>上传推荐图</div>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{width:'300px',height:'300px'}}
                            showUploadList={false}
                            action={curUrl+'/admin/upload/originalimg'}
                            headers={{'porfId':this.state.data.PortfolioId,'imgnew':'VotesImg'}}
                            onChange={(info)=>this.handleChange(info,7)}
                        >
                            {imageUrl7 ? <img src={imageUrl7} alt="" /> : uploadButton7}
                        </Upload>
                    </Col>
                </Row>
            </div>
            :'';



        return(
            <div>
                {divimg}
            </div>


        );
    }
}
