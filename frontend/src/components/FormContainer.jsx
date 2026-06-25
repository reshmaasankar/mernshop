import {Container, Col, Row,} from 'react-bootstrap'

function FormContainer({children}) {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer