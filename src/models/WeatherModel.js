import React from 'react';

export default class WeatherModel {
  constructor(
    dt,
    date,
    currentTemp,
    humidity,
    desc,
    imageId,
    minTemp,
    maxTemp,
  ) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.id = dt;
    this.date = date.split(' ')[0];
    this.time = date.split(' ')[1];
    this.currentTemp = currentTemp;
    this.humidity = humidity;
    this.desc = desc;
    this.imageUrl = 'http://openweathermap.org/img/wn/' + imageId + '@2x.png';
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.displayDay = days[new Date(this.date).getDay()];
    this.displayDate =
      new Date(this.date).getDate().toString() +
      ' ' +
      monthNames[new Date(this.date).getMonth()];

    this.displayTime = displayDateTime(date);
  }
}

function displayDateTime(date1) {
  var date = new Date(date1);
  var hours =
    Number(date.getHours()) > 12
      ? Number(date.getHours()) - 12
      : Number(date.getHours());
  var am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var time = hours.toString() + ':' + minutes.toString() + am_pm;
  return time;
}
