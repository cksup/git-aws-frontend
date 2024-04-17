import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleUser() {
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

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/auth/member/${id}`);
    setUserDTO(result.data);
  };

  const token = sessionStorage.getItem("jwt");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (token != null) {
      await axios
        .delete(`http://43.201.15.234:4040/auth/member/${id}`)
        .then((Response) => {
          alert("정보가 삭제 되었습니다.!!");
          navigate("/auth/members");
        });
    } else {
      alert("로그인을 한후 삭제 작업을 하세요!!");
      navigate("/");
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
      <h2 className="text-center">종친회 회원 삭제</h2>
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
          ></input>
          <label class="fw-bolder" for="floatingInput5">
            생년월일
          </label>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          회원 삭제
        </button>
        <Link className="btn btn-outline-danger mx-2" to="/auth/members">
          회원 현황
        </Link>
      </form>
    </div>
  );
}
