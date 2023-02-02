import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, } from 'react-bootstrap'

const Upload = () => {

const [file, setFile] = useState(null)
const [isLoading, setisLoading] = useState(false)

const uploadHandler = async () => {
    setisLoading(true)
    const url = "";
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "code unik profile di cloud database");

    const data = await fetch(url, {
        method : "POST",
        body : formData
    }).then(res => res.json().then(data => {
        setisLoading(false);
        setFile(null)
    })).catch(error => console.log(error));
}

const handleFileChange = (event) => {
setFile(event.target.files[0])
}

  return (
    <div>
        <Container className='bg-secondary pb-5'>
            <Row className='m-3'>
                <Col>
                <h1 className='text-light mt-3' >Upload media file</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label className='mt-3'>Select any media file (Picture or Video) :</Form.Label>
                        <Form.Control className='mt-3' type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button disabled={isLoading || file === null } variant="primary" type="button" onClick={uploadHandler}>
                        {isLoading ? 'Loading...' : 'Upload'}
                    </Button>
                </Form>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center mt-5'>
                {file && file.type === "image/jpeg" && <img className='img-thumbnail w-50 border' src={URL.createObjectURL(file)}/>}
                </Col>
                <Col>
                {file && file.type === "video/mp4" && <video width="320" height="240" controls>
                    <source src={URL.createObjectURL(file)} type="video/mp4" />
                </video>}
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Upload