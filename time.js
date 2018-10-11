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

    // ------------ Month -------------------------------
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
                    if (counter >= firstDay)
                        daysArr.push(date);
                    date++;
                }
                counter++;
            };
        };

        if (date - 1 < daysInTheMonth) {
            let restDates = daysInTheMonth - (date - 1);
            for (let i = 0; i < restDates; i++) {
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

    //----------- Week --------------------------

    generateAllWeeksMatrix: (currentMonth, allWeekDaysMatrix) => {

        let counterDays = 0;
        for (let weeks = 1; weeks < 6; weeks++) {
            const week = [];

            for (let days = 0; days < 7; days++) {
                week[days] = currentMonth[counterDays];
                counterDays++;
            }

            allWeekDaysMatrix[weeks] = week;
        }

        return allWeekDaysMatrix;
    },

    firstWeek: function (month) {           // return the first week of the month;
        month.forEach((day, index) => {
            if (index < 7) {
                if (day === 30 || day === 31) {
                    this.currentWeekDays[index] = "";
                } else {
                    this.currentWeekDays[index] = month[index];
                }
            }
        });
    },

    currentDayWeek: function () {             // return the week contains the current date;

        let currentDate = now.getDate();
        this.allWeekDaysMatrix.forEach(line => {
            line.forEach(day => {
                if (currentDate === day) {
                    this.currentWeekDays = line;
                }
            });
        });
    },

    prevWeek: function () {
        let currWeek = this.currentWeekDays;

        if (this.currentWeekDays[0] === 30 || this.currentWeekDays[0] === 31) {
            this.currentWeekDays = this.allWeekDaysMatrix[5];
            return;
        }

        this.allWeekDaysMatrix.forEach((week, index) => {
            if (week === currWeek && index !== 1) {
                if (index !== 2) {
                    this.currentWeekDays = this.allWeekDaysMatrix[index - 1];

                } else {
                    this.currentWeekDays = this.allWeekDaysMatrix[1];
                    let tempWeek = [];
                    this.currentWeekDays.forEach((element, index) => {
                        if (element !== "" && element === 30 || element === 31) {
                            tempWeek[index] = "";
                        } else {
                            tempWeek[index] = element;
                        }
                    });
                    this.currentWeekDays = tempWeek;
                }
            }
        });
    },

    nextWeek: function () {
        let currWeek = this.currentWeekDays;

        this.allWeekDaysMatrix.forEach((week, index) => {
            if (week[6] === currWeek[6]) {
                if (index < this.allWeekDaysMatrix.length - 1) {
                    this.currentWeekDays = this.allWeekDaysMatrix[index + 1];

                } else {
                    if (index === this.allWeekDaysMatrix.length - 1 && this.currentMonth[0] !== "" && this.currentMonth[0] !== 1) {
                        let tempWeek = [];
                        this.allWeekDaysMatrix.forEach((line, index) => {
                            line.forEach((element, ind) => {
                                if (index === 1) {
                                    if (element !== "" && element < 30) {
                                        tempWeek[ind] = "";
                                    } else {
                                        tempWeek[ind] = element;
                                    }
                                }
                            });
                        });
                        this.currentWeekDays = tempWeek;
                    } else {
                        this.currentWeekDays = this.currentWeekDays;
                    }
                }
            }
        });
    },

    // -------- Data Exposed------------------
    currentMonth: [],
    currentMonthAndYear: [0, 0],
    allWeekDaysMatrix: [],
    currentWeekDays: []
};

export {
    generate
};