var ctx = null;
var gameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileW = 40, tileH = 40;
var mapW = 10, mapH = 10;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

function drawGame()
{
	if(ctx==null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if(!player.processMovement(currentFrameTime))
	{
		if(keysDown[38] && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) { player.tileTo[1]-= 1; }
		else if(keysDown[40] && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1) { player.tileTo[1]+= 1; }
		else if(keysDown[37] && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) { player.tileTo[0]-= 1; }
		else if(keysDown[39] && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) { player.tileTo[0]+= 1; }

		if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
		{ player.timeMoved = currentFrameTime; }
	}

	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					ctx.fillStyle = "#685b48";
					break;
				default:
					ctx.fillStyle = "#5aa457";
			}

			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}

	ctx.fillStyle = "#0000ff";
	ctx.fillRect(player.position[0], player.position[1],
		player.dimensions[0], player.dimensions[1]);

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}