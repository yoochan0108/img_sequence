//현재수치값 / 전체수치값 * 100 (백분율)
//현재수치값 / 전체수치값 * 200 (이백분율)

const num = 200;
const section = document.querySelector('section');
const aside = document.querySelector('aside');
const loadingNum = document.querySelector('aside p span');
const imgs = createImgs(section, num);
const delay = convertSpeed(aside);

window.addEventListener('mousemove', (e) => {
	const percent = getPercent(e, num);
	activation(imgs, percent);
});

function getPercent(e, num) {
	const curPos = e.pageX;
	const wid = window.innerWidth;
	return parseInt((curPos / wid) * num);
}

function createImgs(target, num) {
	for (let i = 0; i < num; i++) {
		const img = document.createElement('img');
		const src = document.createAttribute('src');
		src.value = `img/pic${i}.jpg`;
		img.setAttributeNode(src);
		target.append(img);
	}
	const imgs = target.querySelectorAll('img');
	let count = 0;
	//만약 이미지요소의 소스이미지에 문제 발생시 대체 이미지 처리
	imgs.forEach((img) => {
		img.onerror = () => {
			img.setAttribute('src', 'img/thumb1.jpg');
		};
		img.onload = () => {
			count++;
			const percent = parseInt((count / num) * 100);
			loadingNum.innerText = percent;
			if (count === num) {
				console.log('모든 소스이미지 로딩 완료');
				aside.classList.add('off');
				setTimeout(() => {
					aside.remove();
				}, delay);
			}
		};
	});
	return imgs;
}

function activation(arr, index) {
	arr.forEach((el) => (el.style.display = 'none'));
	arr[index].style.display = 'block';
}
//인수로 transition-duration값을 구해야되는 DOM요소를 전달받음
function convertSpeed(el) {
	//해당요소의 transition-duration값을 재연산해서 가져온다음
	//숫자로 바꾸고 *1000을 해서 밀리세컨드 형태로 변환
	const result = getComputedStyle(el).transitionDuration;
	return parseFloat(result) * 1000;
}
