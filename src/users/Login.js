import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();

  const [userDTO, setUser] = useState({
    statusCode: 0,
    message: "",
    token: "",
    username: "",
    password: "",
  });

  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event) => {
    setUser({ ...userDTO, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://43.201.15.234:4040/auth/signin", userDTO)
      .then((response) => {
        if (response.data.statusCode === 500) {
          alert(response.data.username + " 사용자가 등록되어 있지 않습니다!!!");
        } else {
          alert(response.data.username + " 사용자가 로그인되었습니다");
          //          alert(response.data.token + " token을 받았습니다");
          if (response.data.token) {
            sessionStorage.setItem("jwt", response.data.token);
            setAuth(true);
          }
        }
      });
  };
  if (isAuthenticated) {
    navigate("/auth/members");
  } else {
    return (
      <div>
        <div>
          <p></p>
          <h1 classname="text-center">로그인</h1>
          <p></p>
          <Stack spacing={2} alignItems="center" mt={2}>
            <TextField
              name="username"
              label="사용자 이름"
              placeholder="username을 입력하세요."
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              label="사용자 암호"
              placeholder="password를 입력하세요."
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
          로그인
        </button>
        <Link className="btn btn-outline-danger mx-2" to="/auth/join">
          사용자 등록
        </Link>
        <br />
        <br />
        <p>
          <b>
            <h5> 안동장씨시조(始祖)</h5>
            처음 이름은 길(吉), 자(字)는 영보(寧父), 호(號)는 포음(圃蔭)이고,
            시호(諡號)는 충헌(忠獻)이다. 후일 장정필(張貞弼)로 개명하였다.
          </b>
        </p>

        <p>
          <b>
            <h6>화산부원군(花山府院君)</h6>
            장정필의 15세손 장사길은 1390년(공양왕 2)에 밀직부사(密直副使)로
            이성계의 위화도회군에 가담하여 공신에 책록되었다. 1392년(태조 1)에
            조선 개국에 공을 세워
            <br />
            개국일등공신(開國一等功臣)에 녹훈되었고, 동지절제사(同知節制事)를
            지냈으며, 1398년에 이방원의 난을 도와 정사이등공신으로
            화산부원군(花山府院君)에
            <br /> 진봉(進封)되었다.
          </b>
        </p>
        <p>
          <b>
            <h6>선전관(宣傳官) 장세강(張世綱)</h6>
            장세강(張世綱)[1525~1592]의 부친 장한공(張漢公)은 중종 때 정국공신
            영산군(永山君)으로 시호는 충양(忠襄)이다. 장세강은 자는
            기중(紀中)이고,
            <br /> 무과에 급제하여 선전관(宣傳官)이 되었고, 임진왜란 때
            신립(申砬) 장군의 종사관으로 탄금대 전투에 출전하였다가
            달천(達川)에서 순절(殉節)하였다.
          </b>
        </p>
      </div>
    );
  }
}
export default Login;
