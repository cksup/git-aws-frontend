import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [userDTO, setUserDTO] = useState({
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

  const token = sessionStorage.getItem("jwt");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userDTO.name) {
      alert("이름을 입력하세요!!!");
      return;
    }
    if (token != null) {
      await axios
        .post("http://43.201.15.234:4040/auth/savemember", userDTO)
        .then((response) => {
          if (response.data.statusCode === 500) {
            alert("사용자가 등록되어 있지 않습니다!!!");
            navigate("/auth/signin");
          } else {
            setUserDTO({
              name: "",
              father: "",
              address: "",
              telno: "",
              numberth: "",
              birthday: "",
            });
          }
        });
    }
  };

  if (token === null) {
    navigate("/auth/signin");
  } else {
    return (
      <div>
        <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
          <h2 className="text-center">종친 회원 등록</h2>
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

            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={onSubmit}
            >
              회원 등록
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/auth/members">
              회원 현황
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
