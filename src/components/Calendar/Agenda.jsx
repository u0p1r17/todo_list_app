import React, { useState, useRef } from "react";
import moment from "moment";

export const Agenda = () => {
    const [months, setMonths] = useState(getInitialMonths());
    const containerRef = useRef(null);
    const [touchStart, setTouchStart] = useState(0);

    function getInitialMonths() {
        const currentMonth = moment().startOf("month");
        const prevMonth1 = moment(currentMonth).subtract(1, "month");
        const prevMonth2 = moment(currentMonth).subtract(2, "month");
        const nextMonth1 = moment(currentMonth).add(1, "month");
        const nextMonth2 = moment(currentMonth).add(2, "month");
        return [prevMonth2, prevMonth1, currentMonth, nextMonth1, nextMonth2];
    }

    function getMonthDays(month) {
        const weeks = [];
        let currentWeek = [];
        const startOfMonth = moment(month).startOf("month");
        const endOfMonth = moment(month).endOf("month");
        let currentDay = moment(startOfMonth);
        while (currentDay.isSameOrBefore(endOfMonth)) {
            if (currentDay.day() === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push(moment(currentDay));
            currentDay.add(1, "day");
        }
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }
        return weeks;
    }

    function handleScroll(e) {
        const container = containerRef.current;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const scrollTop = container.scrollTop;
        const scrollFraction = scrollTop / scrollHeight;
        if (scrollFraction < 0.2 && months[0].diff(moment(), "month") !== 0) {
            // Scroll top reached, add previous month and remove first
            const prevMonth = moment(months[0]).subtract(1, "month");
            setMonths((prevMonths) => [prevMonth, ...prevMonths.slice(0, 4)]);
        } else if (
            scrollFraction > 0.8 &&
            months[4].diff(moment(), "month") !== 0
        ) {
            // Scroll bottom reached, add next month and remove last
            const nextMonth = moment(months[4]).add(1, "month");
            setMonths((prevMonths) => [...prevMonths.slice(1), nextMonth]);
        }
    }

    function handleTouchStart(e) {
        setTouchStart(e.touches[0].clientY);
    }

    function handleTouchMove(e) {
        const container = containerRef.current;
        const touchCurrent = e.touches[0].clientY;
        const touchDiff = touchCurrent - touchStart;
        if (touchDiff > 0 && container.scrollTop === 0) {
            // Scrolling up, at top of container, prevent default
            e.preventDefault();
        } else if (
            touchDiff < 0 &&
            container.scrollHeight - container.clientHeight === container.scrollTop
        ) {
            // Scrolling down, at bottom of container, prevent default
            e.preventDefault();
        }
    }

    function handleTouchEnd(e) {
        const container = containerRef.current;
        const touchCurrent = e.changedTouches[0].clientY;
        const touchDiff = touchCurrent - touchStart;
        if (touchDiff > 0 && container.scrollTop === 0) {
            // Scrolling up, at top of container, prevent default
            e.preventDefault();
        } else if (
            touchDiff < 0 &&
            container.scrollHeight - container.clientHeight === container.scrollTop
        ) {
            // Scrolling down, at bottom of container, prevent default
            e.preventDefault();
        }
    }


    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ overflowY: "scroll", height: "300px" }}
        >
            {months.map((month) => (
                <div key={month.format("MMMM YYYY")}>
                    <h2>{month.format("MMMM YYYY")}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getMonthDays(month).map((week, i) => (
                                <tr key={i}>
                                    {week.map((day, j) => (
                                        <td key={j}>{day.format("D")}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}
