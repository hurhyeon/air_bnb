import React, {useState} from "react";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import Link from "next/link";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";
import SignUpModal from "./auth/SignUpModal";

const Container = styled.div`
    position:sticky;
    top:0;
    width:100%;
    height:80px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 80px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    z-index: 10;
    .header-logo-wrapper{
        display: flex;
        align-items: center;
        .header-logo{
            margin-right: 6px;
        }
    }

    .header-auth-buttons {
        .header-sign-up-button {
        height: 42px;
        margin-right: 8px;
        padding: 0 16px;
        border: 0;
        border-radius: 21px;
        background-color: white;
        cursor: pointer;
        outline: none;
        font-weight: 600;
        &:hover {
            background-color: ${palette.gray_f7};
        }
        }
        .header-login-button {
        height: 42px;
        padding: 0 16px;
        border: 0;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        border-radius: 21px;
        background-color: white;
        cursor: pointer;
        outline: none;
        font-weight: 600;
        &:hover {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
        }
    }
    .modal-wrapper{
        width: 100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top:0;
        left:0;
        .modal-background{
            position: absolute;
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.75);
            z-index:10;
        }
        .modal-content{
            width: 400px;
            height:400px;
            background-color: white;
            z-index:11;
        }
    }
`;
{/* <ModalPortal closePortal={()=> setModalOpened(false)}> */}
const Header: React.FC = () =>{
    const {openModal, ModalPortal} = useModal();
    return(
        <Container>
        <Link href="/" legacyBehavior>
            <a className="header-logo-wrapper">
                {/* 왜 이미지 안뜨냐 ㅅㅂ
                <AirbnbLogoIcon className="header-logo"/>
                <AirbnbLogoTextIcon /> */}
            </a>
        </Link>
        <div className="header-auth-buttons">
            <button type="button" className="header-sign-up-button" onClick={openModal}>
                회원가입
            </button>
            <button type="button" className="header-login-button">
                로그인
            </button>
        </div>
        <ModalPortal>
            <SignUpModal/>
        </ModalPortal>
        </Container>
    );
};

export default Header;