import React, { useState } from 'react';
import { Row, Col, Button, Menu, Avatar } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import Helmet from '../../Components/Helmet';
import {
    BellOutlined,
    DollarCircleOutlined,
    EditOutlined,
    SnippetsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { FILE_USER, NOTIFICATION_USER, ORDER_WHEEL } from '../../constans';
import Userlayout from '../../Common/UserLayout';
import { useSelector } from 'react-redux';
import { authSelector } from '../../Store/Reducer/authReducer';
import { humanImg } from '../../assets/fake-data/human';

const UserSetting = styled.div`
    display: flex;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    .user-settings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        & p {
            margin-bottom: 0;
        }
        .user-title {
            font-size: 17px;
            font-weight: 600;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
        }
    }
    ul#rc-menu-uuid-92169-1-sub3-popup {
        background: #fff;
    }
`;

const UserChoice = styled.div`
    .anticon {
        font-size: 20px;
    }
    .ant-menu-item {
        margin-top: 10px;
    }
`;

const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
function PurchaseOrder({axiosJWT}) {
    const auth = useSelector(authSelector);
    const { location } = useParams();
    const [openKeys, setOpenKeys] = useState([location]);
    const { user } = auth;

    const handleClick = (e) => {
        console.log('click ', e);
    };

    if (!auth.user && !auth.tokenAuth) {
        return <Redirect to="/buyer/signin" />;
    }

    const renderUserFileItem = (route) => {
        let xhtml = null;
        xhtml = route.map((route, index) => {
            return (
                <Userlayout
                    name={route.name}
                    key={index}
                    component={route.component}
                    exact={route.exact}
                    path={route.path}
                    location={location}
                    axiosJWT={axiosJWT}
                />
            );
        });
        return xhtml;
    };

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Helmet title="User">
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ transform: 'translateY(20px)' }}
            >
                <Col
                    className="gutter-row"
                    span={6}
                    style={{ background: '#fff', padding: '20px' }}
                >
                    <UserSetting>
                        <Avatar src={user?.profilePicture || humanImg} alt={user?.username} size={50} />
                        <div className="user-settings">
                            <p className="user-title">
                                {user && user.username}
                            </p>
                            <Button type="text" icon={<EditOutlined />}>
                                <Link to="/user/profile">S???a H??? S??</Link>
                            </Button>
                        </div>
                    </UserSetting>
                    <UserChoice>
                        <Menu
                            onClick={handleClick}
                            style={{
                                width: 256,
                                marginTop: '10px',
                                fontSize: '17px',
                            }}
                            defaultSelectedKeys={[location || 'profile']}
                            defaultOpenKeys={[location || 'profile']}
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                        >
                            <SubMenu
                                key='profile-page'
                                icon={<UserOutlined />}
                                title="T??i kho???n c???a t??i"
                            >
                                <Menu.Item key="profile">
                                    <Link to="/user/profile">H??? s??</Link>
                                </Menu.Item>

                                <Menu.Item key="payment">
                                    <Link to="/user/payment">Ng??n h??ng</Link>
                                </Menu.Item>
                                <Menu.Item key="address">
                                    <Link to="/user/address">?????a ch???</Link>
                                </Menu.Item>
                                <Menu.Item key="password">
                                    <Link to="/user/password">
                                        ?????i m???t kh???u
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="order" icon={<SnippetsOutlined />}>
                                <Link to="/user/order">????n Mua</Link>
                            </Menu.Item>
                            <SubMenu
                                key='order-page'
                                icon={<BellOutlined />}
                                title="Th??ng b??o"
                            >
                                <Menu.Item key="order-update">
                                    <Link to="/user/order-update">
                                        C???p nh???t ????n h??ng
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="promotion">
                                    <Link to="/user/promotion">Khuy???n m??i</Link>
                                </Menu.Item>
                                <Menu.Item key="wallet-update">
                                    <Link to="/user/wallet-update">
                                        C???p nh???t v??
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="work">
                                    <Link to="/user/work">Ho???t ?????ng</Link>
                                </Menu.Item>
                                <Menu.Item key="updated-review">
                                    <Link to="/user/updated-review">
                                        ????nh gi?? c???p nh???t
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="wheel"
                                icon={<DollarCircleOutlined />}
                            >
                                <Link to="/user/wheel">V??ng quay may m???n</Link>
                            </Menu.Item>
                        </Menu>
                    </UserChoice>
                </Col>
                <Col
                    className="gutter-row processing"
                    span={17}
                    style={{
                        height: 'auto',
                        border: '1px solid rgb(240 240 240)',
                        boxShadow: '0px 0px 5px 2px #e6e6e6',
                        padding: '16px',
                        background: '#fff',
                    }}
                >
                    <Switch>
                        {renderUserFileItem(FILE_USER)}
                        {renderUserFileItem(NOTIFICATION_USER)}
                        {renderUserFileItem(ORDER_WHEEL)}
                    </Switch>
                </Col>
            </Row>
        </Helmet>
    );
}

PurchaseOrder.propTypes = {};

export default PurchaseOrder;
