const body = document.querySelector(`body`);
class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
  }

  start() {
    const targetDay = this.targetDate.getTime();
    const startTime = Date.now();
    const differenceTime = targetDay - startTime;
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const leftTime = differenceTime - deltaTime;
      const time = this.getTimeComponents(leftTime);
      this.onTick(time);
    }, 1000);
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, `0`);
  }
}

function upDateClockFace({ days, hours, mins, secs }) {
  const marcup = `<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">${days}</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">${hours}</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">${mins}</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">${secs}</span>
    <span class="label">Seconds</span>
  </div>
</div>`;
  body.innerHTML = marcup;
}
const timer = new CountdownTimer({
  onTick: upDateClockFace,
  targetDate: new Date("Jun 10, 2021"),
  selector: "#timer-1",
});
timer.start();
//new CountdownTimer({
// selector: "#timer-1",
// targetDate: new Date("Jul 17, 2019"),
//});
