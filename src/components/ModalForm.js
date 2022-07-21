import { useState } from 'react';
import messageService from '../services/messageService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalForm = ({ selectedMessage, setSelectedMessage, messages, handleShowModalForm, showModalForm, setMessages, onResend }) => {
  console.log("from modal:", selectedMessage)
  const [body, setBody] = useState(selectedMessage.Message);
  const [attributes, setAttributes] = useState(selectedMessage.Attributes);

  const handleModalClose = () => {
    console.log('before close:', showModalForm)
    handleShowModalForm();
    console.log('after close:', showModalForm)
    setSelectedMessage([]);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  
  const handleAttributesChange = (e) => {
    setAttributes(e.target.value);
  };

  const handleUpdateAndSave = async (e) => {
    e.preventDefault();

    const updatedMessage = {
      id: selectedMessage.id,
      Message: body,
      Attributes: JSON.parse(attributes),
    }

    await messageService.updateMessage(selectedMessage.id, updatedMessage);
    const updatedMessages = messages.map(msg => {
      if (msg.id === selectedMessage.id) {
        updatedMessage["Attributes"] = JSON.stringify(updatedMessage["Attributes"]);
        return updatedMessage;
      } else {
        return msg;
      }
    })

    setMessages(updatedMessages);

    clearFields();
    handleShowModalForm();
  }

  const handleUpdateAndResend = async (e) => {
    e.preventDefault();

    const updatedMessage = {
      id: selectedMessage.id,
      Message: body,
      Attributes: JSON.parse(attributes),
    }

    await messageService.updateMessage(selectedMessage.id, updatedMessage);
    
    updatedMessage["Attributes"] = JSON.stringify(updatedMessage["Attributes"]);

    onResend(updatedMessage);
    handleShowModalForm();
  }

  const clearFields = () => {
    setBody('');
    setAttributes('');
  }

  return (
    <>
      <Modal show={showModalForm} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="id"
            >
              <Form.Label>Message ID</Form.Label>
              <div>
                <Form.Text>{selectedMessage.id}</Form.Text>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="body"
            >
              <Form.Label>Message Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={body}
                onChange={handleBodyChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="attributes"
            >
              <Form.Label>Message Attributes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={attributes}
                onChange={handleAttributesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateAndSave}>
            Update and save
          </Button>
          <Button variant="primary" onClick={handleUpdateAndResend}>
            Update and redrive
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;