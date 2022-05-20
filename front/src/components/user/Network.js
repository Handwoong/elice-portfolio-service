import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import UserCard from "./UserCard";
import Category from "./Category";
import { UserContext } from "../common/context/UserContext";

function Network() {
  const navigate = useNavigate();
  const { users, userState } = useContext(UserContext);
  //selected category
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    if (!userState.user) {
      navigate("/");
      return;
    }
  }, [userState.user, navigate]);

  return (
    <Container
      fluid
      style={{ height: "auto", minHeight: "100%", paddingBottom: "250px" }}
    >
      <Category setCategory={setCategory} />
      {category === "전체" && (
        <Row xs="auto">
          {users.map((user) => (
            <Col sm={3} key={user.id}>
              <UserCard user={user} isNetwork />
            </Col>
          ))}
        </Row>
      )}
      {category !== "전체" && (
        <Row xs="auto">
          {users.map((user) => {
            if (user.user_category === category) {
              return (
                <Col sm={3} key={user.id}>
                  <UserCard user={user} isNetwork />
                </Col>
              );
            }
            return null;
          })}
        </Row>
      )}
    </Container>
  );
}

export default Network;
