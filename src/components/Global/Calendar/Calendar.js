import React, { Component } from 'react';
//Use dateFns for later use/
import dateFns from 'date-fns';
import './Calendar.css';

export default class Calender extends Component {
    constructor() {
        super();
        this.state = {
            currentMonth: new Date(),
        }
    }
    //Define functions for rendering 
    renderDays() {
        //Specify the format for the day
        const formatDate = 'dddd';
        //Have an array of days.
        const days = [];
        //Define the start date width the currentMonth.
        const startDate = dateFns.startOfWeek(this.state.currentMonth);
        //Do a for loop which loop 7 times or amount days in a week.
        for(let i = 0; i < 7; i++) {
            //Add days to get the currentStart Date, and format the date.
            days.push(<div className='col col-center' key={i}>
                        {dateFns.format(dateFns.addDays(startDate, i), formatDate)}
                    </div>)
        }
        return <div className="days row">{days}</div>
    }
    renderHeader() {
        //Specify the month and date format.
        const formatDate = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
              <div className="col col-start">
                <div className="icon" onClick={this.prevMonth}>
                  chevron_left
                </div>
              </div>
              <div className="col col-center">
                <span>
                  {/*Format the date based on currentMonth, and date format specified.*/}
                  {dateFns.format(this.state.currentMonth, formatDate)}
                </span>
              </div>
              <div className="col col-end" onClick={this.nextMonth}>
                <div className="icon">chevron_right</div>
              </div>
            </div>
          );
    }
    //Now we will rendering days of the month based on the monthStart, and monthEnd.
    //SHow days from previous month if they are in the week of the next week. startDate
    //Shows days from next month if it is in the week of previous month. endDate
    renderCells() {
        const { currentMonth } = this.state;
        const { eventDate } = this.props;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        //Loop through startDate to endDate, and check if startDate is before startMonth and after endMonth
        //also check if endDate is before endMonth
        //dateFns.isDay checks hours, minutes, check if it is in the same day.
        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            days.push(
            <div
                className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, eventDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}
            >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
            </div>
            );
            day = dateFns.addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
            {days}
            </div>
        );
            days = [];
        }
        return <div className='body'>{rows}</div>
    }

    //NExt month
    //On current month, then goes to next month
    //Add integer to start date.
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    }
    //Previous Month
    //goes to previous month
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    }
    render() {
        //Now call render methods and wrap with calender class .
        return (
            <div className='calendar-container'>
                <span className='calendar-header'>
                  Schedule a <b>event</b>
                </span>
                <div className='calendar'>
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
            </div>
        );
    }
}