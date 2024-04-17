import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [userDTO, setUserDTO] = useState({
    id: 0,
    name: "",
    father: "",
    address: "",
    telno: "",
    numberth: "",
    birthday: "",
  });

  const onInputChange = (e) => {
    setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `http://43.201.15.234:4040/auth/member/${id}`
    );
    setUserDTO(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userDTO.name) {
      alert("이름을 입력하세요!!!");
      return;
    }
    await axios.put(`http://43.201.15.234:4040/auth/member/${id}`, userDTO);
    alert("정보가 수정 되었습니다.!!");
    navigate("/auth/members");
  };

  return (
    <div>
      <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
        <h2 className="text-center">종친회 회원 수정</h2>
        <div class="d-md-flex justify-content-md-end">
          <Link className="btn btn-outline-primary" to="/auth/signout">
            로그아웃
          </Link>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-floating">
            <input
              type="text"
              name="name"
              className="form-control"
              id="floatingInput1"
              value={userDTO.name}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput1">
              이름
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="father"
              className="form-control"
              id="floatingInput2"
              value={userDTO.father}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput2">
              아버지 성함
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="address"
              className="form-control"
              id="floatingInput3"
              value={userDTO.address}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput3">
              주소
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="telno"
              className="form-control"
              id="floatingInput4"
              value={userDTO.telno}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput4">
              전화번호
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="numberth"
              className="form-control"
              id="floatingInput5"
              value={userDTO.numberth}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput5">
              몇대손
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="birthday"
              className="form-control"
              id="floatingInput5"
              value={userDTO.birthday}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label class="fw-bolder" for="floatingInput5">
              생년월일
            </label>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            회원 수정
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/auth/members">
            회원 현황
          </Link>
        </form>
      </div>
    </div>
  );
}
