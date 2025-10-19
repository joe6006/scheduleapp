//starting off by creating a calender and then adding on too that


const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const daysContainer = document.getElementById('days');
const monthYear = document.getElementById("monthYear");
const addEvent = document.getElementById('addEvent');
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekdaysContainer = document.getElementById('weekdays');
    weekdaysContainer.innerHTML = '';
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach(day => {
        const weekDiv = document.createElement('div');
        weekDiv.textContent = day;
        weekDiv.classList.add('weekday');
        weekdaysContainer.appendChild(weekDiv);
    });

    monthYear.textContent = `${monthNames[month]} ${year}`;
    daysContainer.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const events = JSON.parse(localStorage.getItem('events')) || [];

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        const childDayText = document.createElement('h3');
        childDayText.textContent = day;
        childDayText.classList.add('child-style');
        dayDiv.classList.add('day');
        dayDiv.appendChild(childDayText);

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        events.forEach(event => {
            if (event.date === dateStr) {
                const tag = document.createElement('h5');
                tag.textContent = `Event: ${event.name}, Time: ${event.time}`;
                dayDiv.appendChild(tag);
            }
        });

        daysContainer.appendChild(dayDiv);
    }
}

addEvent.addEventListener('click', () => {
    const createBox = document.createElement('div');
    createBox.classList.add('popupOverlay');
    createBox.style.display = 'flex';

    const createContent = document.createElement('div');
    createContent.classList.add('popupContent');

    const eventForm = document.createElement('form');
    eventForm.setAttribute('id', 'eventForm');

    const eventName = document.createElement('label');
    eventName.setAttribute('for', 'nameInput');
    eventName.textContent = "Event Name: ";
    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'eventName');
    nameInput.required = true;

    const eventTime = document.createElement('label');
    eventTime.setAttribute('for', 'timeInput');
    eventTime.textContent = "Preferred Time: ";
    const timeInput = document.createElement('input');
    timeInput.setAttribute('id', 'timeInput');
    timeInput.setAttribute('type', 'time');
    timeInput.setAttribute('name', 'preferredTime');
    timeInput.required = true;

    const eventDate = document.createElement('label');
    eventDate.setAttribute('for', 'dateInput');
    eventDate.textContent = "Preferred Date: ";
    const dateInput = document.createElement('input');
    dateInput.setAttribute('id', 'dateInput');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'preferredDate');
    dateInput.required = true;

    const createSave = document.createElement('button');
    createSave.classList.add('saveButton');
    createSave.textContent = "Save Event";

    createSave.addEventListener('click', (e) => {
        e.preventDefault();
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push({
            name: nameInput.value,
            time: timeInput.value,
            date: dateInput.value
        });
        localStorage.setItem('events', JSON.stringify(events));
        document.body.removeChild(createBox);
        renderCalendar();
    });

    const createClose = document.createElement('button');
    createClose.classList.add('closePopup');
    createClose.textContent = "Close";
    createClose.addEventListener('click', () => {
        document.body.removeChild(createBox);
    });

    eventForm.appendChild(eventName);
    eventForm.appendChild(nameInput);
    eventForm.appendChild(eventTime);
    eventForm.appendChild(timeInput);
    eventForm.appendChild(eventDate);
    eventForm.appendChild(dateInput);
    createContent.appendChild(eventForm);
    createContent.appendChild(createSave);
    createContent.appendChild(createClose);
    createBox.appendChild(createContent);
    document.body.appendChild(createBox);
});

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});






renderCalendar();

