// essa é a base do jogo, não o jogo completo
;
import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom();

loadPedit("Rajado", "sprites/Rajado.pedit");
loadSprite("iai", "sprites/iai.png");
loadSound("OtherworldlyFoe", "sounds/OtherworldlyFoe.mp3");
scene("game", () => {

const music = play("OtherworldlyFoe", {
	loop: true,
})
  gravity(2400);

  add([
    sprite("iai", { width: width(), height: height() })
  ]);
  const Rajado = add([
    sprite("Rajado"),
    pos(80, 40),
    area(),
    body(),
  ]);
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  function jump() {
    if (Rajado.grounded()) {
      Rajado.jump(JUMP_FORCE);
    }
  }
  keyPress("space", jump);
  mouseClick(jump);
  function spawnTree() {
    add([
      rect(48, rand(32, 96)),
      area(),
      outline(4),
      pos(width(), height() - FLOOR_HEIGHT),
      origin("botleft"),
      color(255, 180, 255),
      move(LEFT, SPEED),
      "tree",
    ]);
    wait(rand(1, 1.7), spawnTree);

  }
  spawnTree();
  Rajado.collides("tree", () => {
    go("lose", score);
    burp();
    addKaboom(Rajado.pos);
  });
  let score = 0;

  const scoreLabel = add([
    text(score),
    pos(24, 24),
  ]);
  action(() => {
    score++;
    scoreLabel.text = score;
  });

});

scene("lose", (score) => {

  add([
    sprite("Rajado"),
    pos(width() / 2, height() / 2 - 80),
    scale(2),
    origin("center"),
  ]);
  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(2),
    origin("center"),
  ]);
  keyPress("space", () => go("game"));
  mouseClick(() => go("game"));

});

go("game");
