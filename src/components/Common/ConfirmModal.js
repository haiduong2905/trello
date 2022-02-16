import { Modal, Button } from 'react-bootstrap'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_COMFIRM } from 'utilities/constants'

function ConfirmModal(props) {
    const { title, content, show, onAction } = props
    return (
        <Modal
            show={show}
            onHide={() => onAction(MODAL_ACTION_CLOSE)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onAction(MODAL_ACTION_COMFIRM)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal