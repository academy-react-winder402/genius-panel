// ** Reactstrap Imports
import { Button, Card } from "reactstrap";

// ** Third Party Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import FileUploaderSingle from "../../FileUploaderSingle";

const UploadImage = ({ stepper, files, setFiles }) => {
  const handleNext = () => {
    if (files) stepper.next();
  };

  return (
    <>
      <div className="content-header">
        <h5 className="mb-0">عکس دوره</h5>
        <small className="text-muted">
          در این بخش باید عکس دوره را آپلود کنید.
        </small>
      </div>
      <Card>
        <FileUploaderSingle files={files} setFiles={setFiles} />
      </Card>
      <div className="d-flex justify-content-between">
        <Button color="secondary" className="btn-prev" outline disabled>
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">قبلی</span>
        </Button>
        <Button
          type="submit"
          color="primary"
          className="btn-next"
          onClick={handleNext}
        >
          <span className="align-middle d-sm-inline-block d-none">بعدی</span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </>
  );
};

export default UploadImage;
