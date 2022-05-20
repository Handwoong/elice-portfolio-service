import { Dropdown, DropdownButton } from "react-bootstrap";

/** category list dropdown
 *
 * @param {string} setCategory -category state
 * @returns {component} Category dropdown
 */
function Category({ setCategory }) {
  return (
    <DropdownButton
      id="dropdown-variants-Secondary"
      variant="secondary"
      title="카테고리 선택"
      className="mb-3"
    >
      <Dropdown.Item onClick={() => setCategory("전체")}>전체</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => setCategory("개발자")}>
        개발자
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setCategory("예술가")}>
        예술가
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setCategory("마피아")}>마피아</Dropdown.Item>
    </DropdownButton>
  );
}

export default Category;
