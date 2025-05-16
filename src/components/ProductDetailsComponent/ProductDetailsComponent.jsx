import { Col, Image, Row, Typography, Button } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const ProductDetailsComponent = () => {
    const product = {
        name: 'Tay cầm BIGBIG WON RAINBOW 2 SE',
        description:
            'Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG.Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG.Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG.Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG.Tay Cầm BIGBIG WON RAINBOW 2 SE Không Dây 2.4G Chơi Game FC Online / PC / Laptop / Switch / IOS / Android | HÀNG MỚI VỀ 2024 – MÀU HỒNG.',
        price: 1290000,
        images: [
            'https://shoptaycam.com/wp-content/uploads/2024/09/Tay-C%E1%BA%A7m-BIGBIG-WON-RAINBOW-2-SE-Kh%C3%B4ng-D%C3%A2y-2.4G-02-600x600.png',
            'https://shoptaycam.com/wp-content/uploads/2024/09/Tay-C%E1%BA%A7m-BIGBIG-WON-RAINBOW-2-SE-Kh%C3%B4ng-D%C3%A2y-2.4G-01-600x600.png',
            'https://shoptaycam.com/wp-content/uploads/2024/09/Tay-C%E1%BA%A7m-BIGBIG-WON-RAINBOW-2-SE-Kh%C3%B4ng-D%C3%A2y-2.4G-02-600x600.png',
        ],
        status: 'Hết hàng'
    };

    return (
        <div className='max-w-7xl mx-auto my-10'>

            <Row gutter={[32, 32]} className=" bg-white shadow rounded p-10">
                <Col xs={24} md={10}>
                    <Image.PreviewGroup>
                        <Image
                            src={product.images[0]}
                            alt="main product"
                            width="100%"
                            style={{ borderRadius: 8 }}
                        />
                        <Row gutter={16} className="mt-4">
                            {product.images.map((img, index) => (
                                <Col span={8} key={index}>
                                    <Image src={img} alt={`product-${index}`} />
                                </Col>
                            ))}
                        </Row>
                    </Image.PreviewGroup>
                </Col>
                <Col xs={24} md={14}>
                    <Title level={2}>{product.name}</Title>
                    <Title level={3} className="text-green-600">
                      Giá:  {product.price.toLocaleString()} ₫
                    </Title>
                    <Paragraph className="text-gray-700">Tình trạng: {product.status}</Paragraph>

                    <Button type="primary" size="large" className="mt-4">
                        Thêm vào giỏ hàng
                    </Button>

                    <Paragraph className="text-gray-700 mt-10">Mô tả:</Paragraph>      

                    <Paragraph className="text-gray-700 ">{product.description}</Paragraph>
                </Col>




            </Row>


        </div>

    );
};

export default ProductDetailsComponent;
