import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  const [userDTO, setUserDTO] = useState([]);

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
        <Link className="btn btn-outline-primary" to="/auth/adduser">
          종친회원 등록
        </Link>
        <Link className="btn btn-outline-primary" to={"/auth/printuser"}>
          회원내역 출력
        </Link>
        <Link className="btn btn-outline-primary" to="/auth/signout">
          로그아웃
        </Link>
      </div>

      <div class="d-inline p-2 fs-2 text-center shadow">종친회 회원 현황</div>
      <table className="table border shadow">
        <thead>
          <tr className="text-start">
            <th scope="col"></th>
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
            .map((member, index) => {
              return (
                <tr className="text-start">
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <th className="text-center" scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{member.name}</td>
                  <td>{member.father}</td>
                  <td>{member.address}</td>
                  <td>{member.telno}</td>
                  <td>{member.numberth}</td>
                  <td>{member.birthday}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2 btn-sm"
                      to={`/viewuser/${member.id}`}
                    >
                      상세보기
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2 btn-sm"
                      to={`/edituser/${member.id}`}
                    >
                      수정
                    </Link>
                    <Link
                      className="btn btn-danger mx-2 btn-sm"
                      to={`/deleuser/${member.id}`}
                    >
                      삭제
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
