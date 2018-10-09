const now = new Date();

const time = {
  getDayOfTheWeek:  () => {
    
        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekday[now.getDay()]; 
  },

  getDayOfTheMonth: () => {
      return now.getDate();
  },

  getMonth: () => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return month[now.getMonth()];
  },

  getYear: () => {
      return now.getFullYear();
  }
}; 


export {time};