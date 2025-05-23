import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../../components/CardComponent/CardComponent'
import { Col, Row, Typography, Breadcrumb } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const { Title } = Typography;

const TypeProductPage = () => {
    return (
        <div className='max-w-7xl mx-auto px-4'>
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { title: 'Trang chủ', href: '/' },
                    { title: 'Danh mục sản phẩm' }
                ]}
                separator={<RightOutlined />}
                style={{
                    padding: '20px 0',
                    fontSize: '16px',
                }}
            />

            {/* Nội dung chính */}
            <Row gutter={[16, 16]}>
                {/* Sidebar */}
                <Col
                    xs={24}
                    md={6}
                    style={{
                        padding: '16px',
                        borderRadius: '8px',
                        position: 'sticky',
                        top: 0,
                        alignSelf: 'flex-start',
                    }}
                >
                    <NavbarComponent />
                </Col>

                {/* Khu vực hiển thị sản phẩm */}
                <Col xs={24} md={18}>
                    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
                            Danh mục sản phẩm
                        </Title>

                        <Row gutter={[16, 16]}>
                            {[...Array(9)].map((_, index) => (
                                <Col key={index} xs={24} sm={12} md={8}>
                                    <CardComponent />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TypeProductPage
