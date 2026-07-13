const personal_task = document.querySelector('.personal-tasks-main')
const personal_task_form = personal_task.querySelector('#personal-tasks-form')
const add_btn = personal_task_form.querySelector('#add-btn');
const plan_day_main = document.querySelector('.plan-day-main')

//Dark Mode 
const themeBtn = document.querySelector(".ri-sun-fill");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkMode");
});

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];
let time_slotes1 = JSON.parse(localStorage.getItem('time_slotes1')) || {};
let time_slotes2 = JSON.parse(localStorage.getItem('time_slotes2')) || {};
let whetherApi;
async function getData() {
     let data = await fetch('https://api.worldweatheronline.com/premium/v1/weather.ashx?key=31fec5bfc62c41dc8b5165024261207&q=London&num_of_days=3&format=json');

     whetherApi = await data.json();
     console.log(whetherApi.data.weather[0])
     setWheTherDetail(whetherApi)
}
getData()
const dashboard = document.querySelector('#dashboard');
const plan_of_day = document.querySelector('.plan-of-day');
const timer_section = document.querySelector('.timer-section');
const daily_goals = document.querySelector('.daily-goals');
const suvichar = document.querySelector('.suvichar');
const personal_tasks = document.querySelector('.personal-tasks')
const day1 = document.querySelector('#day1')
const links = document.querySelector('.links');


const right = document.querySelector('.right')
const pt = right.querySelector('#pt')
const pod = right.querySelector('#pod')
const ts = right.querySelector('#ts')
const dg = right.querySelector('#dg')
const sv = right.querySelector('#sv')
const img = right.querySelector('img')
const bg_video = document.querySelector('.bg-video')
const source = bg_video.querySelector('source');

const weather_card_left_head = document.querySelector('.weather-card-left-head');

function setWheTherDetail(whetherApi) {
     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
     const days = ["SunDay", "MonDay", "TuesDay", "WednesDay", "ThirsDay", "FriDay", "SaturDay"]

     const date = weather_card_left_head.querySelector('#date')
     const month = weather_card_left_head.querySelector('#month')
     const year = weather_card_left_head.querySelector('#year')
     const day = weather_card_left_head.querySelector('#day')
     const hh = weather_card_left_head.querySelector('#hour')
     const mm = weather_card_left_head.querySelector('#minute')
     const ss = weather_card_left_head.querySelector('#sec')
     const weather_card_right_head = document.querySelector('.weather-card-right-head')
     const avgtemp = weather_card_right_head.querySelector('#avgtemp')
     const weather_card_right_content = document.querySelector('.weather-card-right-content')
     const maxTemp = weather_card_right_content.querySelector('#maxTemp')
     const minTemp = weather_card_right_content.querySelector('#minTemp')
     const sunRise = weather_card_right_content.querySelector('#sunRise')
     const sunSet = weather_card_right_content.querySelector('#sunSet')


     function updateClock() {
          let dateTime = new Date()

          date.textContent = dateTime.getDate()
          month.textContent = months[dateTime.getMonth()]
          year.textContent = dateTime.getFullYear()
          day.textContent = days[dateTime.getDay()]

          hh.textContent = dateTime.getHours()
          mm.textContent = dateTime.getMinutes()
          ss.textContent = dateTime.getSeconds()

          hh.textContent = String(dateTime.getHours()).padStart(2, "0");
          mm.textContent = String(dateTime.getMinutes()).padStart(2, "0");
          ss.textContent = String(dateTime.getSeconds()).padStart(2, "0");
     }
     updateClock()

     setInterval(updateClock, 1000)
     avgtemp.textContent = whetherApi.data.weather[0].avgtempC+"°C"
     maxTemp.textContent = whetherApi.data.weather[0].maxtempC+"°C"
     minTemp.textContent  = whetherApi.data.weather[0].mintempC+"°C"
     sunRise.textContent = whetherApi.data.weather[0].astronomy[0].sunrise
     sunSet.textContent = whetherApi.data.weather[0].astronomy[0].sunset
}
function setBackground() {
     let dateTime = new Date()
     const nav = dashboard.querySelector('nav')
     const p = links.querySelectorAll('p')

     const hours = dateTime.getHours();
     if (hours < 12) {
          source.src = "morning.mp4"
          nav.classList.remove('white')
          p.forEach((element) => {
               element.classList.remove('white-i');
          });
     } else if (hours <= 17) {
          source.src = "noon.mp4"
          nav.classList.remove('white')
          p.forEach((element) => {
               element.classList.remove('white-i');
          });
     } else if (hours < 19) {
          source.src = 'evening.mp4'
          nav.classList.remove('white')
          p.forEach((element) => {
               element.classList.remove('white-i');
          });
     } else {
          source.src = 'ninght.mp4'

          nav.classList.add('white')
          p.forEach((element) => {
               element.classList.add('white-i');
          });
     }
     bg_video.load();
}
setBackground()
// Add event deligation for close button in every section
document.addEventListener("click", (e) => {
     if (e.target.closest(".close")) {
          dashboard.style.display = "block";
          personal_tasks.style.display = "none";
          plan_of_day.style.display = "none";
          timer_section.style.display = "none";
          daily_goals.style.display = "none";
          suvichar.style.display = "none";
     }
});
right.addEventListener("click", (e) => {
     const link = e.target.closest("a");

     if (!link) return;

     dashboard.style.display = "none";

     personal_tasks.style.display = "none";
     plan_of_day.style.display = "none";
     timer_section.style.display = "none";
     daily_goals.style.display = "none";
     suvichar.style.display = "none";

     switch (link.id) {
          case "pt":
               personal_tasks.style.display = "block";
               break;

          case "pod":
               plan_of_day.style.display = "block";
               break;

          case "ts":
               timer_section.style.display = "block";
               break;

          case "dg":
               daily_goals.style.display = "block";
               break;

          case "sv":
               suvichar.style.display = "block";
               break;
     }
});

