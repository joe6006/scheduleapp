//starting off by creating a calender and then adding on too that


const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const daysContainer = document.getElementById('days');
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();




const addEvent= document.getElementById('addEvent');
    addEvent.addEventListener('click', () => {
            //create popup div
            const createBox = document.createElement('div');
            createBox.classList.add('popupOverlay');
            createBox.style.display ='flex ';
            //create content
            const createContent= document.createElement('div');
            createContent.classList.add('popupContent');

            //content child; 
            const eventForm = document.createElement('form');
            eventForm.setAttribute('id', 'eventForm');
            //event name
            const eventName = document.createElement('label');
            eventName.textContent = "Event Name: ";
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('name', 'eventName');
            nameInput.setAttribute('required','true');

            //event time
            const eventTime = document.createElement('label');
            eventTime.textContent = "preferred time: ";
            const timeInput = document.createElement('input');
            timeInput.setAttribute('type', 'time');
            timeInput.setAttribute('name', 'preferredTime');
            timeInput.setAttribute('required','true');

            //date
             const eventDate = document.createElement('label');
            eventDate.textContent = "preferred Date: ";
            const dateInput = document.createElement('input');
            dateInput.setAttribute('type', 'date');
            dateInput.setAttribute('name', 'preferredDate');
            dateInput.setAttribute('required','true');

//save button
localStorage.setItem('eventName',eventName.value);
localStorage.setItem('eventTime',eventTime.value);
localStorage.setItem('eventDate',eventDate.value);
const createSave = document.createElement('button');
createSave.classList.add('saveButton');

createSave.addEventListener('click', ()=>{

const tag = document.createElement('h5');

tag.textContent = "`eventName`, at `eventTime`.";



//localstorage






            //close button
            const createClose = document.createElement('button');
            createClose.classList.add('closePopup');
             createClose.addEventListener('click', () => {
                document.body.removeChild(createBox);
                });

            //append
    
            
            eventForm.appendChild(eventDate);
            eventForm.appendChild(dateInput);
            eventForm.appendChild(eventTime);
            eventForm.appendChild(timeInput);
            eventForm.appendChild(eventName);
            eventForm.appendChild(nameInput);
            createContent.appendChild(eventForm);
            createContent.appendChild(createClose);
createContent.appendChild(createSave);
            createBox.appendChild(createContent);
            document.body.appendChild(createBox);
                                
            
        })





function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    
//set weekdays
    const weekdaysContainer = document.getElementById('weekdays');
    weekdaysContainer.innerHTML = '';
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(let i = 0; i<=6; i++){
        const weekDiv = document.createElement('div');
        weekDiv.textContent= daysOfWeek[i];
        weekDiv.classList.add('weekday');
        weekdaysContainer.appendChild(weekDiv)
    }

    //set current month and year
    monthYear.textContent = `${monthNames[month]} ${year}`;

//set days
    daysContainer.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Add empty divs for alignment
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        daysContainer.appendChild(emptyDiv);
    }

    // Add actual day divs
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        const childDayText = document.createElement('h3');
        childDayText.textContent = day;
        dayDiv.appendChild(childDayText);

        childDayText.classList.add('child-style');
        dayDiv.classList.add('day');

        const today = new Date();
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add('today');
        }
        
        daysContainer.appendChild(dayDiv);
    }
    
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});







renderCalendar();



