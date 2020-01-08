import * as d3  from 'd3';

const formatMillisecond:  (date: Date) => string = d3.timeFormat(".%L"),
      formatSecond:       (date: Date) => string = d3.timeFormat(":%S"),
      formatMinute:       (date: Date) => string = d3.timeFormat("%I:%M"),
      formatHour:         (date: Date) => string = d3.timeFormat("%I %p"),
      formatDay:          (date: Date) => string = d3.timeFormat("%a %d"),
      formatWeek:         (date: Date) => string = d3.timeFormat("%b %d"),
      formatMonth:        (date: Date) => string = d3.timeFormat("%B"),
      formatYear:         (date: Date) => string = d3.timeFormat("%Y");

export const multiFormat = (date: Date): string => {
  return (d3.timeSecond(date) < date ? formatMillisecond
      : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
      : d3.timeDay(date) < date ? formatHour
      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
      : d3.timeYear(date) < date ? formatMonth
      : formatYear)(date);
};
