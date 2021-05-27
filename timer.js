class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.targetDate = targetDate;
    this.unit();
    this.elements = this.getElements(selector);
    this.start();
  }
  unit() {
    const body = document.querySelector("body");
    const marcup = `<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">11</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">11</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">11</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">11</span>
    <span class="label">Seconds</span>
  </div>
</div>`;
    body.innerHTML = marcup;
  }
  getElements(timerId) {
    const refs = {
      daysEl: document.querySelector(`${timerId} [data-value="days"]`),
      hoursEl: document.querySelector(`${timerId} [data-value="hours"]`),
      minsEl: document.querySelector(`${timerId} [data-value="mins"]`),
      secsEl: document.querySelector(`${timerId} [data-value="secs"]`),
    };
    return refs;
  }
  onSetTime({ days, hours, mins, secs }) {
    this.elements.daysEl.textContent = days;
    this.elements.hoursEl.textContent = hours;
    this.elements.minsEl.textContent = mins;
    this.elements.secsEl.textContent = secs;
  }
  start() {
    const endTime = this.targetDate.getTime();
    const startTime = Date.now();
    const differenceTime = endTime - startTime;
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const leftTime = differenceTime - deltaTime;

      if (leftTime >= 0) {
        const time = this.getTimeComponents(leftTime);
        this.onSetTime(time);
        return;
      }
      clearInterval(timerId);
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

const timer = new CountdownTimer({
  targetDate: new Date("May 30, 2021"),
  selector: "#timer-1",
});
