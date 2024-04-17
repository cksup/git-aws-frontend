import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [userDTO, setUserDTO] = useState({
    id: 0,
    name: "",
    father: "",
    address: "",
    telno: "",
    numberth: "",
    birthday: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `http://43.201.15.234:4040/auth/member/${id}`
    );
    setUserDTO(result.data);
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
      <h2 className="text-center">종친회 회원 상세</h2>
      <div class="d-md-flex justify-content-md-end">
        <Link className="btn btn-outline-primary" to="/auth/signout">
          로그아웃
        </Link>
      </div>
      <form>
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
            父 성함
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
      </form>
      <Link className="btn btn-primary my-2" to={"/auth/members"}>
        종친회회원현황
      </Link>
    </div>
  );
}
