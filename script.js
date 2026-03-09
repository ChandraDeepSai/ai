let rnn;
let generatedSequence;
let player;

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 100;

async function generateMusic(){

document.getElementById("status").innerText="Loading AI...";

rnn = new mm.MusicRNN(
'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn'
);

await rnn.initialize();

const temperature =
document.getElementById("temperature").value;

const seed = {

notes:[
{pitch:60,startTime:0,endTime:0.5},
{pitch:62,startTime:0.5,endTime:1},
{pitch:64,startTime:1,endTime:1.5}
],

totalTime:1.5

};

document.getElementById("status").innerText="Generating music...";

generatedSequence =
await rnn.continueSequence(seed,40,temperature);

player = new mm.Player();

document.getElementById("status").innerText="Music Ready";

drawVisualizer();

}

function playMusic(){

if(!generatedSequence){

alert("Generate music first");

return;

}

player.start(generatedSequence);

}

function stopMusic(){

if(player){

player.stop();

}

}

function downloadMidi(){

const midi = mm.sequenceProtoToMidi(generatedSequence);

const blob = new Blob([midi],{type:"audio/midi"});

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "ai_music.mid";

a.click();

}

function drawVisualizer(){

setInterval(()=>{

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<40;i++){

let h=Math.random()*100;

ctx.fillStyle="#22c55e";

ctx.fillRect(i*10,100-h,8,h);

}

},100);

}
