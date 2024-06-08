// ** Reactstrap Imports
import {
  Button,
  CardHeader,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const CourseReplyCommentModal = ({
  id,
  title,
  describe,
  toggleModal,
  modal,
}) => {
  return (
    <Modal
      isOpen={modal === id}
      toggle={() => toggleModal(id)}
      className="modal-dialog-centered"
      key={id}
    >
      <ModalHeader toggle={() => toggleModal(id)}>
        <span className="fw-bold">عنوان نظر: </span>
        <span>{title}</span>
      </ModalHeader>
      <ModalBody toggle={() => toggleModal(id)}>
        <div className="d-flex mt-1 course-reply-comment-text">
          <span className="fw-bold">پیام: </span>
          <p>{describe}</p>
        </div>
        <div>
          <Label for="replyText">پیام شما:</Label>
          <Input
            type="textarea"
            id="replyText"
            placeholder="پیام شما ..."
            rows={3}
          />
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-start">
        <Button
          color="primary"
          onClick={() => setVisibility(!visibility)}
          outline
        >
          ارسال
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseReplyCommentModal;
