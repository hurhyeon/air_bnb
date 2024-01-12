import React,{useState} from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import palette from "../../styles/palette";
import Input from "../common/input"


const Container = styled.form`
    width:568px;
    padding: 32px;
    background-color:white;
    z-index:11;

    .mordal-close-x-icon{
        cursor:pointer;
        display:block;
        margin: 0 0 40px auto;
    }

    .input-wrapper{
        position: relative;
        margin-bottom: 16px;
    }
    .sign-up-password-input-wrapper {
        svg {
          cursor: pointer;
        }
      }
`;


const SignUpModal: React.FC =()=>{
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
      };
    
    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        };

    const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
            setLastname(event.target.value);
          };

    const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFirstname(event.target.value);
          };
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          };

    return (
        <Container>
            {/* <CloseXIcon className="mordal-close-x-icon"/> */}
            <div className="input-wrapper">
                <input placeholder="이메일 주소" type="email" name="email" onChange={onChangeEmail}/>
                {/* icon{<MailIcon/>} vaule={email} 이거인풋안에 들어가야함 */}
            </div>
            <div className="input-wrapper">
            <input placeholder="이름(예:길동)" onChange={onChangeLastname}/>
                {/* icon{<PersonIcon/>} vaule={Lastname} 이거인풋안에 들어가야함 */}
            </div>
            <div className="input-wrapper">
            <input placeholder="성(예:홍)" onChange={onChangeFirstname}/>
                {/* icon{<PersonIcon/>} vaule={Firstname} 이거인풋안에 들어가야함 */}
            </div>
            <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          />
          </div>
        </Container>
    )
};

export default SignUpModal;