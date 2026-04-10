// JavaScriptファイル (script.js)

// オーディオコンテキストを作成
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 音声ファイルを読み込む関数
async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, resolve, reject);
    });
}

// 音声バッファを保存するオブジェクト
const soundBuffers = {};

// 事前に音声を読み込んでおく（プリロード）
async function preloadSounds() {
    soundBuffers.door_closing1 = await loadSound('../sounds/door_closing1.mp3');
    soundBuffers.puff = await loadSound('../sounds/puff.mp3');
}

// 音を再生する関数
function playWebAudioSound(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination); // 最終的な出力先（スピーカーなど）に接続
    source.start(0); // 0秒から再生開始
}

// ページ読み込み時にプリロードを実行
window.onload = preloadSounds;

const haru_up = document.getElementById('haru_up');
const haru_down = document.getElementById('haru_down');

let playingUp = false;
let playingDown = false;

haru_up.addEventListener('click', () => {
    if(!playingUp){
        playingUp = true
        playWebAudioSound(soundBuffers.puff);
        haru_up.classList.add('squash');
        window.setTimeout(() => {
            haru_up.classList.remove('squash');
            playingUp = false
        }, 400)
    }
});

haru_down.addEventListener('click', () => {
    if(!playingDown){
        playingDown = true
        playWebAudioSound(soundBuffers.door_closing1);
        haru_down.classList.add('turn');
        window.setTimeout(() => {
            haru_down.classList.remove('turn');
            playingDown = false
        }, 400)
    }
});