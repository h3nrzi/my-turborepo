import { FC, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import Product from 'domain/entities/ProductEntity';

interface Props {
  product: Product;
  onAddToCart(qty: number): void;
}

const ProductDetail: FC<Props> = ({ product, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  return (
    <Row className="gap-5 gap-md-0">
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid thumbnail />
      </Col>

      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              امتیاز: {product.rating}/5 ({product.numReviews} نظر)
            </div>
          </ListGroup.Item>
          <ListGroup.Item>توضیحات: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>قیمت:</Col>
                <Col>
                  <strong>{product.price} $</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>وضعیت:</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>تعداد</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(+e.currentTarget.value)}
                    >
                      {Array.from({ length: product.countInStock })
                        .map((_, i) => i + 1)
                        .map((num) => (
                          <option value={num} key={num} className="text-center">
                            {num}
                          </option>
                        ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item className="text-center">
              <Button
                disabled={product.countInStock === 0}
                className="w-100"
                onClick={() => onAddToCart(qty)}
              >
                افزودن به سبد خرید
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;
