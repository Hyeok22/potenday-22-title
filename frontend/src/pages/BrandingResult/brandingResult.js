import React, { useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import resizer from "react-image-file-resizer";

import colorPaletteImage from "../../assets/color-palette.png";

import "./brandingResult.css";

const BrandingResult = () => {
    const [kitColor, setKitColor] = useState('#00b894');

    const fileExt = 'png';
    const fileWidth = 1020;
    const fileHeight = 306;

    const description = `저는 프론트엔드 및 백엔드 개발에 특화된 풀스택 개발자 이용우입니다. 3개의 프로젝트를 통해 React,
                            Node.js 등 다양한 기술 스택을 활용하여 현 서비스 개발을 주도하는 코드 속에 삶을 담는 개발자입니다.
                            창업을 통해 시너지를 창출하며, 새로운 기술 학습에 적극적으로 참여합니다.`;

    const resizeFile = (file, fileInfo) => new Promise(resolve => {
        resizer.imageFileResizer(file, fileInfo.width, fileInfo.height, `${fileInfo.ext}`,
            100,
            0,
            uri => {
                resolve(uri);
            }, 'blob', fileInfo.width, fileInfo.height);
    });

    const onDownloadBtn = () => {
        const kit = document.getElementById('branding-kit');
        const fileName = 'kit';
        const fileInfo = {
            ext: fileExt,
            width: fileWidth,
            height: fileHeight
        }

        domtoimage.toBlob(kit).then(async blob => {
            const file = await resizeFile(blob, fileInfo);
            saveAs(file, `${fileName}.${fileInfo.ext}`);
        });
    };

    return (
        <div className="result-container">
            {/* 상단 소개글 섹션 */}
            <div className="intro-section">
                <h2 className="intro-title">용우님을 위한 퍼스널 브랜딩을 완료했어요</h2>
                <p className="intro-text">
                    GenIo가 단 2분만에 용우님에게 맞는 퍼스널 브랜딩 문구와 색상을 완성했어요.<b />
                    플랫폼 별로 적용할 수 있는 레이아웃과 색상을 선택 후 이미지로 저장해보세요.
                </p>
            </div>

            {/* 플랫폼 선택 버튼 */}
            <div className="platform-btn-list">
                <button className="platform-btn active">
                    기본
                </button>
                <button className="platform-btn">
                    링크드인
                </button>
                <button className="platform-btn">
                    인스타그램
                </button>
                <button className="platform-btn">
                    포트폴리오
                </button>
            </div>

            {/* 컬러 팔레트 */}
            <div className="color-palette">
                <buuton className="color-palette-btn">
                    <img className="color-palette-icon" src={colorPaletteImage} onclick="" />
                </buuton>
                {['#2d3436', '#0984e3', '#00b894', '#6c5ce7'].map((color) => (
                    <div
                        key={color}
                        className={`color-chip${color == kitColor ? " active" : ""}`}
                        style={{ background: `linear-gradient(to left, ${color}, #ffffff 140%)` }}
                        onClick={() => setKitColor(color)}
                    />
                ))}
            </div>


            <div className="kit-box">
                {/* 프로필 카드 */}
                <p className="kit-standard">1020 x 306</p>
                <div id="branding-kit" className="kit-container"
                    style={{ background: `linear-gradient(to left, ${kitColor}, #ffffff 120%)` }}>
                    <div className="kit-content">
                        <h1 className="kit-title">
                            코드 속에 삶을 담는 개발자, <span className="name-highlight">이용우</span>입니다.
                        </h1>

                        <p className="kit-description">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* 저장 버튼 */}
            <button className="save-button" onClick={onDownloadBtn}>이미지로 저장하기</button>
        </div>
    );
};

export default BrandingResult;