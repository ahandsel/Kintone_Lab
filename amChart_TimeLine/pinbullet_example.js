// Create FlagBullet
var pin = createBulletContainer("PinBullet");

var pinbullet = pin.createChild(am4plugins_bullets.PinBullet);
pinbullet.isMeasured = true;
//pinbullet.horizontalCenter = "middle";
//pinbullet.verticalCenter = "top";
pinbullet.align = "center";
pinbullet.y = 150;
pinbullet.background.fill = colors.getIndex(1);

pinbullet.image = new am4core.Image();
pinbullet.image.href = "https://placekitten.com/150/150";

createSlider(pin, "background.radius = ", 0.2, function (ev) {
  var min = 10,
    max = 100;
  var value = Math.round((max - min) * ev.target.start + min);
  this.background.radius = value;
  ev.target.parent.dataItem.value = value;
  ev.target.parent.deepInvalidate();
}, pinbullet, 0);

createSlider(pin, "background.pointerAngle = ", 0.75, function (ev) {
  var min = -180,
    max = 180;
  var value = Math.round((max - min) * ev.target.start + min);
  this.background.pointerAngle = value;
  ev.target.parent.dataItem.value = value;
  ev.target.parent.deepInvalidate();
}, pinbullet, 1);

createSlider(pin, "background.pointerLength = ", 0.4, function (ev) {
  var min = 1,
    max = 50;
  var value = Math.round((max - min) * ev.target.start + min);
  this.background.pointerLength = value;
  ev.target.parent.dataItem.value = value;
  ev.target.parent.deepInvalidate();
}, pinbullet, 2);

createSlider(pin, "background.pointerBaseWidth = ", 0.4, function (ev) {
  var min = 1,
    max = 50;
  var value = Math.round((max - min) * ev.target.start + min);
  this.background.pointerBaseWidth = value;
  ev.target.parent.dataItem.value = value;
  ev.target.parent.deepInvalidate();
}, pinbullet, 3);

createSlider(pin, "circle.radius = ", 0.85, function (ev) {
  var min = 0,
    max = 100;
  var value = Math.round((max - min) * ev.target.start + min);
  this.circle.radius = am4core.percent(value);
  ev.target.parent.dataItem.value = value;
  ev.target.parent.deepInvalidate();
}, pinbullet, 4, true);