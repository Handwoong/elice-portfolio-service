import React, { useState, useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { DatePickForm, toStringDate } from "../common/DateUtil";
import { UserContext, TechStackFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 프로젝트 추가하는 컴포넌트입니다.
 *
 * @returns {component} ProjectAddForm
 */
function TechStackAddForm() {
  const { portfolioOwnerId } = useContext(UserContext);
  const { setReFetching } = useContext(TechStackFetchContext);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 projects 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`techstack/create`, {
        user_id: portfolioOwnerId,
        title: addTitle,
        description: addDescription,
        // from_date: toStringDate(startDate),
        // to_date: toStringDate(endDate),
      });

      setAddTitle("");
      setAddDescription("");
    } catch (err) {
      console.log(err);
    }

    setReFetching(new Date());
    // setStartDate(new Date());
    // setEndDate(new Date());
    setIsAdding(false);
  };

  return (
    <>
      {!isAdding ? (
        <Row className="justify-content-center" xs="auto">
          <PlusButton setState={setIsAdding} />
        </Row>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="tech">
            <Form.Control
              type="text"
              placeholder="기술명"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="details">
            <Form.Control
              type="text"
              placeholder="상세정보"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group className="mt-3">
            <Row>
              <Col xs={3}>
                <DatePickForm startDate={startDate} setState={setStartDate} />
              </Col>
              <Col xs={3}>
                <DatePickForm startDate={endDate} setState={setEndDate} />
              </Col>
            </Row>
          </Form.Group> */}

          <Row className="justify-content-center" xs="auto">
            <BundleButton submitHandler={handleSubmit} setState={setIsAdding} />
          </Row>
        </Form>
      )}
    </>
  );
}

export default TechStackAddForm;
