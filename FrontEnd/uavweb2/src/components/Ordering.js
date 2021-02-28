import React, {Component} from "react";
import "antd/dist/antd.css";
import {makeAPayment} from "../utils";
import ButtonGroup from "antd/lib/button/button-group";
import walle from "../assets/imgs/icon-robot.png";
import drone from "../assets/imgs/icon-drone.png";

import {Row, Col, Form, Input, Select, Radio, Button, InputNumber, message, Divider} from "antd";

import {LockOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const address = ["", "", "", ""];
const { number, street, zip, state} = address;

// const newAddress {...address} = {}


//Shen: Ordering页面的2个按钮已经分离开，点击check price只检查价格，点击submit才会触发restful api。
//接下来的work：
//1. 完成价格的计算，写进checkPriceOnClick() 中
//2. submit 按键的css style需要美化
//注意事项：state里的price是为了测试而写上去的，可以根据你的实现机制选择删除或保留。如果保留的话，在向后端发送数据的时候要确认:
    //1. state中"Ordering的price"已被更新
    //2. state中"Ordering的weight"数据是有意义的，不是undefined。
class Ordering extends Component {
    state = {
        price: null,
        Ordering:null
    }

    //'SUBMIT' button: This function only in charge of sending order info to backend
    onFinish = () => {
        // 现在这里算一下。
        console.log("this.state.Ordering");
        console.log(this.state.Ordering);
        makeAPayment(this.state.Ordering)
            .then(() => {
                message.success("Order successfully submitted");
            })
            .catch(err => {
                message.error("submit failed!", err);
            });
    };

    //'Check Price' button: use google api calculate price. Define calculation algorithm here
    checkPriceOnClick = (data) => {
        this.setState({
            price: "$30",//$30只是为了测试写的hard code。NEED TO BE CHANGED TO CALCULATED PRICE，并且把price负值给Ordering.price
            Ordering: data,

        })
    };

    // handleInputChange = event => {
    //   this.setState({
    //     [event.target.name]: event.target.value,
    //   });
    // };

    render() {
        return (
            <div>

                <br/><br/><br/><br/>
                <Row>
                    <Col span={15} offset={9}>
                        <img src={walle} alt="robot" height={235}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <img src={drone} alt="robot" height={235}/>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col offset={6} span={12}>
                        <br/>
                        <br/>
                        <Divider><h1>SENDING A PACKAGE</h1></Divider>
                        <br></br>

                        <Divider orientation="left"><h3>1. Shipping</h3></Divider>
                        <Divider orientation="left"><h3>2. Billing</h3></Divider>
                        <Divider orientation="left"><h3>3. Order Summary</h3></Divider>

                        <br/>
                        <Divider orientation="left">Shipping</Divider>

                        <Form
                            {...formItemLayout}
                            name="Ordering"
                            onFinish={this.checkPriceOnClick}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="receiverName"
                                label="Receiver Name"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input your receiver name!",
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="receiver name"/>
                            </Form.Item>
                            <Form.Item
                                name="senderAddress"
                                label="Sender Address"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input your Sender Address!",
                                    },
                                ]}
                            >
                                <Input placeholder="Pattern: Address, City, State, Zip code"/>
                            </Form.Item>

                            <Form.Item
                                name="receiverAddress"
                                label="Receiver Address"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input your Receiver Address!",
                                    },
                                ]}
                            >
                                <Input placeholder="Pattern: Address, City, State, Zip code"/>
                            </Form.Item>

                            <Form.Item
                                name="cardNumber"
                                label="Card Number"
                                rules={[{required: true, whitespace: true}]}
                            >
                                <Input placeholder="Credit Card/ Debit Card Number"/>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Item Description"
                                rules={[{required: true, whitespace: true}]}
                            >
                                <Input placeholder="Please discribe your product"/>
                            </Form.Item>

                            <Form.Item
                                label="Package Size"
                                name="size"
                                rules={[{required: true, whitespace: true}]}
                            >
                                <Radio.Group>
                                    <Radio value="small">Small</Radio>
                                    <Radio value="medium">Medium</Radio>
                                    <Radio value="large">Large</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Weight"
                                // name="weight"
                                rules={[{required: true, whitespace: true}]}
                            >
                                <Form.Item name="weight" noStyle>
                                    <InputNumber min={0.1} max={20.0} step={0.5} defaultValue={0.1}/>
                                </Form.Item>
                                <span className="package-weight"> lb </span>
                            </Form.Item>

                            <Form.Item
                                label="Delivery Method "
                                name="deliveryMethod"
                                rules={[{required: true, whitespace: true}]}
                            >
                                <Radio.Group>
                                    <Radio value="drone">Drone</Radio>
                                    <Radio value="machine">Machine</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                              label="Price"
                              name="price"
                            >
                                {this.state.price}
                            {/*    show the price after click the following button */}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={this.checkPriceOnClick} icon={<SearchOutlined />} type="default" htmlType="submit" className="check-price">
                                    {/* change the button back to the normal one */}
                                    Check Shipping Price
                                </Button>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" onClick={this.onFinish} >
                                    Submit
                                </Button>
                            </Form.Item>

                        </Form>






                            {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please accept agreement"),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="register-btn">
              Submit
            </Button>
          </Form.Item>
          <Form.Item label="Required Mark" name="requiredMark">
            <Radio.Group>
              <Radio.Button value="optional">Optional</Radio.Button>
              <Radio.Button value={true}>Required</Radio.Button>
              <Radio.Button value={false}>Hidden</Radio.Button>
            </Radio.Group>
          </Form.Item> */}

                            {/* <Input.Group compact>
            <Input
              prefix={"First Name*"}
              name="firstName"
              onChange={this.handleInputChange}
              style={{ width: "50%" }}
              placeholder="Your First Name"
            />
            <Input
              prefix={"Last Name*"}
              name="lastName"
              onChange={this.handleInputChange}
              style={{ width: "50%" }}
              placeholder="Your Last Name"
            />
          </Input.Group>
          <br />
          <Input.Group compact>
            <Input
              prefix={"Address1*"}
              name="address1"
              onChange={this.handleInputChange}
              placeholder="Street Number, street Name"
            />
            <Input
              prefix={"Address2*"}
              name="address2"
              onChange={this.handleInputChange}
              placeholder="Apartment number,suite number or company name"
            />
          </Input.Group>
          <br />
          <Input.Group compact>
            <Input
              prefix={"City"}
              name="city"
              style={{ width: "80%" }}
              onChange={this.handleInputChange}
              placeholder="Street Number, street Name"
            />
            <Select
              defaultValue="CA"
              style={{ width: "5%" }}
              onChange={this.handleInputChange}
            >
              <Option value="CA">CA</Option>
            </Select>
            <Select style={{ width: "15%" }} name="state">
              <Option value="United States">United States</Option>
            </Select>
          </Input.Group>
          <Input
            prefix={"Zip Code"}
            name="zipCode"
            onChange={this.handleInputChange}
            style={{ width: "30%" }}
            placeholder="within Great San Fransisco Area"
          />
          <p>
            <button>Review</button>
          </p> */}
                        {/*</Form>*/}

                    </Col>
                </Row>


            </div>
        );
    }
}

export default Ordering;
