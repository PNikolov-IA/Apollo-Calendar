const db = {

    find: (year, month, day) => {
        let json = db.read();
        let filteredData = [];
        
        $.each(json, function(index, value) {
            if (value.year == year && value.month == month+1 && value.day == day) {
                filteredData.push(value);
            }
        });
        return filteredData;
    },
    write: (data) => {
        let json = db.read();
        json.push(data);
        localStorage.setItem('events', JSON.stringify(json));
    },
    read: () => {
        return JSON.parse(localStorage.getItem('events') || '[]');
    },
    delete: (year, month, day, title) => {
        let json = db.read();
        let newJson = [];
        $.each(json, function(index, value) {
            if (! (value.year == year && value.month == month && value.day == day && value.title == title) )  {
                newJson.push(value);
            }
        });
        localStorage.setItem('events', JSON.stringify(newJson));
    }
}

export {db};