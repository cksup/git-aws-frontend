import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {
  let navigate = useNavigate();

  const [userDTO, setUserDTO] = useState({
    statusCode: 0,
    message: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserDTO({ ...userDTO, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://43.201.15.234:4040/auth/join", userDTO)
      .then((response) => {
        console.log(response.data.statusCode);
        if (response.data.statusCode === 400) {
          alert(userDTO.username + " 와 동일한 사용자가 등록되어 있습니다!!!");
        } else {
          alert(userDTO.username + " 사용자가 등록되었습니다!!!");
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div>
        <p></p>
        <h1 className="text-center">사용자 등록</h1>
        <p></p>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField
            name="username"
            label="사용자 이름"
            placeholder="사용자 이름을 입력하세요."
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="사용자 암호"
            placeholder="사용자 암호를 입력하세요."
            onChange={handleChange}
          />
        </Stack>
      </div>
      <p></p>
      <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={onSubmit}
      >
        등록
      </button>
      <Link className="btn btn-outline-danger mx-2" to="/auth/signin">
        취소
      </Link>
    </div>
  );
}

export default Join;
