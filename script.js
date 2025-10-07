//starting off by creating a calender and then adding on too that


const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const daysContainer = document.getElementById('days');
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;
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
        dayDiv.textContent = day;
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


