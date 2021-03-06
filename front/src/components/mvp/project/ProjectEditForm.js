import React, { useState } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { BundleButton } from "../../common/Button";
import { toStringDate, toObjectDate } from "../../common/DateUtil";
import * as Api from "../../../api";
import DatePicker from "react-datepicker";

/** 선택된 Project 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - ProjectEditForm
 */
function ProjectEditForm({ setIsEditing, project, setProjectList }) {
  const { id, title, description, from_date, to_date } = project.data;
  const [edit, setEdit] = useState({
    title,
    description,
    startDate: toObjectDate(from_date),
    endDate: toObjectDate(to_date),
  });
  const notSubAble = edit.title.length === 0 || edit.description.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 projects 업데이트 하기위해 서버로 put 요청
    try {
      const res = await Api.put(`projects/${id}`, {
        title: edit.title,
        description: edit.description,
        from_date: toStringDate(edit.startDate),
        to_date: toStringDate(edit.endDate),
      });

      setProjectList((cur) => {
        cur[project.index] = res.data;
        return [...cur];
      });
    } catch (err) {
      console.log(err);
    }

    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className="mb-3"
          value={edit.title}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <Form.Control
          type="text"
          name="description"
          className="mb-3"
          value={edit.description}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className="mt-3 mb-3">
        <Row>
          <Col xs={3}>
            <DatePicker
              selected={edit.startDate}
              onChange={(date) =>
                setEdit((prev) => ({ ...prev, startDate: date }))
              }
            />
          </Col>
          <Col xs={3}>
            <DatePicker
              selected={edit.endDate}
              onChange={(date) =>
                setEdit((prev) => ({ ...prev, endDate: date }))
              }
            />
          </Col>
        </Row>
      </Form.Group>
      {notSubAble ? (
        <Alert variant="danger">
          <p>내용을 입력해주세요.</p>
        </Alert>
      ) : null}
      <Form.Group>
        <Row className="justify-content-center" xs="auto">
          <BundleButton
            disabled={notSubAble}
            submitHandler={handleSubmit}
            setState={setIsEditing}
          />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