img.addEventListener('mouseenter', (e) => {

})
function complete(id) {
     console.log("Inside complete");
     console.log("ID:", id);
     console.log("Tasks:", tasks);
     tasks = tasks.filter((elem) => elem.taskId !== id)
     console.log("Hello Word")
     localStorage.setItem('tasks', JSON.stringify(tasks));
     displayAllTasks()
}

function displayAllTasks() {
     const task = document.querySelector('.tasks')
     task.innerHTML = ''
     tasks.forEach((elem) => {
          if (elem.check) {
               task.innerHTML += ` <div class="task">
                        <div>
                        <h2>${elem.title}<span class="imp">imp</span></h2>
                        <h3>${elem.description}</h3>
                        </div>
                        <button class="complete-btn" data-id="${elem.taskId}">Complete</button>
                        </div>`
          }
     })
     tasks.forEach((elem) => {
          if (!elem.check) {
               task.innerHTML += ` <div class="task">
                        <div>
                        <h2>${elem.title}</h2>
                        <h3>${elem.description}</h3>
                        </div>
                        <button class="complete-btn" data-id="${elem.taskId}">Complete</button>
                        </div>`
          }
     })

}

// Event Delegation 
document.querySelector('.tasks').addEventListener('click', (e) => {
     if (e.target.classList.contains('complete-btn')) {
          complete(Number(e.target.dataset.id))
     }
})

personal_task_form.addEventListener('focusin', (e) => {
     if (e.target.matches('input, textarea')) {
          const span = e.target.nextElementSibling;

          if (span && span.tagName === 'SPAN') {
               span.style.display = 'none';
          }
     }
});

add_btn.addEventListener('click', addNewTask)
function addNewTask(e) {
     e.preventDefault();
     const title = personal_task_form[0].value.trim()
     const description = personal_task_form[1].value.trim()
     const check = personal_task_form[2].checked

     const spans = document.querySelectorAll('.validation')

     if (!title) {
          spans[0].style.display = 'block'
          return;
     }
     if (!description) {
          spans[1].style.display = 'block'
          return;
     }

     const obj = {
          taskId: Date.now(),
          title: title,
          description: description,
          check: check
     }
     console.log(obj)
     tasks.push(obj)
     localStorage.setItem("tasks", JSON.stringify(tasks))
     personal_task_form.reset();
     displayAllTasks()
}


displayAllTasks()


