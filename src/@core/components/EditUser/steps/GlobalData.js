// ** React Imports
import { Fragment, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Core Imports
import { dateFormatter } from "../../../../core/utils/date-formatter.utils";

// ** Utils
import { isObjEmpty } from "@utils";
import { convertDateToPersian } from "../../../../core/utils/date-helper.utils";
import { selectThemeColors } from "../../../../utility/Utils";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";

// ** Custom Components

const GlobalData = ({ stepper, user, setGlobalData }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const {
        fName,
        lName,
        nationalCode,
        gender,
        userAbout,
        homeAdderess,
        birthDay,
      } = e;

      const convertBirthday = dateFormatter.format(birthDay);

      setGlobalData({
        fName,
        lName,
        nationalCode,
        gender,
        userAbout,
        homeAdderess,
        convertBirthday,
      });

      stepper.next();
    }
  };

  const convertBirthday = convertDateToPersian(user?.birthDay);

  useEffect(() => {
    if (user) {
      setValue("fName", user.fName);
      setValue("lName", user.lName);
      setValue("userAbout", user.userAbout);
      setValue("gmail", user.gmail);
      setValue("nationalCode", user.nationalCode);
      setValue("gender", user.gender);
      setValue("homeAdderess", user.homeAdderess);
      setValue("birthDay", convertBirthday);
    }
  }, [user, setValue]);

  const userGenderOptions = [
    { label: "مذکر", value: "true" },
    { label: "مونث", value: "false" },
  ];

  const userGender = user && {
    label: `${user?.gender ? "مذکر" : "مونث"}`,
    value: user?.gender,
  };

  const animatedComponents = makeAnimated();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات عمومی کاربر</h5>
        <small className="text-muted">
          در این بخش میتوانید اطلاعات عمومی کاربر را ویرایش کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="fName">
              نام کاربر
            </Label>
            <Controller
              id="fName"
              name="fName"
              control={control}
              render={({ field }) => (
                <Input id="fName" invalid={errors.fName && true} {...field} />
              )}
            />
            {errors.fName && (
              <FormFeedback>{errors.fName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="lName">
              نام خانوادگی کاربر
            </Label>
            <Controller
              control={control}
              id="lName"
              name="lName"
              render={({ field }) => (
                <Input id="lName" invalid={errors.title && true} {...field} />
              )}
            />
            {errors.lName && (
              <FormFeedback>{errors.lName.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="nationalCode">
              کد ملی کاربر
            </Label>
            <Controller
              control={control}
              id="nationalCode"
              name="nationalCode"
              render={({ field }) => (
                <Input
                  id="nationalCode"
                  placeholder="تعداد جلسات دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.nationalCode && (
              <FormFeedback>{errors.nationalCode.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="gender">
              جنسیت کاربر
            </Label>
            {user && userGender && (
              <Controller
                id="gender"
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    name="gender"
                    id="gender"
                    options={userGenderOptions}
                    defaultInputValue={userGender.label}
                    isClearable
                    components={animatedComponents}
                    value={user.gender}
                    {...field}
                  />
                )}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Label className="form-label" for="userAbout">
              درباره کاربر
            </Label>
            <Controller
              control={control}
              id="userAbout"
              name="userAbout"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="userAbout"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.userAbout && (
              <FormFeedback>{errors.userAbout.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="form-label" for="homeAdderess">
              آدرس کاربر
            </Label>
            <Controller
              control={control}
              id="homeAdderess"
              name="homeAdderess"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="homeAdderess"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.homeAdderess && (
              <FormFeedback>{errors.homeAdderess.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md="6" className="mt-2">
            <Label className="form-label d-block" for="birthDay">
              تاریخ تولد کاربر
            </Label>
            <div className="coursesDatePickerWrapper">
              {user && (
                <Controller
                  control={control}
                  id="birthDay"
                  name="birthDay"
                  render={({ field }) => (
                    <DatePicker
                      name="birthDay"
                      id="birthDay"
                      value={convertBirthday}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass="form-control coursesDatePickerInput"
                      {...field}
                    />
                  )}
                />
              )}
            </div>
            {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button type="button" color="primary" className="btn-prev" disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default GlobalData;
