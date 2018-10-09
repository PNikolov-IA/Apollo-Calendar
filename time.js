const now = new Date();

const time = {
    getDayOfTheWeek: () => {

        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekday[now.getDay()];
    },

    getDayOfTheMonth: () => {
        return now.getDate();
    },

    getMonthByNumber: (number) => {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return month[number];
    },

    getMonth: () => {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return month[now.getMonth()];
    },

    getYear: () => {
        return now.getFullYear();
    }
};

export { time };

//==============================================================================

const generate = {
    generateCalendarDays: (month, year) => {

        let daysArr = [];
        let firstDay = new Date(year, month, 1).getDay();
        firstDay === 0 ? firstDay = 6 : firstDay = firstDay - 1;
        
        let daysInTheMonth = new Date(year, month + 1, 0).getDate();
        let date = 1;
        let counter = 0;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {

                if (i === 0 && j < firstDay) {
                    daysArr.push("");
                } else if (date > daysInTheMonth) {
                    daysArr.push("");
                } else {
                    if(counter >= firstDay)
                    daysArr.push(date);
                    date++;
                }
                counter++;
            };
        };        

        if(date - 1 < daysInTheMonth) {
            let restDates = daysInTheMonth - (date - 1);
            for(let i = 0; i < restDates; i++) {
                daysArr[i] = date;
                date++;
            }
        }

        return daysArr;
    },
    prevMonth: (currentMonth, currentYear) => {

        if (currentMonth === 0) {
            currentYear = currentYear - 1;
        } else {
            currentYear = currentYear;
        }

        if (currentMonth === 0) {
            currentMonth = 11;
        } else {
            currentMonth = currentMonth - 1;
        }

        return [currentMonth, currentYear];
    },
    nextMonth: (currentMonth, currentYear) => {

        if (currentMonth === 11) {
            currentYear = currentYear + 1;
        } else {
            currentYear = currentYear
        }

        currentMonth = (currentMonth + 1) % 12;

        return [currentMonth, currentYear];
    },

    currentMonthAndYear: [0, 0]
};

export {
    generate
};