// -------------------------------------------------------------------------------------------------------------
// #Productive Daily Planing
function dailyPlanning() {
     const slot1 = document.querySelector('#time-slotes1')
     const slot2 = document.querySelector('#time-slotes2')
     slot1.innerHTML = ''
     slot2.innerHTML = ''
     let i = 6
     while (i < 24) {
          const id = `${i}${i + 1}`;
          slot1.innerHTML += `
          <div class="time-slote">
               <h2>${i}:00 - ${i + 1}:00</h2>
               <input type="text" placeholder="Enter Daily Plan For this time here...." data-id='${id}' value='${time_slotes1[id] || ""}' />
          </div>`
          slot2.innerHTML += `
          <div class="time-slote">
               <h2>${i}:00 - ${i + 1}:00</h2>
               <input type="text" placeholder="Enter Daily Plan For this time here...." data-id='${id}' value='${time_slotes2[id] || ""}' />
          </div>`
          i += 2
     }
     savePlanning()
}
dailyPlanning()

function savePlanning() {
     document.querySelectorAll("#time-slotes1 input").forEach(input => {
          input.addEventListener("input", () => {
               time_slotes1[input.dataset.id] = input.value;
               localStorage.setItem("time_slotes1", JSON.stringify(time_slotes1));
          });
     });
     document.querySelectorAll("#time-slotes2 input").forEach(input => {
          input.addEventListener("input", () => {
               time_slotes2[input.dataset.id] = input.value;
               localStorage.setItem("time_slotes2", JSON.stringify(time_slotes2));
          });
     });
}

// Timer
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const initialDuration = 1500;

let timeLeft = initialDuration;

let interval = null;
let isPuased = false;

timerDisplay.textContent = formatTimer(timeLeft)
updateButtons();

startButton.addEventListener('click', () => {
     startButton.disabled = true;
     if (interval !== null) return;
     interval = setInterval(updateTimer, 1000);
     updateButtons();
});

pauseButton.addEventListener("click", () => {
     if (interval === null && !isPuased) return;
     if (!isPuased) {
          clearInterval(interval);
          interval = null;
          isPuased = true;
          pauseButton.textContent = "Resume";
     } else {
          interval = setInterval(updateTimer, 1000)
          isPuased = false;
          pauseButton.textContent = "Paused";
     }
})
resetButton.addEventListener('click', () => {
     clearInterval(interval);
     interval = null;
     isPuased = false;
     timeLeft = initialDuration;
     timerDisplay.textContent = formatTimer(timeLeft);
     timerDisplay.classList.remove('finished')
     updateButtons();
})
//Convert seconds into MM:SS format
function formatTimer(seconds) {
     //90 seconds : 1 minute and 30 seconds
     let mins = Math.floor(seconds / 60)
     let secs = seconds % 60;

     if (mins < 10) mins = '0' + mins
     if (secs < 10) secs = '0' + secs

     return `${mins}:${secs}`;
}

//Called every seconds while timer is running
function updateTimer() {
     timeLeft--;
     timerDisplay.textContent = formatTimer(timeLeft);

     if (timeLeft <= 0) {
          clearInterval(interval);
          interval = null;
          if (!alert('Time Up Please Reset the button!')) {
               timerDisplay.classList.add('finished')
          }
          updateButtons();

     }
}

//updates which buttons are enabled or disabled
function updateButtons() {
     const isRunning = interval !== null;
     const isFinished = timeLeft <= 0;

     if (isFinished) {
          startButton.disabled = true;
          pauseButton.disabled = true;
          resetButton.disabled = false;
          return;
     }

     if (!isRunning && !isPuased) {
          startButton.disabled = false;
          pauseButton.disabled = true;
          resetButton.disabled = true;
          return;
     }

     startButton.disabled = true;
     pauseButton.disabled = false;
     resetButton.disabled = false;
}

// ------------------------------------------------------------------
// Daily Goal Section
const daily_goal_form = document.querySelector('#daily-goal-form')
const add_goal = document.querySelector('#add-goal-btn');
function complete1(id) {
     console.log(id)
     goals = goals.filter((elem) => elem.goalId !== id)
     localStorage.setItem('goals', JSON.stringify(goals));
     displayAllGoals()
}

function displayAllGoals() {
     const goal = document.querySelector('.goals')
     goal.innerHTML = ''
     goals.forEach((elem) => {
          if (!elem.check) {
               goal.innerHTML += ` <div class="task">
                        <div>
                        <h2>${elem.title}</h2>
                        <h3>${elem.description}</h3>
                        </div>
                        <button class="complete-btn" data-id="${elem.goalId}">Complete</button>
                        </div>`
          }
     })

}

