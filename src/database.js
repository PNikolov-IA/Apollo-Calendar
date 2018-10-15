const db = {

  find: (year, month, day, hour) => {
    const json = db.read();
    const filteredData = [];

    $.each(json, function(index, value) {
      if (value.year == year && value.month == month && value.day == day && value.hour ==hour) {
        filteredData.push(value);
      }
    });
    return filteredData;
  },
  findSlot: (year, month, day, hour) => {
    const json = db.read();
    const slot = [];

    $.each(json, function(index, value) {
      if (value.year == year && value.month == month && value.day == day && value.hour ==hour) {
        slot.push(value.title);
      }
    });
    return slot;
  },
  findEventsCount: (year, month, day) => {
    const json = db.read();
    const filteredData = [];

    $.each(json, function(index, value) {
      if (value.year == year && value.month == month && value.day == day) {
        filteredData.push(value);
      }
    });
    return filteredData.length;
  },
  write: (data) => {
    const json = db.read();
    json.push(data);
    localStorage.setItem('events', JSON.stringify(json));
  },
  read: () => {
    return JSON.parse(localStorage.getItem('events') || '[]');
  },
  delete: (year, month, day, hour) => {
    const json = db.read();
    const newJson = [];
    $.each(json, function(index, value) {
      if (! (value.year == year && value.month == month && value.day == day && value.hour == hour) ) {
        newJson.push(value);
      }
    });
    localStorage.setItem('events', JSON.stringify(newJson));
  },
};

export { db };
