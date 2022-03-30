"use strict";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const resetBtn = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// pixel size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// initialize
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 그릴 선 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
};

function stopPainting() {
    painting = false;
};

// 마우스 움직일 때 이벤트
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { // 클릭하고 움직이면 더이상 실행되지 않음, 클릭하지 않고 움직였을 때 path를 시작.
        // !painting이 true가 될 때 실행되기 때문에 painting이 false가 되면 실행됨
        ctx.beginPath(); // path 만듦
        ctx.moveTo(x, y); // path를 x, y로 옮김
    } else {
        // 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다.
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

// 브러쉬, 채우기 색상 설정
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 브러쉬 굵기
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
};

// Fill button click
function handleModeClick(event) {
    if(filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    };
};

// Canvas를 클릭했을 때 사각형이 만들어짐(채워짐)
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
};

// Reset button 클릭 시 브라우저 새로고침
function handleResetClick(event) {
    window.location.reload();
}

// Save Button 눌렀을 시 저장
function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image; // url
    link.download = "PaintJS[🎨]";
    // link.click();
}

// 우클릭 저장 막기
function handleCM(event) {
    event.preventDefault();
};

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); // 마우스를 놓았을 때
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

// console.log(Array.from(colors));

if(colors) {
    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorClick)
    );
};

if(range) {
    range.addEventListener("input", handleRangeChange);
    // range event는 input에 반응
};

if(mode) {
    mode.addEventListener("click", handleModeClick);
};

if(resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}