// Event Delegation 
document.querySelector('.goals').addEventListener('click', (e) => {
     if (e.target.classList.contains('complete-btn')) {
          complete1(Number(e.target.dataset.id))
     }
})

daily_goal_form.addEventListener('focusin', (e) => {
     if (e.target.matches('input, textarea')) {
          const span = e.target.nextElementSibling;

          if (span && span.tagName === 'SPAN') {
               span.style.display = 'none';
          }
     }
});

add_goal.addEventListener('click', addNewGoal)
function addNewGoal(e) {
     e.preventDefault();
     const title = daily_goal_form[0].value.trim()
     const description = daily_goal_form[1].value.trim()

     const spans = daily_goal_form.querySelectorAll('.validation')

     if (!title) {
          spans[0].style.display = 'block'
          return;
     }
     if (!description) {
          spans[1].style.display = 'block'
          return;
     }

     const obj = {
          goalId: Date.now(),
          title: title,
          description: description
     }
     console.log(obj)
     goals.push(obj)
     localStorage.setItem("goals", JSON.stringify(goals))
     daily_goal_form.reset();
     displayAllGoals()
}


displayAllGoals()

// ----------------------------------------------------------------------------------------
const motivationQuotes = [
     {
          id: 1,
          quote: "Success doesn't come from what you do occasionally. It comes from what you do consistently."
     },
     {
          id: 2,
          quote: "Dream big. Start small. Act now."
     },
     {
          id: 3,
          quote: "Discipline is choosing what you want most over what you want now."
     },
     {
          id: 4,
          quote: "The future depends on what you do today."
     },
     {
          id: 5,
          quote: "Small progress is still progress."
     },
     {
          id: 6,
          quote: "Your only limit is your mind."
     },
     {
          id: 7,
          quote: "Don't wait for opportunity. Create it."
     },
     {
          id: 8,
          quote: "Push yourself because no one else is going to do it for you."
     },
     {
          id: 9,
          quote: "Every expert was once a beginner."
     },
     {
          id: 10,
          quote: "Success begins with self-belief."
     },
     {
          id: 11,
          quote: "One day or day one. You decide."
     },
     {
          id: 12,
          quote: "Focus on progress, not perfection."
     },
     {
          id: 13,
          quote: "The pain of discipline is less than the pain of regret."
     },
     {
          id: 14,
          quote: "Hard work beats talent when talent doesn't work hard."
     },
     {
          id: 15,
          quote: "You don't have to be great to start, but you have to start to be great."
     },
     {
          id: 16,
          quote: "Your habits shape your future."
     },
     {
          id: 17,
          quote: "Be stronger than your excuses."
     },
     {
          id: 18,
          quote: "Difficult roads often lead to beautiful destinations."
     },
     {
          id: 19,
          quote: "The best time to start was yesterday. The next best time is now."
     },
     {
          id: 20,
          quote: "Never give up. Great things take time."
     },
     {
          id: 21,
          quote: "Stay patient. Stay consistent."
     },
     {
          id: 22,
          quote: "Don't stop until you're proud."
     },
     {
          id: 23,
          quote: "Believe you can, and you're halfway there."
     },
     {
          id: 24,
          quote: "Every day is another chance to improve yourself."
     },
     {
          id: 25,
          quote: "Your dreams don't work unless you do."
     },
     {
          id: 26,
          quote: "Success is built one step at a time."
     },
     {
          id: 27,
          quote: "The only impossible journey is the one you never begin."
     },
     {
          id: 28,
          quote: "Be fearless in the pursuit of your goals."
     },
     {
          id: 29,
          quote: "Do something today that your future self will thank you for."
     },
     {
          id: 30,
          quote: "Consistency creates confidence."
     }
];

const motivation_for_today = document.querySelector('.motivation-for-today')
const golden_word = motivation_for_today.querySelector('#golden-word')

function chooseRandom() {
     const randomQuote =
          motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
     golden_word.textContent = randomQuote.quote
}


const change_btn = document.querySelector('.change-btn');
change_btn.addEventListener('click', () => {
     chooseRandom()
})
chooseRandom()
