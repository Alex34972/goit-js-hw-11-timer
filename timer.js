class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.targetDate = targetDate;
    this.timerEl = document.querySelector(`${selector}`);
    this.start();
  }

  start() {
    const endTime = this.targetDate.getTime();
    const startTime = Date.now();
    const differenceTime = endTime - startTime;

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const leftTime = differenceTime - deltaTime;
      if (leftTime !== 0) {
        const time = this.getTimeComponents(leftTime);
        this.upDateClockFace(time);
      } else {
        clearInterval(timerId);
      }
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
  upDateClockFace({ days, hours, mins, secs }) {
    const marcup = `
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
`;

    this.timerEl.innerHTML = marcup;
  }
}

const timer = new CountdownTimer({
  targetDate: new Date("May 27, 2021"),
  selector: "#timer-1",
});

//const timer2 = new CountdownTimer({
//  targetDate: new Date("May 27, 2022"),
//  selector: "#timer-2",
//});
