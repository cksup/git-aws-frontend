import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./Report.css";

function PrintUser() {
  let navigate = useNavigate();

  const [userDTO, setUserDTO] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "저장할 파일 이름",
    //   onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능"),
  });

  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    if (token != null) {
      const response = await axios.get(
        "http://43.201.15.234:4040/auth/members"
      );
      setUserDTO(response.data);
    } else {
      alert("로그인을 한후 작업을 해주세요!!");
      navigate("/auth/signin");
    }
  };

  return (
    <div>
      <div class="d-inline p-2 gap-2 d-md-flex justify-content-md-end">
        <Link className="btn btn-outline-primary" to="/auth/members">
          종친회원 현황
        </Link>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={handlePrint}
        >
          회원내역 출력
        </button>
        <Link className="btn btn-outline-primary" to="/auth/signout">
          로그아웃
        </Link>
      </div>

      <div ref={componentRef} className="report">
        <div class="d-inline p-2 fs-2 text-center shadow">종친회 회원 내역</div>
        <table className="table border shadow">
          <thead>
            <tr class="text-start">
              <th scope="col">번호</th>
              <th scope="col">이&nbsp;&nbsp;&nbsp;름</th>
              <th scope="col">父성함</th>
              <th scope="col">주 소</th>
              <th scope="col">전화번호</th>
              <th scope="col">몇代孫</th>
              <th scope="col">생년월일</th>
            </tr>
          </thead>
          <tbody>
            {[...userDTO]
              .sort(function (a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
              })
              .map((product, index) => {
                return (
                  <tr className="text-start">
                    <th className="text-center" scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{product.name}</td>
                    <td>{product.father}</td>
                    <td>{product.address}</td>
                    <td>{product.telno}</td>
                    <td>{product.numberth}</td>
                    <td>{product.birthday}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PrintUser;
